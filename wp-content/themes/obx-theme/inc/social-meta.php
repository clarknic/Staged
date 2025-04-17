<?php
/**
 * Social Media Meta Tags
 *
 * Adds Open Graph and Twitter Card meta tags for better social media sharing
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Register meta box for custom social description
 */
function obx_register_social_meta_box() {
    add_meta_box(
        'obx-social-meta',
        __('Meta Settings', 'obx-theme'),
        'obx_social_meta_box_callback',
        ['post', 'page'],
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'obx_register_social_meta_box');

/**
 * Display the meta box callback
 */
function obx_social_meta_box_callback($post) {
    // Add nonce for security
    wp_nonce_field('obx_social_meta_box', 'obx_social_meta_box_nonce');
    
    // Get the custom meta data if it exists
    $custom_description = get_post_meta($post->ID, '_obx_social_description', true);
    $custom_title = get_post_meta($post->ID, '_obx_social_title', true);
    
    ?>
    <p>
        <label for="obx_social_title"><?php _e('Meta Title', 'obx-theme'); ?></label>
        <input type="text" id="obx_social_title" name="obx_social_title" value="<?php echo esc_attr($custom_title); ?>" style="width: 100%;">
        <span class="description"><?php _e('This will override the default title in social media shares and search results. Leave empty to use the post title.', 'obx-theme'); ?></span>
    </p>
    <p>
        <label for="obx_social_description"><?php _e('Meta Description', 'obx-theme'); ?></label>
        <textarea id="obx_social_description" name="obx_social_description" rows="3" style="width: 100%;"><?php echo esc_textarea($custom_description); ?></textarea>
        <span class="description"><?php _e('This will override the default excerpt in social media shares. Leave empty to use the post excerpt or content.', 'obx-theme'); ?></span>
    </p>
    <?php
}

/**
 * Save the meta box data
 */
function obx_save_social_meta_box($post_id) {
    // Check if our nonce is set
    if (!isset($_POST['obx_social_meta_box_nonce'])) {
        return;
    }

    // Verify the nonce
    if (!wp_verify_nonce($_POST['obx_social_meta_box_nonce'], 'obx_social_meta_box')) {
        return;
    }

    // If this is an autosave, we don't want to do anything
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    // Check the user's permissions
    if (isset($_POST['post_type']) && 'page' === $_POST['post_type']) {
        if (!current_user_can('edit_page', $post_id)) {
            return;
        }
    } else {
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }
    }

    // Save the description data
    if (isset($_POST['obx_social_description'])) {
        update_post_meta(
            $post_id,
            '_obx_social_description',
            sanitize_textarea_field($_POST['obx_social_description'])
        );
    }
    
    // Save the title data
    if (isset($_POST['obx_social_title'])) {
        update_post_meta(
            $post_id,
            '_obx_social_title',
            sanitize_text_field($_POST['obx_social_title'])
        );
    }
}
add_action('save_post', 'obx_save_social_meta_box');

/**
 * Add default social image option to customizer
 */
function obx_social_customizer_settings($wp_customize) {
    // Add section for social sharing
    $wp_customize->add_section('obx_social_settings', array(
        'title'    => __('Social Media Settings', 'obx-theme'),
        'priority' => 100,
    ));

    // Add setting for default social image
    $wp_customize->add_setting('obx_default_social_image', array(
        'default'           => '',
        'sanitize_callback' => 'absint',
    ));

    // Add control for default social image
    $wp_customize->add_control(new WP_Customize_Media_Control($wp_customize, 'obx_default_social_image', array(
        'label'       => __('Default Social Image', 'obx-theme'),
        'description' => __('This image will be used for social sharing when no featured image is set.', 'obx-theme'),
        'section'     => 'obx_social_settings',
        'mime_type'   => 'image',
    )));
}
add_action('customize_register', 'obx_social_customizer_settings');

/**
 * Add Open Graph and Twitter Card meta tags to the head
 */
function obx_add_social_meta_tags() {
    // Handle singular posts and pages
    if (is_singular()) {
        obx_add_singular_meta_tags();
    } 
    // Handle category archives
    elseif (is_category()) {
        obx_add_category_meta_tags();
    }
}

/**
 * Add meta tags for singular posts and pages
 */
