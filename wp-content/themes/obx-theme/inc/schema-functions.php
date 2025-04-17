<?php
/**
 * Schema.org Structured Data Functions
 *
 * Adds JSON-LD schema markup for better SEO and rich snippets
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Register schema settings in customizer
 */
function obx_schema_customizer_settings($wp_customize) {
    // Add schema settings section
    $wp_customize->add_section('obx_schema_settings', array(
        'title'    => __('Schema.org Settings', 'obx-theme'),
        'priority' => 110,
    ));
    
    // Organization name
    $wp_customize->add_setting('obx_schema_org_name', array(
        'default'           => get_bloginfo('name'),
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('obx_schema_org_name', array(
        'label'       => __('Organization Name', 'obx-theme'),
        'description' => __('Used in Schema.org markup.', 'obx-theme'),
        'section'     => 'obx_schema_settings',
        'type'        => 'text',
    ));
    
    // Organization type
    $wp_customize->add_setting('obx_schema_org_type', array(
        'default'           => 'Organization',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('obx_schema_org_type', array(
        'label'       => __('Organization Type', 'obx-theme'),
        'description' => __('Select the type that best describes your organization.', 'obx-theme'),
        'section'     => 'obx_schema_settings',
        'type'        => 'select',
        'choices'     => array(
            'Organization'   => __('Organization', 'obx-theme'),
            'Corporation'    => __('Corporation', 'obx-theme'),
            'LocalBusiness'  => __('Local Business', 'obx-theme'),
            'NewsMediaOrganization' => __('News Media Organization', 'obx-theme'),
        ),
    ));
    
    // Organization logo
    $wp_customize->add_setting('obx_schema_org_logo', array(
        'default'           => '',
        'sanitize_callback' => 'absint',
    ));
    
    $wp_customize->add_control(new WP_Customize_Media_Control($wp_customize, 'obx_schema_org_logo', array(
        'label'       => __('Organization Logo', 'obx-theme'),
        'description' => __('Logo used in Schema.org markup. If not set, the site logo will be used.', 'obx-theme'),
        'section'     => 'obx_schema_settings',
        'mime_type'   => 'image',
    )));
    
    // Organization description
    $wp_customize->add_setting('obx_schema_org_description', array(
        'default'           => get_bloginfo('description'),
        'sanitize_callback' => 'sanitize_textarea_field',
    ));
    
    $wp_customize->add_control('obx_schema_org_description', array(
        'label'       => __('Organization Description', 'obx-theme'),
        'description' => __('A short description of your organization.', 'obx-theme'),
        'section'     => 'obx_schema_settings',
        'type'        => 'textarea',
    ));
    
    // Default article type
    $wp_customize->add_setting('obx_schema_default_article_type', array(
        'default'           => 'Article',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('obx_schema_default_article_type', array(
        'label'       => __('Default Article Type', 'obx-theme'),
        'description' => __('The default Schema.org type for blog posts.', 'obx-theme'),
        'section'     => 'obx_schema_settings',
        'type'        => 'select',
        'choices'     => array(
            'Article'      => __('Article', 'obx-theme'),
            'BlogPosting'  => __('Blog Posting', 'obx-theme'),
            'NewsArticle'  => __('News Article', 'obx-theme'),
            'TechArticle'  => __('Technical Article', 'obx-theme'),
        ),
    ));
    
    // Social profiles
    $social_profiles = array(
        'facebook'  => __('Facebook URL', 'obx-theme'),
        'twitter'   => __('Twitter URL', 'obx-theme'),
        'instagram' => __('Instagram URL', 'obx-theme'),
        'linkedin'  => __('LinkedIn URL', 'obx-theme'),
        'youtube'   => __('YouTube URL', 'obx-theme'),
    );
    
    foreach ($social_profiles as $profile_id => $profile_label) {
        $wp_customize->add_setting('obx_schema_social_' . $profile_id, array(
            'default'           => '',
            'sanitize_callback' => 'esc_url_raw',
        ));
        
        $wp_customize->add_control('obx_schema_social_' . $profile_id, array(
            'label'       => $profile_label,
            'section'     => 'obx_schema_settings',
            'type'        => 'url',
        ));
    }
}
add_action('customize_register', 'obx_schema_customizer_settings');

/**
 * Register meta box for custom schema settings
 */
function obx_register_schema_meta_box() {
    add_meta_box(
        'obx-schema-meta',
        __('Schema.org Settings', 'obx-theme'),
        'obx_schema_meta_box_callback',
        ['post', 'page'],
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'obx_register_schema_meta_box');

/**
 * Display the schema meta box callback
 */
function obx_schema_meta_box_callback($post) {
    // Add nonce for security
    wp_nonce_field('obx_schema_meta_box', 'obx_schema_meta_box_nonce');
    
    // Get the custom schema data if it exists
    $schema_type = get_post_meta($post->ID, '_obx_schema_type', true);
    $schema_is_paid = get_post_meta($post->ID, '_obx_schema_is_paid', true);
    $schema_access_mode = get_post_meta($post->ID, '_obx_schema_access_mode', true);
    $schema_word_count = get_post_meta($post->ID, '_obx_schema_word_count', true);
    $schema_keywords = get_post_meta($post->ID, '_obx_schema_keywords', true);
    
    // Get the default article type from theme settings
    $default_article_type = get_theme_mod('obx_schema_default_article_type', 'Article');
    
    ?>
    <p>
        <label for="obx_schema_type"><?php _e('Schema Type', 'obx-theme'); ?></label>
        <select id="obx_schema_type" name="obx_schema_type" style="width: 100%;">
            <option value=""><?php _e('Use Default', 'obx-theme'); ?> (<?php echo esc_html($default_article_type); ?>)</option>
            <?php if ($post->post_type == 'post') : ?>
            <option value="Article" <?php selected($schema_type, 'Article'); ?>><?php _e('Article', 'obx-theme'); ?></option>
            <option value="BlogPosting" <?php selected($schema_type, 'BlogPosting'); ?>><?php _e('Blog Posting', 'obx-theme'); ?></option>
            <?php endif; ?>
            <?php if ($post->post_type == 'page') : ?>
            <option value="WebPage" <?php selected($schema_type, 'WebPage'); ?>><?php _e('Web Page', 'obx-theme'); ?></option>
            <option value="AboutPage" <?php selected($schema_type, 'AboutPage'); ?>><?php _e('About Page', 'obx-theme'); ?></option>
            <option value="ContactPage" <?php selected($schema_type, 'ContactPage'); ?>><?php _e('Contact Page', 'obx-theme'); ?></option>
            <option value="FAQPage" <?php selected($schema_type, 'FAQPage'); ?>><?php _e('FAQ Page', 'obx-theme'); ?></option>
            <?php endif; ?>
        </select>
        <span class="description"><?php _e('Override the default Schema.org type for this content.', 'obx-theme'); ?></span>
    </p>

    <p>
        <label for="obx_schema_keywords"><?php _e('Keywords', 'obx-theme'); ?></label>
        <input type="text" id="obx_schema_keywords" name="obx_schema_keywords" value="<?php echo esc_attr($schema_keywords); ?>" style="width: 100%;">
        <span class="description"><?php _e('Comma-separated keywords for this content (optional).', 'obx-theme'); ?></span>
    </p>

    <?php if ($post->post_type == 'post') : ?>
    <fieldset>
        <legend><?php _e('Article-Specific Settings', 'obx-theme'); ?></legend>
        
        <p>
            <label for="obx_schema_access_mode"><?php _e('Access Mode', 'obx-theme'); ?></label>
            <select id="obx_schema_access_mode" name="obx_schema_access_mode" style="width: 100%;">
                <option value=""><?php _e('Not Specified', 'obx-theme'); ?></option>
                <option value="Subscription" <?php selected($schema_access_mode, 'Subscription'); ?>><?php _e('Subscription', 'obx-theme'); ?></option>
                <option value="Paywalled" <?php selected($schema_access_mode, 'Paywalled'); ?>><?php _e('Paywalled', 'obx-theme'); ?></option>
                <option value="RegisteredUsers" <?php selected($schema_access_mode, 'RegisteredUsers'); ?>><?php _e('Registered Users Only', 'obx-theme'); ?></option>
                <option value="Public" <?php selected($schema_access_mode, 'Public'); ?>><?php _e('Public', 'obx-theme'); ?></option>
            </select>
            <span class="description"><?php _e('Specify if this content requires subscription or registration to access.', 'obx-theme'); ?></span>
        </p>
        
        <p>
            <label for="obx_schema_is_paid"><?php _e('Is Paid Content', 'obx-theme'); ?></label>
            <input type="checkbox" id="obx_schema_is_paid" name="obx_schema_is_paid" value="1" <?php checked($schema_is_paid, '1'); ?>>
            <span class="description"><?php _e('Check if this is premium/paid content.', 'obx-theme'); ?></span>
        </p>
        
        <p>
            <label for="obx_schema_word_count"><?php _e('Word Count', 'obx-theme'); ?></label>
            <input type="number" id="obx_schema_word_count" name="obx_schema_word_count" value="<?php echo esc_attr($schema_word_count); ?>" min="0">
            <span class="description"><?php _e('Approximate word count of the article (leave empty for automatic calculation).', 'obx-theme'); ?></span>
        </p>
    </fieldset>
    <?php endif; ?>
    <?php
}

/**
 * Save the schema meta box data
 */
function obx_save_schema_meta_box($post_id) {
    // Check if our nonce is set
    if (!isset($_POST['obx_schema_meta_box_nonce'])) {
        return;
    }

    // Verify the nonce
    if (!wp_verify_nonce($_POST['obx_schema_meta_box_nonce'], 'obx_schema_meta_box')) {
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

    // Save the schema type if set
    if (isset($_POST['obx_schema_type'])) {
        update_post_meta(
            $post_id,
            '_obx_schema_type',
            sanitize_text_field($_POST['obx_schema_type'])
        );
    }
    
    // Save keywords
    if (isset($_POST['obx_schema_keywords'])) {
        update_post_meta(
            $post_id,
            '_obx_schema_keywords',
            sanitize_text_field($_POST['obx_schema_keywords'])
        );
    }
    
    // Save article-specific fields
    if (isset($_POST['obx_schema_access_mode'])) {
        update_post_meta(
            $post_id,
            '_obx_schema_access_mode',
            sanitize_text_field($_POST['obx_schema_access_mode'])
        );
    }
    
    if (isset($_POST['obx_schema_is_paid'])) {
        update_post_meta(
            $post_id,
            '_obx_schema_is_paid',
            '1'
        );
    } else {
        delete_post_meta($post_id, '_obx_schema_is_paid');
    }
    
    if (isset($_POST['obx_schema_word_count']) && !empty($_POST['obx_schema_word_count'])) {
        update_post_meta(
            $post_id,
            '_obx_schema_word_count',
            absint($_POST['obx_schema_word_count'])
        );
    } else {
        delete_post_meta($post_id, '_obx_schema_word_count');
    }
}
add_action('save_post', 'obx_save_schema_meta_box');

/**
 * Generate Article schema for posts
 */
function obx_get_article_schema() {
    global $post;
    
    // Get custom overrides if set
    $schema_type = get_post_meta($post->ID, '_obx_schema_type', true);
    
    // If no override, use the default from theme settings
    if (empty($schema_type)) {
        $schema_type = get_theme_mod('obx_schema_default_article_type', 'Article');
    }
    
    // Get post data
    $post_title = get_the_title();
    
    // Check for custom meta title
    $custom_title = get_post_meta($post->ID, '_obx_social_title', true);
    if (!empty($custom_title)) {
        $post_title = $custom_title;
    }
    
    // Get post description
    $custom_description = get_post_meta($post->ID, '_obx_social_description', true);
    if (!empty($custom_description)) {
        $post_excerpt = $custom_description;
    } else {
        $post_excerpt = has_excerpt() ? get_the_excerpt() : wp_trim_words(strip_tags(get_the_content()), 30, '...');
    }
    
    // Get author information
    $author_id = get_the_author_meta('ID');
    $author_name = get_the_author_meta('display_name', $author_id);
    $author_url = get_author_posts_url($author_id);
    
    // Get organization data from settings
    $org_name = get_theme_mod('obx_schema_org_name', get_bloginfo('name'));
    $org_logo_id = get_theme_mod('obx_schema_org_logo', get_theme_mod('custom_logo'));
    $org_logo_url = $org_logo_id ? wp_get_attachment_image_url($org_logo_id, 'full') : '';
    
    $schema = array(
        '@context' => 'https://schema.org',
        '@type'    => $schema_type,
        'headline' => $post_title,
        'description' => $post_excerpt,
        'url'      => get_permalink(),
        'mainEntityOfPage' => array(
            '@type' => 'WebPage',
            '@id'   => get_permalink()
        ),
        'datePublished' => get_the_date('c'),
        'dateModified'  => get_the_modified_date('c'),
        'author' => array(
            '@type' => 'Person',
            'name'  => $author_name,
            'url'   => $author_url
        ),
        'publisher' => array(
            '@type' => 'Organization',
            'name'  => $org_name,
            'logo'  => array(
                '@type' => 'ImageObject',
                'url'   => $org_logo_url,
            ),
        ),
    );
    
    // Add keywords if specified
    $keywords = get_post_meta($post->ID, '_obx_schema_keywords', true);
    if (!empty($keywords)) {
        $schema['keywords'] = $keywords;
    }
    
    // Add article-specific properties
    $is_paid = get_post_meta($post->ID, '_obx_schema_is_paid', true);
    if (!empty($is_paid)) {
        $schema['isAccessibleForFree'] = false;
    }
    
    $access_mode = get_post_meta($post->ID, '_obx_schema_access_mode', true);
    if (!empty($access_mode)) {
        if ($access_mode == 'Public') {
            $schema['isAccessibleForFree'] = true;
        } else {
            $schema['isAccessibleForFree'] = false;
        }
        
        // Add hasDigitalDocumentPermission property for subscription/paywalled content
        if (in_array($access_mode, array('Subscription', 'Paywalled', 'RegisteredUsers'))) {
            $schema['hasPart'] = array(
                '@type' => 'WebPageElement',
                'isAccessibleForFree' => false,
                'cssSelector' => '.entry-content'
            );
        }
    }
    
    // Add word count if specified or calculate
    $word_count = get_post_meta($post->ID, '_obx_schema_word_count', true);
    if (empty($word_count)) {
        // Calculate word count from content
        $word_count = str_word_count(strip_tags(get_the_content()));
    }
    if (!empty($word_count)) {
        $schema['wordCount'] = (int) $word_count;
    }
    
    // Add featured image if exists
    if (has_post_thumbnail()) {
        $featured_img_url = get_the_post_thumbnail_url(null, 'full');
        $schema['image'] = array(
            '@type' => 'ImageObject',
            'url'   => $featured_img_url,
        );
        
        // Get image dimensions if possible
        $image_id = get_post_thumbnail_id();
        if ($image_id) {
            $image_data = wp_get_attachment_image_src($image_id, 'full');
            if ($image_data) {
                $schema['image']['width'] = $image_data[1];
                $schema['image']['height'] = $image_data[2];
            }
        }
    }
    
    return $schema;
}

/**
 * Generate WebSite schema for the home page
 */
function obx_get_website_schema() {
    // Get site data
    $site_name = get_bloginfo('name');
    $site_url = home_url('/');
    $site_description = get_bloginfo('description');
    
    // Get organization data from settings
    $org_name = get_theme_mod('obx_schema_org_name', $site_name);
    $org_description = get_theme_mod('obx_schema_org_description', $site_description);
    $org_type = get_theme_mod('obx_schema_org_type', 'Organization');
    
    // Build social profile URLs if any are set
    $social_profiles = array();
    $profile_keys = array('facebook', 'twitter', 'instagram', 'linkedin', 'youtube');
    
    foreach ($profile_keys as $key) {
        $profile_url = get_theme_mod('obx_schema_social_' . $key, '');
        if (!empty($profile_url)) {
            $social_profiles[] = $profile_url;
        }
    }
    
    $schema = array(
        '@context' => 'https://schema.org',
        '@type'    => 'WebSite',
        'name'     => $site_name,
        'url'      => $site_url,
        'potentialAction' => array(
            '@type'       => 'SearchAction',
            'target'      => $site_url . '?s={search_term_string}',
            'query-input' => 'required name=search_term_string'
        )
    );
    
    if (!empty($site_description)) {
        $schema['description'] = $site_description;
    }
    
    // Add Organization data
    $organization = array(
        '@context' => 'https://schema.org',
        '@type'    => $org_type,
        'name'     => $org_name,
        'url'      => $site_url
    );
    
    if (!empty($org_description)) {
        $organization['description'] = $org_description;
    }
    
    // Add logo if available
    $org_logo_id = get_theme_mod('obx_schema_org_logo', get_theme_mod('custom_logo'));
    if ($org_logo_id) {
        $logo_url = wp_get_attachment_image_url($org_logo_id, 'full');
        if ($logo_url) {
            $organization['logo'] = $logo_url;
            
            // If local business, add image as well
            if ($org_type === 'LocalBusiness') {
                $organization['image'] = $logo_url;
            }
        }
    }
    
    // Add social profiles if any
    if (!empty($social_profiles)) {
        $organization['sameAs'] = $social_profiles;
    }
    
    return array($schema, $organization);
}

/**
 * Register term meta for categories
 */
function obx_register_category_schema_meta() {
    // Register category schema type
    register_meta('term', 'obx_schema_type', array(
        'type'              => 'string',
        'description'       => 'Schema.org type for this category',
        'single'            => true,
        'sanitize_callback' => 'sanitize_text_field',
        'show_in_rest'      => true,
    ));
    
    // Register category schema keywords
    register_meta('term', 'obx_schema_keywords', array(
        'type'              => 'string',
        'description'       => 'Schema.org keywords for this category',
        'single'            => true,
        'sanitize_callback' => 'sanitize_text_field',
        'show_in_rest'      => true,
    ));
}
add_action('init', 'obx_register_category_schema_meta');

/**
 * Add schema fields to category edit form
 */
function obx_add_category_schema_fields($term) {
    // Get current values
    $schema_type = get_term_meta($term->term_id, 'obx_schema_type', true);
    $schema_keywords = get_term_meta($term->term_id, 'obx_schema_keywords', true);
    ?>
    <tr class="form-field">
        <th scope="row" valign="top"><label for="obx_schema_type"><?php _e('Schema Type', 'obx-theme'); ?></label></th>
        <td>
            <select name="obx_schema_type" id="obx_schema_type">
                <option value=""><?php _e('Default (CollectionPage)', 'obx-theme'); ?></option>
                <option value="CollectionPage" <?php selected($schema_type, 'CollectionPage'); ?>><?php _e('Collection Page', 'obx-theme'); ?></option>
            </select>
            <p class="description"><?php _e('The Schema.org type for this category archive.', 'obx-theme'); ?></p>
        </td>
    </tr>
    <tr class="form-field">
        <th scope="row" valign="top"><label for="obx_schema_keywords"><?php _e('Schema Keywords', 'obx-theme'); ?></label></th>
        <td>
            <input type="text" name="obx_schema_keywords" id="obx_schema_keywords" value="<?php echo esc_attr($schema_keywords); ?>" />
            <p class="description"><?php _e('Comma-separated keywords for this category (optional).', 'obx-theme'); ?></p>
        </td>
    </tr>
    <?php
}
add_action('category_edit_form_fields', 'obx_add_category_schema_fields');

/**
 * Add schema fields to category add form
 */
function obx_add_category_schema_fields_create($taxonomy) {
    ?>
    <div class="form-field">
        <label for="obx_schema_type"><?php _e('Schema Type', 'obx-theme'); ?></label>
        <select name="obx_schema_type" id="obx_schema_type">
            <option value=""><?php _e('Default (CollectionPage)', 'obx-theme'); ?></option>
            <option value="CollectionPage"><?php _e('Collection Page', 'obx-theme'); ?></option>
        </select>
        <p class="description"><?php _e('The Schema.org type for this category archive.', 'obx-theme'); ?></p>
    </div>
    <div class="form-field">
        <label for="obx_schema_keywords"><?php _e('Schema Keywords', 'obx-theme'); ?></label>
        <input type="text" name="obx_schema_keywords" id="obx_schema_keywords" />
        <p class="description"><?php _e('Comma-separated keywords for this category (optional).', 'obx-theme'); ?></p>
    </div>
    <?php
}
add_action('category_add_form_fields', 'obx_add_category_schema_fields_create');

/**
 * Save category schema field values
 */
function obx_save_category_schema_fields($term_id) {
    if (isset($_POST['obx_schema_type'])) {
        update_term_meta(
            $term_id,
            'obx_schema_type',
            sanitize_text_field($_POST['obx_schema_type'])
        );
    }
    
    if (isset($_POST['obx_schema_keywords'])) {
        update_term_meta(
            $term_id,
            'obx_schema_keywords',
            sanitize_text_field($_POST['obx_schema_keywords'])
        );
    }
}
add_action('edited_category', 'obx_save_category_schema_fields');
add_action('created_category', 'obx_save_category_schema_fields');

/**
 * Generate CollectionPage schema for category archives
 */
function obx_get_category_schema() {
    // Get category data
    $category = get_queried_object();
    $cat_title = single_cat_title('', false);
    $cat_description = category_description();
    $cat_url = get_category_link($category->term_id);
    
    // Clean up description
    if (!empty($cat_description)) {
        $cat_description = wp_strip_all_tags($cat_description);
    } else {
        $cat_description = sprintf(__('Archive of posts in the %s category', 'obx-theme'), $cat_title);
    }
    
    // Get schema type override if set
    $schema_type = get_term_meta($category->term_id, 'obx_schema_type', true);
    if (empty($schema_type)) {
        $schema_type = 'CollectionPage';
    }
    
    // Get site/org data
    $site_name = get_bloginfo('name');
    $org_name = get_theme_mod('obx_schema_org_name', $site_name);
    $org_logo_id = get_theme_mod('obx_schema_org_logo', get_theme_mod('custom_logo'));
    $org_logo_url = $org_logo_id ? wp_get_attachment_image_url($org_logo_id, 'full') : '';
    
    $schema = array(
        '@context' => 'https://schema.org',
        '@type'    => $schema_type,
        'headline' => $cat_title,
        'description' => $cat_description,
        'url'      => $cat_url,
        'publisher' => array(
            '@type' => 'Organization',
            'name'  => $org_name,
            'logo'  => array(
                '@type' => 'ImageObject',
                'url'   => $org_logo_url,
            ),
        ),
    );
    
    // Add keywords if available
    $keywords = get_term_meta($category->term_id, 'obx_schema_keywords', true);
    if (!empty($keywords)) {
        $schema['keywords'] = $keywords;
    }
    
    // Try to get thumbnail for the category
    $thumbnail_id = get_term_meta($category->term_id, 'thumbnail_id', true);
    if ($thumbnail_id) {
        $image_url = wp_get_attachment_image_url($thumbnail_id, 'full');
        if ($image_url) {
            $schema['image'] = $image_url;
        }
    }
    
    return $schema;
}

/**
 * Generate schema for pages
 */
function obx_get_page_schema() {
    global $post;
    
    // Get custom overrides if set
    $schema_type = get_post_meta($post->ID, '_obx_schema_type', true);
    
    // If no override, use the default WebPage type
    if (empty($schema_type)) {
        $schema_type = 'WebPage';
    }
    
    // Get page data
    $page_title = get_the_title();
    
    // Check for custom meta title
    $custom_title = get_post_meta($post->ID, '_obx_social_title', true);
    if (!empty($custom_title)) {
        $page_title = $custom_title;
    }
    
    // Get page description
    $custom_description = get_post_meta($post->ID, '_obx_social_description', true);
    if (!empty($custom_description)) {
        $page_excerpt = $custom_description;
    } else {
        $page_excerpt = has_excerpt() ? get_the_excerpt() : wp_trim_words(strip_tags(get_the_content()), 30, '...');
    }
    
    // Get organization data from settings
    $org_name = get_theme_mod('obx_schema_org_name', get_bloginfo('name'));
    $org_logo_id = get_theme_mod('obx_schema_org_logo', get_theme_mod('custom_logo'));
    $org_logo_url = $org_logo_id ? wp_get_attachment_image_url($org_logo_id, 'full') : '';
    
    $schema = array(
        '@context' => 'https://schema.org',
        '@type'    => $schema_type,
        'name'     => $page_title,
        'description' => $page_excerpt,
        'url'      => get_permalink(),
        'datePublished' => get_the_date('c'),
        'dateModified'  => get_the_modified_date('c'),
        'publisher' => array(
            '@type' => 'Organization',
            'name'  => $org_name,
            'logo'  => array(
                '@type' => 'ImageObject',
                'url'   => $org_logo_url,
            ),
        ),
    );
    
    // Special handling for specific page types
    if ($schema_type === 'FAQPage') {
        // For FAQ pages, parse content for FAQs
        $faq_items = obx_extract_faq_content($post->post_content);
        if (!empty($faq_items)) {
            $schema['mainEntity'] = $faq_items;
        }
    } elseif ($schema_type === 'ContactPage') {
        // For contact pages, we could add contact information if available
        // This is a placeholder for potential custom contact info fields
    }
    
    // Add keywords if specified
    $keywords = get_post_meta($post->ID, '_obx_schema_keywords', true);
    if (!empty($keywords)) {
        $schema['keywords'] = $keywords;
    }
    
    // Add featured image if exists
    if (has_post_thumbnail()) {
        $featured_img_url = get_the_post_thumbnail_url(null, 'full');
        $schema['image'] = array(
            '@type' => 'ImageObject',
            'url'   => $featured_img_url,
        );
        
        // Get image dimensions if possible
        $image_id = get_post_thumbnail_id();
        if ($image_id) {
            $image_data = wp_get_attachment_image_src($image_id, 'full');
            if ($image_data) {
                $schema['image']['width'] = $image_data[1];
                $schema['image']['height'] = $image_data[2];
            }
        }
    }
    
    return $schema;
}

/**
 * Helper function to extract FAQ content from page content
 */
function obx_extract_faq_content($content) {
    // This is a basic implementation - you might want to enhance it
    // to work better with your specific content structure
    $faq_items = array();
    
    // Try to find headings followed by paragraphs as Q&A pairs
    preg_match_all('/<h([2-4])[^>]*>(.*?)<\/h\1>(?:\s*)<p>(.*?)<\/p>/is', $content, $matches, PREG_SET_ORDER);
    
    if (!empty($matches)) {
        foreach ($matches as $match) {
            $question = strip_tags($match[2]);
            $answer = strip_tags($match[3]);
            
            if (!empty($question) && !empty($answer)) {
                $faq_items[] = array(
                    '@type' => 'Question',
                    'name' => $question,
                    'acceptedAnswer' => array(
                        '@type' => 'Answer',
                        'text' => $answer
                    )
                );
            }
        }
    }
    
    return $faq_items;
}

/**
 * Generate SearchResultsPage schema for search results
 */
function obx_get_search_schema() {
    // Get search query
    $search_query = get_search_query();
    $search_url = get_search_link($search_query);
    
    // Get site data
    $site_name = get_bloginfo('name');
    $org_name = get_theme_mod('obx_schema_org_name', $site_name);
    $org_logo_id = get_theme_mod('obx_schema_org_logo', get_theme_mod('custom_logo'));
    $org_logo_url = $org_logo_id ? wp_get_attachment_image_url($org_logo_id, 'full') : '';
    
    $schema = array(
        '@context' => 'https://schema.org',
        '@type'    => 'SearchResultsPage',
        'name'     => sprintf(__('Search results for "%s"', 'obx-theme'), $search_query),
        'url'      => $search_url,
        'publisher' => array(
            '@type' => 'Organization',
            'name'  => $org_name,
            'logo'  => array(
                '@type' => 'ImageObject',
                'url'   => $org_logo_url,
            ),
        ),
    );
    
    return $schema;
}

/**
 * Output schema markup in the page head
 */
function obx_add_schema_markup() {
    if (is_singular('post')) {
        $schema = obx_get_article_schema();
        if (!empty($schema)) {
            echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
        }
    } elseif (is_singular('page')) {
        $schema = obx_get_page_schema();
        if (!empty($schema)) {
            echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
        }
    } elseif (is_category()) {
        $schema = obx_get_category_schema();
        if (!empty($schema)) {
            echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
        }
    } elseif (is_front_page()) {
        $schemas = obx_get_website_schema();
        if (!empty($schemas)) {
            foreach ($schemas as $schema) {
                echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
            }
        }
    } elseif (is_search()) {
        $schema = obx_get_search_schema();
        if (!empty($schema)) {
            echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
        }
    }
}
add_action('wp_head', 'obx_add_schema_markup', 10); 