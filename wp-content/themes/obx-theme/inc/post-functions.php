<?php
/**
 * Post-related functions
 *
 * @package OBX_Theme
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Calculate reading time for a post
 * 
 * @param int $post_id Optional. The post ID. Defaults to current post.
 * @return string The reading time in minutes.
 */
function get_reading_time($post_id = null) {
    if (!$post_id) {
        $post_id = get_the_ID();
    }

    $content = get_post_field('post_content', $post_id);
    
    // Remove HTML tags and shortcodes
    $content = strip_tags($content);
    $content = strip_shortcodes($content);
    
    // Count words
    $word_count = str_word_count($content);
    
    // Average reading speed (words per minute)
    $words_per_minute = 200;
    
    // Calculate reading time
    $reading_time = ceil($word_count / $words_per_minute);
    
    // Return reading time with proper pluralization
    return sprintf(__('%d min read', 'obx-theme'), $reading_time);
}

/**
 * Get post views count
 * 
 * @param int $post_id Optional. The post ID. Defaults to current post.
 * @return int The number of views.
 */
function get_views_count($post_id = null) {
    if (!$post_id) {
        $post_id = get_the_ID();
    }
    
    $count = get_post_meta($post_id, 'post_views_count', true);
    return $count ? $count : 0;
}

/**
 * Track post views
 */
function track_post_views() {
    if (!is_single()) return;
    
    $post_id = get_the_ID();
    $count = get_post_meta($post_id, 'post_views_count', true);
    
    if ($count) {
        $count++;
    } else {
        $count = 1;
    }
    
    update_post_meta($post_id, 'post_views_count', $count);
}
add_action('wp_head', 'track_post_views');

/**
 * Get post likes count
 * 
 * @param int $post_id Optional. The post ID. Defaults to current post.
 * @return int The number of likes.
 */
function get_likes_count($post_id = null) {
    if (!$post_id) {
        $post_id = get_the_ID();
    }
    
    $count = get_post_meta($post_id, 'post_likes_count', true);
    return $count ? $count : 0;
}

/**
 * Check if current user has liked a post
 * 
 * @param int $post_id Optional. The post ID. Defaults to current post.
 * @return bool Whether the user has liked the post.
 */
function has_user_liked_post($post_id = null) {
    if (!$post_id) {
        $post_id = get_the_ID();
    }
    
    $liked_posts = isset($_COOKIE['obx_liked_posts']) ? json_decode(stripslashes($_COOKIE['obx_liked_posts']), true) : array();
    return isset($liked_posts[$post_id]) && $liked_posts[$post_id] === true;
}

/**
 * Handle like/unlike AJAX request
 */
function handle_post_like() {
    if (!isset($_POST['post_id']) || !isset($_POST['action_type']) || !isset($_POST['nonce'])) {
        wp_send_json_error('Invalid request');
    }
    
    // Verify nonce
    if (!wp_verify_nonce($_POST['nonce'], 'obx_site_nonce')) {
        wp_send_json_error('Security check failed');
    }
    
    $post_id = intval($_POST['post_id']);
    $action_type = sanitize_text_field($_POST['action_type']);
    $is_liked = false;
    
    // Get current liked posts from cookie
    $liked_posts = isset($_COOKIE['obx_liked_posts']) ? json_decode(stripslashes($_COOKIE['obx_liked_posts']), true) : array();
    
    if ($action_type === 'like') {
        // Update post meta
        $count = get_post_meta($post_id, 'post_likes_count', true);
        $count = $count ? $count + 1 : 1;
        update_post_meta($post_id, 'post_likes_count', $count);
        
        // Update cookie
        $liked_posts[$post_id] = true;
        $is_liked = true;
    } elseif ($action_type === 'unlike') {
        // Update post meta
        $count = get_post_meta($post_id, 'post_likes_count', true);
        $count = $count ? max(0, $count - 1) : 0;
        update_post_meta($post_id, 'post_likes_count', $count);
        
        // Update cookie
        unset($liked_posts[$post_id]);
        $is_liked = false;
    }
    
    // Set cookie for 1 year
    setcookie('obx_liked_posts', json_encode($liked_posts), time() + (365 * 24 * 60 * 60), '/');
    
    wp_send_json_success(array(
        'count' => get_likes_count($post_id),
        'liked' => $is_liked
    ));
}
add_action('wp_ajax_post_like', 'handle_post_like');
add_action('wp_ajax_nopriv_post_like', 'handle_post_like');

/**
 * Get related posts
 * 
 * @param int $post_id Optional. The post ID. Defaults to current post.
 * @param int $number Optional. Number of posts to return. Defaults to 3.
 * @return array Array of related posts.
 */
function get_related_posts($post_id = null, $number = 3) {
    if (!$post_id) {
        $post_id = get_the_ID();
    }
    
    $categories = get_the_category($post_id);
    if (!$categories) return array();
    
    $category_ids = array();
    foreach ($categories as $category) {
        $category_ids[] = $category->term_id;
    }
    
    $args = array(
        'post_type' => 'post',
        'posts_per_page' => $number,
        'post__not_in' => array($post_id),
        'category__in' => $category_ids,
        'orderby' => 'rand'
    );
    
    $related_posts = new WP_Query($args);
    return $related_posts->posts;
} 