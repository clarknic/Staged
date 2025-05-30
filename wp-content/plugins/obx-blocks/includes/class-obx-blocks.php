<?php
/**
 * Main plugin class
 */

class OBX_Blocks {
    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        // Register hooks
        add_action('init', array($this, 'register_blocks'));
        add_action('admin_menu', array($this, 'add_contact_info_menu'));
        add_action('wp_ajax_submit_contact_form', array($this, 'handle_contact_form_submission'));
        add_action('wp_ajax_nopriv_submit_contact_form', array($this, 'handle_contact_form_submission'));
        add_action('admin_post_delete_contact_submission', array($this, 'delete_contact_submission'));
        add_action('admin_post_edit_contact_submission', array($this, 'edit_contact_submission'));
        add_action('wp_enqueue_scripts', array($this, 'localize_contact_form_script'));
    }

    public function run() {
        // Include form handler
        require_once OBX_BLOCKS_PLUGIN_DIR . 'includes/class-obx-form-handler.php';
    }

    public function register_blocks() {
        $blocks_dir = OBX_BLOCKS_PLUGIN_DIR . 'build/blocks';
        $block_folders = glob($blocks_dir . '/*', GLOB_ONLYDIR);
        
        foreach ($block_folders as $block_folder) {
            $block_json = $block_folder . '/block.json';
            if (file_exists($block_json)) {
                register_block_type($block_json);
            }
        }
    }

    public function add_contact_info_menu() {
        add_menu_page(
            __('Contact Info', 'obx-blocks'),
            __('Contact Info', 'obx-blocks'),
            'manage_options',
            'contact-info',
            array($this, 'render_contact_info_page'),
            'dashicons-email',
            30
        );
    }

    public function render_contact_info_page() {
        if (!current_user_can('manage_options')) {
            wp_die(__('You do not have sufficient permissions to access this page.', 'obx-blocks'));
        }

        global $wpdb;
        $table_name = $wpdb->prefix . 'contact_submissions';
        
        // Get submissions for current site only
        $submissions = $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM $table_name WHERE site_id = %d ORDER BY created_at DESC",
            get_current_blog_id()
        ));
        
        include OBX_BLOCKS_PLUGIN_DIR . 'admin/contact-info-page.php';
    }

    /**
     * Handles contact form submissions via AJAX
     */
    public function handle_contact_form_submission() {
        // Verify nonce - check both nonce parameter (from built-in form) and security (from obx_site)
        if (!check_ajax_referer('contact_form_nonce', 'nonce', false) && 
            !check_ajax_referer('obx_site_nonce', 'security', false)) {
            wp_send_json_error(array('message' => 'Invalid security token. Please refresh the page and try again.'));
            return;
        }

        // Get form handler instance
        $form_handler = OBX_Form_Handler::get_instance();

        // Process submission
        $response = $form_handler->process_submission($_POST);

        // Send response
        if ($response['success']) {
            wp_send_json_success($response);
        } else {
            wp_send_json_error($response);
        }
    }

    public function delete_contact_submission() {
        if (!current_user_can('manage_options')) {
            wp_die(__('You do not have sufficient permissions to access this page.', 'obx-blocks'));
        }

        check_admin_referer('delete_contact_submission');

        $id = intval($_POST['submission_id']);
        global $wpdb;
        $table_name = $wpdb->prefix . 'contact_submissions';
        
        // Ensure we only delete submissions from current site
        $wpdb->delete(
            $table_name,
            array(
                'id' => $id,
                'site_id' => get_current_blog_id()
            ),
            array('%d', '%d')
        );

        wp_redirect(add_query_arg('deleted', '1', admin_url('admin.php?page=contact-info')));
        exit;
    }

    public function edit_contact_submission() {
        if (!current_user_can('manage_options')) {
            wp_die(__('You do not have sufficient permissions to access this page.', 'obx-blocks'));
        }

        check_admin_referer('edit_contact_submission');

        $id = intval($_POST['submission_id']);
        $name = sanitize_text_field($_POST['name']);
        $email = sanitize_email($_POST['email']);
        $phone = sanitize_text_field($_POST['phone']);
        $message = sanitize_textarea_field($_POST['message']);

        global $wpdb;
        $table_name = $wpdb->prefix . 'contact_submissions';
        
        // Ensure we only update submissions from current site
        $wpdb->update(
            $table_name,
            array(
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'message' => $message
            ),
            array(
                'id' => $id,
                'site_id' => get_current_blog_id()
            ),
            array('%s', '%s', '%s', '%s'),
            array('%d', '%d')
        );

        wp_redirect(add_query_arg('updated', '1', admin_url('admin.php?page=contact-info')));
        exit;
    }

    /**
     * Localize the contact form script with necessary data
     */
    public function localize_contact_form_script() {
        if (has_block('obx-blocks/contact')) {
            wp_localize_script('obx-blocks-contact-view-script', 'obx_blocks', array(
                'ajax_url' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('contact_form_nonce')
            ));
        }
    }
}

register_activation_hook(__FILE__, function($network_wide) {
    if (is_multisite() && $network_wide) {
        // Network-wide activation
        $sites = get_sites();
        foreach ($sites as $site) {
            switch_to_blog($site->blog_id);
            // Create tables and set up options
            restore_current_blog();
        }
    } else {
        // Single site activation
        // Create tables and set up options
    }
}); 