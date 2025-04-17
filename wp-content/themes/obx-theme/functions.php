<?php
/**
 * OBX Web Lab Theme functions
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Enqueue styles and scripts
 */
function obx_theme_scripts() {
    // Enqueue theme stylesheet first
    wp_enqueue_style(
        'obx-theme-style',
        get_stylesheet_uri(),
        array(),
        wp_get_theme()->get('Version')
    );

    // Then enqueue main.css with dependency on style.css
    if (file_exists(get_template_directory() . '/build/index.css')) {
        wp_enqueue_style(
            'obx-theme-main',
            get_template_directory_uri() . '/build/index.css',
            array('obx-theme-style'),
            wp_get_theme()->get('Version')
        );
    }

    // Register global site data that will be available to all scripts
    $site_data = array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('obx_site_nonce')
    );

    // Enqueue JavaScript if it exists
    if (file_exists(get_template_directory() . '/build/index.js')) {
        wp_enqueue_script(
            'obx-theme-script',
            get_template_directory_uri() . '/build/index.js',
            array(),
            wp_get_theme()->get('Version'),
            true
        );
        
        // Localize script with WordPress AJAX URL and other global data
        wp_localize_script('obx-theme-script', 'obx_site', $site_data);
    }
    
    // Add type="module" to the script tag
    add_filter('script_loader_tag', function($tag, $handle) {
        if ('obx-theme-main' === $handle) {
            return str_replace(' src', ' type="module" src', $tag);
        }
        return $tag;
    }, 10, 2);
    
    
}
add_action('wp_enqueue_scripts', 'obx_theme_scripts');


/**
 * Add theme support
 */
function obx_theme_setup() {
    // Add default posts and comments RSS feed links to head
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails on posts and pages
    add_theme_support('post-thumbnails');

    // Add logo support
    add_theme_support('custom-logo', array(
        'height'      => 250,
        'width'       => 250,
        'flex-width'  => true,
        'flex-height' => true,
    ));

    // Switch default core markup to output valid HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));

    // Register navigation menus
    register_nav_menus(array(
        'primary' => esc_html__('Primary Menu', 'obx-theme'),
        'footer' => esc_html__('Footer Menu', 'obx-theme'),
    ));
}
add_action('after_setup_theme', 'obx_theme_setup');

/**
 * Add logo setting to customizer
 */
