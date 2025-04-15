<?php
/**
 * Table of Contents Functions
 *
 * Functions for extracting headings from content and 
 * storing them as post meta for table of contents generation.
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Extract headings from post content and save as meta
 *
 * @param int $post_id The post ID
 * @param WP_Post $post The post object
 * @param bool $update Whether this is an existing post being updated
 */
function obx_extract_toc_headings($post_id, $post, $update) {
    // Skip auto-saves and revisions
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    // Only run on posts and pages
    if (!in_array($post->post_type, ['post', 'page'])) {
        return;
    }
    
    // Skip if no content
    if (empty($post->post_content)) {
        return;
    }
    
    $headings = [];
    
    // Parse blocks from content
    $blocks = parse_blocks($post->post_content);
    
    // Function to recursively find heading blocks
    $find_headings = function($blocks) use (&$find_headings, &$headings) {
        foreach ($blocks as $block) {
            // Check if it's a heading block
            if ($block['blockName'] === 'core/heading') {
                $attributes = $block['attrs'];
                $content = wp_strip_all_tags($block['innerHTML']);
                
                // Skip headings explicitly excluded from TOC
                if (isset($attributes['showInToc']) && $attributes['showInToc'] === false) {
                    continue;
                }
                
                // Generate anchor if not set
                $anchor = '';
                if (!empty($attributes['anchor'])) {
                    $anchor = $attributes['anchor'];
                } else {
                    // Extract ID from innerHTML if available
                    if (preg_match('/id=["\'](.*?)["\']/i', $block['innerHTML'], $id_match)) {
                        $anchor = $id_match[1];
                    } else {
                        // Generate from content
                        $anchor = sanitize_title($content);
                    }
                }
                
                $level = isset($attributes['level']) ? (int) $attributes['level'] : 2;
                $title = isset($attributes['titleInToc']) ? $attributes['titleInToc'] : $content;
                
                $headings[] = [
                    'anchor' => $anchor,
                    'title' => $title,
                    'level' => $level
                ];
            }
            
            // If this block has innerBlocks, process them recursively
            if (!empty($block['innerBlocks'])) {
                $find_headings($block['innerBlocks']);
            }
        }
    };
    
    // Find all headings
    $find_headings($blocks);
    
    // If no headings found with block parser, try regexp as fallback
    if (empty($headings)) {
        // Regular expression to find headings with TOC data attributes
        $pattern = '/<h([1-6])([^>]*?)>(.*?)<\/h\1>/is';
        
        if (preg_match_all($pattern, $post->post_content, $matches, PREG_SET_ORDER)) {
            foreach ($matches as $match) {
                $level = $match[1];
                $attrs = $match[2];
                $content = wp_strip_all_tags($match[3]);
                
                // Check for data-show-in-toc attribute
                $include_in_toc = true; // Default to include
                if (preg_match('/data-show-in-toc=[\'"]false[\'"]/', $attrs)) {
                    $include_in_toc = false;
                }
                
                if (!$include_in_toc) {
                    continue;
                }
                
                // Get ID if it exists
                $anchor = '';
                if (preg_match('/id=[\'"]([^\'"]*)[\'"]/', $attrs, $id_match)) {
                    $anchor = $id_match[1];
                } else {
                    // Generate one if not present
                    $anchor = sanitize_title($content);
                }
                
                // Check for custom TOC title
                $title = $content;
                if (preg_match('/data-title-in-toc=[\'"]([^\'"]*)[\'"]/', $attrs, $title_match)) {
                    $title = $title_match[1];
                }
                
                $headings[] = [
                    'anchor' => $anchor,
                    'title' => $title,
                    'level' => (int) $level
                ];
            }
        }
    }
    
    // Save headings array as post meta (delete old meta first)
    delete_post_meta($post_id, 'obx-toc');
    
    // Only save meta if headings were found
    if (!empty($headings)) {
        update_post_meta($post_id, 'obx-toc', $headings);
    }
}
add_action('save_post', 'obx_extract_toc_headings', 10, 3);

/**
 * Generate Table of Contents HTML from post meta
 *
 * @param int $post_id Post ID to generate TOC for (defaults to current post)
 * @return string HTML for table of contents
 */