function obx_add_singular_meta_tags() {
    global $post;
    
    // Get post data
    $post_title = get_the_title();
    
    // Check for custom social title
    $custom_title = get_post_meta(get_the_ID(), '_obx_social_title', true);
    if (!empty($custom_title)) {
        $post_title = $custom_title;
    }
    
    // Check for custom social description
    $custom_description = get_post_meta(get_the_ID(), '_obx_social_description', true);
    
    if (!empty($custom_description)) {
        $post_excerpt = $custom_description;
    } else {
        $post_excerpt = has_excerpt() ? get_the_excerpt() : wp_trim_words(strip_tags(get_the_content()), 30, '...');
        // If we still don't have a description, use site description as a fallback
        if (empty(trim($post_excerpt))) {
            $post_excerpt = get_bloginfo('description');
        }
    }
    
    $post_url = get_permalink();
    
    // Get featured image or default social image
    $post_thumbnail = get_the_post_thumbnail_url(get_the_ID(), 'large');
    if (!$post_thumbnail) {
        // Try to get default social image from theme settings
        $default_social_image_id = get_theme_mod('obx_default_social_image');
        if ($default_social_image_id) {
            $post_thumbnail = wp_get_attachment_image_url($default_social_image_id, 'large');
        }
        
        // If still no image, fallback to site logo
        if (!$post_thumbnail) {
            $custom_logo_id = get_theme_mod('custom_logo');
            $post_thumbnail = $custom_logo_id ? wp_get_attachment_image_url($custom_logo_id, 'large') : '';
        }
    }
    
    // Get site data
    $site_name = get_bloginfo('name');
    
    // Output Open Graph meta tags
    echo '<meta property="og:locale" content="' . esc_attr(get_locale()) . '" />' . "\n";
    echo '<meta property="og:type" content="article" />' . "\n";
    echo '<meta property="og:title" content="' . esc_attr($post_title) . '" />' . "\n";
    echo '<meta property="og:description" content="' . esc_attr($post_excerpt) . '" />' . "\n";
    echo '<meta property="og:url" content="' . esc_url($post_url) . '" />' . "\n";
    echo '<meta property="og:site_name" content="' . esc_attr($site_name) . '" />' . "\n";
    
    if ($post_thumbnail) {
        echo '<meta property="og:image" content="' . esc_url($post_thumbnail) . '" />' . "\n";
        
        // Get image dimensions if available
        $image_id = get_post_thumbnail_id();
        if ($image_id) {
            $image_data = wp_get_attachment_image_src($image_id, 'large');
            if ($image_data) {
                echo '<meta property="og:image:width" content="' . esc_attr($image_data[1]) . '" />' . "\n";
                echo '<meta property="og:image:height" content="' . esc_attr($image_data[2]) . '" />' . "\n";
            }
        }
    }
    
    // Output Twitter Card meta tags
    echo '<meta name="twitter:card" content="summary_large_image" />' . "\n";
    echo '<meta name="twitter:title" content="' . esc_attr($post_title) . '" />' . "\n";
    echo '<meta name="twitter:description" content="' . esc_attr($post_excerpt) . '" />' . "\n";
    
    if ($post_thumbnail) {
        echo '<meta name="twitter:image" content="' . esc_url($post_thumbnail) . '" />' . "\n";
    }
    
    // Add article specific meta tags for posts
    if (is_singular('post')) {
        // Get author data
        $author_id = get_the_author_meta('ID');
        $author_name = get_the_author_meta('display_name', $author_id);
        $author_url = get_author_posts_url($author_id);
        
        echo '<meta property="article:published_time" content="' . esc_attr(get_the_date('c')) . '" />' . "\n";
        echo '<meta property="article:modified_time" content="' . esc_attr(get_the_modified_date('c')) . '" />' . "\n";
        echo '<meta property="og:updated_time" content="' . esc_attr(get_the_modified_date('c')) . '" />' . "\n";
        
        // Add article author
        echo '<meta property="article:author" content="' . esc_url($author_url) . '" />' . "\n";
        
        // Add article categories as article:section
        $categories = get_the_category();
        if (!empty($categories)) {
            $primary_category = $categories[0];
            echo '<meta property="article:section" content="' . esc_attr($primary_category->name) . '" />' . "\n";
        }
        
        // Add article tags
        $tags = get_the_tags();
        if (!empty($tags)) {
            foreach ($tags as $tag) {
                echo '<meta property="article:tag" content="' . esc_attr($tag->name) . '" />' . "\n";
            }
        }
    }
}

/**
 * Add meta tags for category archives
 */
function obx_add_category_meta_tags() {
    // Get category data
    $category = get_queried_object();
    $cat_title = single_cat_title('', false);
    $cat_description = category_description();
    
    // Clean up and prepare the description
    if (empty($cat_description)) {
        $cat_description = sprintf(__('Browse all posts in the %s category', 'obx-theme'), $cat_title);
    } else {
        $cat_description = wp_strip_all_tags($cat_description);
    }
    
    $cat_url = get_category_link($category->term_id);
    
    // Get site data
    $site_name = get_bloginfo('name');
    
    // Try to get category image if available
    $cat_image = '';
    
    // Check for term meta directly
    $thumbnail_id = get_term_meta($category->term_id, 'thumbnail_id', true);
    if ($thumbnail_id) {
        $cat_image = wp_get_attachment_image_url($thumbnail_id, 'large');
    }
    
    // If no category image, try to get default social image
    if (empty($cat_image)) {
        $default_social_image_id = get_theme_mod('obx_default_social_image');
        if ($default_social_image_id) {
            $cat_image = wp_get_attachment_image_url($default_social_image_id, 'large');
        }
    }
    
    // If still no image, fallback to site logo
    if (empty($cat_image)) {
        $custom_logo_id = get_theme_mod('custom_logo');
        $cat_image = $custom_logo_id ? wp_get_attachment_image_url($custom_logo_id, 'large') : '';
    }
    
    // Output Open Graph meta tags
    echo '<meta property="og:locale" content="' . esc_attr(get_locale()) . '" />' . "\n";
    echo '<meta property="og:type" content="website" />' . "\n";
    echo '<meta property="og:title" content="' . esc_attr($cat_title) . ' - ' . esc_attr($site_name) . '" />' . "\n";
    echo '<meta property="og:description" content="' . esc_attr($cat_description) . '" />' . "\n";
    echo '<meta property="og:url" content="' . esc_url($cat_url) . '" />' . "\n";
    echo '<meta property="og:site_name" content="' . esc_attr($site_name) . '" />' . "\n";
    
    if (!empty($cat_image)) {
        echo '<meta property="og:image" content="' . esc_url($cat_image) . '" />' . "\n";
    }
    
    // Output Twitter Card meta tags
    echo '<meta name="twitter:card" content="summary_large_image" />' . "\n";
    echo '<meta name="twitter:title" content="' . esc_attr($cat_title) . ' - ' . esc_attr($site_name) . '" />' . "\n";
    echo '<meta name="twitter:description" content="' . esc_attr($cat_description) . '" />' . "\n";
    
    if (!empty($cat_image)) {
        echo '<meta name="twitter:image" content="' . esc_url($cat_image) . '" />' . "\n";
    }
}

add_action('wp_head', 'obx_add_social_meta_tags', 5); 