function obx_theme_customize_register($wp_customize) {
    // Add section for logo
    $wp_customize->add_section('obx_theme_logo_section', array(
        'title'    => __('Logo', 'obx-theme'),
        'priority' => 30,
    ));

    // Add setting for logo
    $wp_customize->add_setting('site_logo', array(
        'default'           => '',
        'sanitize_callback' => 'absint',
    ));

    // Add control for logo
    $wp_customize->add_control(new WP_Customize_Media_Control($wp_customize, 'site_logo', array(
        'label'    => __('Site Logo', 'obx-theme'),
        'section'  => 'obx_theme_logo_section',
        'mime_type' => 'image',
    )));

    // Footer Section
    $wp_customize->add_section('footer_settings', array(
        'title'    => __('Footer Settings', 'obx-theme'),
        'priority' => 120,
    ));

    // Footer Logo
    $wp_customize->add_setting('footer_logo', array(
        'default'           => '',
        'sanitize_callback' => 'absint',
    ));

    $wp_customize->add_control(new WP_Customize_Media_Control($wp_customize, 'footer_logo', array(
        'label'       => __('Footer Logo', 'obx-theme'),
        'description' => __('Upload a logo specifically for the footer. If not set, the main site logo will be used.', 'obx-theme'),
        'section'     => 'footer_settings',
        'mime_type'   => 'image',
        'priority'    => 10,
    )));

    // Services Text
    $wp_customize->add_setting('footer_services', array(
        'default'           => 'Home Staging | Design | Organization | Photography',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('footer_services', array(
        'label'    => __('Services Text', 'obx-theme'),
        'section'  => 'footer_settings',
        'type'     => 'text',
    ));

    // Location Text
    $wp_customize->add_setting('footer_location', array(
        'default'           => 'Virginia Beach, Norfolk & Hampton Roads',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('footer_location', array(
        'label'    => __('Location Text', 'obx-theme'),
        'section'  => 'footer_settings',
        'type'     => 'text',
    ));

    // Email
    $wp_customize->add_setting('footer_email', array(
        'default'           => 'info@stagedllc.com',
        'sanitize_callback' => 'sanitize_email',
    ));
    $wp_customize->add_control('footer_email', array(
        'label'    => __('Email Address', 'obx-theme'),
        'section'  => 'footer_settings',
        'type'     => 'email',
    ));

    // CTA Text
    $wp_customize->add_setting('footer_cta_text', array(
        'default'           => 'BOOK A CALL',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('footer_cta_text', array(
        'label'    => __('CTA Button Text', 'obx-theme'),
        'section'  => 'footer_settings',
        'type'     => 'text',
    ));

    // CTA URL
    $wp_customize->add_setting('footer_cta_url', array(
        'default'           => '#',
        'sanitize_callback' => 'esc_url_raw',
    ));
    $wp_customize->add_control('footer_cta_url', array(
        'label'    => __('CTA Button URL', 'obx-theme'),
        'section'  => 'footer_settings',
        'type'     => 'url',
    ));

    // Company Name
    $wp_customize->add_setting('footer_company_name', array(
        'default'           => 'Staged, LLC',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('footer_company_name', array(
        'label'    => __('Company Name', 'obx-theme'),
        'section'  => 'footer_settings',
        'type'     => 'text',
    ));

    // Add section for floating contact button
    $wp_customize->add_section('floating_contact_button', array(
        'title'    => __('Floating Contact Button', 'obx-theme'),
        'priority' => 30,
    ));

    // Add setting for button text
    $wp_customize->add_setting('floating_contact_text', array(
        'default'           => 'Contact Us',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    // Add control for button text
    $wp_customize->add_control('floating_contact_text', array(
        'label'    => __('Button Text', 'obx-theme'),
        'section'  => 'floating_contact_button',
        'type'     => 'text',
    ));

    // Add setting for button link
    $wp_customize->add_setting('floating_contact_link', array(
        'default'           => '#contact-us',
        'sanitize_callback' => 'esc_url_raw',
    ));

    // Add control for button link
    $wp_customize->add_control('floating_contact_link', array(
        'label'    => __('Button Link', 'obx-theme'),
        'section'  => 'floating_contact_button',
        'type'     => 'url',
    ));
}
add_action('customize_register', 'obx_theme_customize_register');

/**
 * Register widget areas
 */
function obx_theme_widgets_init() {
    register_sidebar(
        array(
            'name'          => esc_html__('Sidebar', 'obx-theme'),
            'id'            => 'sidebar-1',
            'description'   => esc_html__('Add widgets here to appear in your sidebar.', 'obx-theme'),
            'before_widget' => '<section id="%1$s" class="widget %2$s">',
            'after_widget'  => '</section>',
            'before_title'  => '<h2 class="widget-title">',
            'after_title'   => '</h2>',
        )
    );
    
    register_sidebar(
        array(
            'name'          => esc_html__('Footer 1', 'obx-theme'),
            'id'            => 'footer-1',
            'description'   => esc_html__('Add widgets here to appear in the first footer column.', 'obx-theme'),
            'before_widget' => '<section id="%1$s" class="widget %2$s">',
            'after_widget'  => '</section>',
            'before_title'  => '<h4 class="widget-title">',
            'after_title'   => '</h4>',
        )
    );
    
    register_sidebar(
        array(
            'name'          => esc_html__('Footer 2', 'obx-theme'),
            'id'            => 'footer-2',
            'description'   => esc_html__('Add widgets here to appear in the second footer column.', 'obx-theme'),
            'before_widget' => '<section id="%1$s" class="widget %2$s">',
            'after_widget'  => '</section>',
            'before_title'  => '<h4 class="widget-title">',
            'after_title'   => '</h4>',
        )
    );
    
    register_sidebar(
        array(
            'name'          => esc_html__('Footer 3', 'obx-theme'),
            'id'            => 'footer-3',
            'description'   => esc_html__('Add widgets here to appear in the third footer column.', 'obx-theme'),
            'before_widget' => '<section id="%1$s" class="widget %2$s">',
            'after_widget'  => '</section>',
            'before_title'  => '<h4 class="widget-title">',
            'after_title'   => '</h4>',
        )
    );
}

/**
 * Include post-related functions
 */
require get_template_directory() . '/inc/post-functions.php';

/**
 * Include table of contents functions
 */
require_once get_template_directory() . '/inc/toc-functions.php';

/**
 * Include social media meta tags
 */
require_once get_template_directory() . '/inc/social-meta.php';

/**
 * Enqueue block editor assets
 */
function obx_theme_block_editor_assets() {
    // Enqueue editor styles
    if (file_exists(get_template_directory() . '/build/editor.css')) {
        wp_enqueue_style(
            'obx-theme-editor-style',
            get_template_directory_uri() . '/build/editor.css',
            array(),
            wp_get_theme()->get('Version')
        );
    }
    
    // Enqueue editor scripts
    if (file_exists(get_template_directory() . '/build/editor.js')) {
        wp_enqueue_script(
            'obx-theme-editor-script',
            get_template_directory_uri() . '/build/editor.js',
            array('wp-blocks', 'wp-dom-ready', 'wp-edit-post'),
            wp_get_theme()->get('Version'),
            true
        );
    }
}
add_action('enqueue_block_editor_assets', 'obx_theme_block_editor_assets');

/**
 * Limit search results to posts only
 * 
 * @param object $query The main WP query
 */
function obx_limit_search_to_posts($query) {
    if ($query->is_search() && $query->is_main_query()) {
        $query->set('post_type', 'post');
    }
    return $query;
}
add_action('pre_get_posts', 'obx_limit_search_to_posts');

/**
 * AJAX handler for loading more posts
 */
function obx_load_more_posts() {
    // Verify the request
    if (!isset($_POST['page']) || !isset($_POST['posts_per_page'])) {
        wp_send_json_error('Invalid request');
        die();
    }
    
    $page = isset($_POST['page']) ? intval($_POST['page']) : 1;
    $posts_per_page = isset($_POST['posts_per_page']) ? intval($_POST['posts_per_page']) : get_option('posts_per_page');
    
    $args = array(
        'post_type' => 'post',
        'post_status' => 'publish',
        'posts_per_page' => $posts_per_page,
        'paged' => $page,
    );
    
    // Handle search query
    if (isset($_POST['s']) && !empty($_POST['s'])) {
        $args['s'] = sanitize_text_field($_POST['s']);
    }
    
    // Handle category
    if (isset($_POST['cat']) && !empty($_POST['cat'])) {
        $args['cat'] = intval($_POST['cat']);
    }
    
    $all_posts = new WP_Query($args);
    
    if ($all_posts->have_posts()) {
        ob_start();
        
        while ($all_posts->have_posts()) {
            $all_posts->the_post();
            get_template_part('template-parts/content', 'post-card');
        }
        
        $html = ob_get_clean();
        wp_reset_postdata();
        
        echo $html;
        die;
    }
    
    die();
}
add_action('wp_ajax_load_more_posts', 'obx_load_more_posts');
add_action('wp_ajax_nopriv_load_more_posts', 'obx_load_more_posts');

/**
 * Display pagination with auto-loading functionality
 */
function obx_pagination() {
    global $wp_query;
    
    // Use AJAX pagination for all templates (home, category, search)
    $posts_per_page = get_option('posts_per_page');
    if ($wp_query->max_num_pages > 1) : 
        // Get current query parameters for search and category pages
        $search_query = get_search_query();
        $category_id = is_category() ? get_queried_object_id() : 0;
    ?>
        <div class="load-more-container">
            <div class="loading-spinner hidden">
                <div class="spinner"></div>
            </div>
            <button id="load-more" class="load-more-button" 
                    data-page="1" 
                    data-max-pages="<?php echo esc_attr($wp_query->max_num_pages); ?>"
                    data-posts-per-page="<?php echo esc_attr($posts_per_page); ?>"
                    <?php if (!empty($search_query)) : ?>
                        data-search="<?php echo esc_attr($search_query); ?>"
                    <?php endif; ?>
                    <?php if ($category_id) : ?>
                        data-cat="<?php echo esc_attr($category_id); ?>"
                    <?php endif; ?>>
                <?php esc_html_e('Load More', 'obx-theme'); ?>
            </button>
        </div>
    <?php endif;
} 