function obx_generate_toc($post_id = null) {
    if (!$post_id) {
        $post_id = get_the_ID();
    }
    
    if (!$post_id) {
        return '';
    }
    
    // Check if TOC is enabled for this post
    $enable_toc = get_post_meta($post_id, 'obx-enable-toc', true);
    if ($enable_toc === 'no') {
        return '';
    }
    
    // Get TOC data from post meta
    $headings = get_post_meta($post_id, 'obx-toc', true);
    
    if (empty($headings) || !is_array($headings)) {
        return '';
    }
    
    // Build TOC HTML
    $html = '<div class="obx-toc">';
    $html .= '<h2 class="obx-toc-title">In this article</h2>';
    $html .= '<ul class="obx-toc-list">';
    
    foreach ($headings as $heading) {
        $anchor = esc_attr($heading['anchor']);
        $title = esc_html($heading['title']);
        $level = isset($heading['level']) ? (int) $heading['level'] : 2;
        
        $html .= sprintf(
            '<li class="obx-toc-item obx-toc-level-%d"><a href="#%s">%s</a></li>',
            $level,
            $anchor,
            $title
        );
    }
    
    $html .= '</ul>';
    $html .= '</div>';
    
    return $html;
}

/**
 * Register metabox for enabling/disabling TOC
 */
function obx_register_toc_metabox() {
    add_meta_box(
        'obx-toc-metabox',
        __('Table of Contents', 'obx-theme'),
        'obx_toc_metabox_callback',
        ['post', 'page'],
        'side',
        'default'
    );
}
add_action('add_meta_boxes', 'obx_register_toc_metabox');

/**
 * Callback for TOC metabox
 * 
 * @param WP_Post $post The post object
 */
function obx_toc_metabox_callback($post) {
    // Add a nonce field for security
    wp_nonce_field('obx_toc_metabox', 'obx_toc_metabox_nonce');
    
    // Get the current value
    $enable_toc = get_post_meta($post->ID, 'obx-enable-toc', true);
    
    // Default to 'yes' if not set
    if (empty($enable_toc)) {
        $enable_toc = 'yes';
    }
    
    ?>
    <p>
        <label>
            <input type="checkbox" name="obx-enable-toc" value="yes" <?php checked($enable_toc, 'yes'); ?>>
            <?php _e('Enable Table of Contents', 'obx-theme'); ?>
        </label>
    </p>
    <?php
}

/**
 * Save TOC metabox data
 * 
 * @param int $post_id The post ID
 */
function obx_save_toc_metabox($post_id) {
    // Check if our nonce is set
    if (!isset($_POST['obx_toc_metabox_nonce'])) {
        return;
    }
    
    // Verify the nonce
    if (!wp_verify_nonce($_POST['obx_toc_metabox_nonce'], 'obx_toc_metabox')) {
        return;
    }
    
    // Check if this is an autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    // Check user permissions
    if (isset($_POST['post_type'])) {
        if ('page' === $_POST['post_type'] && !current_user_can('edit_page', $post_id)) {
            return;
        } else if (!current_user_can('edit_post', $post_id)) {
            return;
        }
    }
    
    // Save the data - checkbox is only submitted when checked
    if (isset($_POST['obx-enable-toc'])) {
        update_post_meta($post_id, 'obx-enable-toc', 'yes');
    } else {
        update_post_meta($post_id, 'obx-enable-toc', 'no');
    }
}
add_action('save_post', 'obx_save_toc_metabox');

/**
 * Shortcode to display TOC
 *
 * @param array $atts Shortcode attributes
 * @return string TOC HTML
 */
function obx_toc_shortcode($atts) {
    $atts = shortcode_atts([
        'post_id' => null,
    ], $atts, 'obx_toc');
    
    $post_id = $atts['post_id'] ? (int) $atts['post_id'] : get_the_ID();
    
    return obx_generate_toc($post_id);
}
add_shortcode('obx_toc', 'obx_toc_shortcode');

/**
 * Filter to automatically prepend TOC to content
 * 
 * @param string $content Post content
 * @return string Content with TOC
 */
function obx_prepend_toc_to_content($content) {
    // Only on single posts and pages
    if (!is_singular(['post', 'page'])) {
        return $content;
    }
    
    // Get TOC
    $toc = obx_generate_toc(get_the_ID());
    
    // Only prepend if TOC exists
    if (!empty($toc)) {
        $content = $toc . $content;
    }
    
    return $content;
}
// Uncomment to automatically add TOC to content
// add_filter('the_content', 'obx_prepend_toc_to_content', 20);
