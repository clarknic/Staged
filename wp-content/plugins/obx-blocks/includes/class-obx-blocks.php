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
    }

    public function run() {
        // Include form handler
        require_once OBX_BLOCKS_PLUGIN_DIR . 'includes/class-obx-form-handler.php';
    }

    public function register_blocks() {
        // Get all blocks from the build directory
        $blocks_dir = OBX_BLOCKS_PLUGIN_DIR . 'build/blocks';
        
        // Check if the blocks directory exists
        if (file_exists($blocks_dir) && is_dir($blocks_dir)) {
            // Get all subdirectories (each should be a block)
            $block_folders = array_filter(glob($blocks_dir . '/*'), 'is_dir');
            
            if (!empty($block_folders)) {
                foreach ($block_folders as $block_folder) {
                    // Check if block.json exists in the folder
                    if (file_exists($block_folder . '/block.json')) {
                        $block_name = basename($block_folder);
                        $block_path = $blocks_dir . '/' . $block_name;
                        
                        // Check if block is already registered
                        if (!WP_Block_Type_Registry::get_instance()->is_registered('obx-blocks/' . $block_name)) {
                            // Include the render.php file if it exists
                            $render_file = $block_path . '/render.php';
                            if (file_exists($render_file)) {
                                ob_start();
                                require_once $render_file;
                                ob_end_clean();
                            }
                            
                            register_block_type($block_path);
                            error_log('OBX Blocks: Registered block: ' . $block_name);
                        }
                    }
                }
            } else {
                error_log('OBX Blocks: No block folders found in ' . $blocks_dir);
            }
        } else {
            error_log('OBX Blocks: Blocks directory not found at ' . $blocks_dir);
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
        global $wpdb;
        $table_name = $wpdb->prefix . 'contact_submissions';
        $submissions = $wpdb->get_results("SELECT * FROM $table_name ORDER BY created_at DESC");
        
        include OBX_BLOCKS_PLUGIN_DIR . 'admin/contact-info-page.php';
    }

    /**
     * Handles contact form submissions via AJAX
     */
    public function handle_contact_form_submission() {
        // Verify nonce
        if (!check_ajax_referer('contact_form_nonce', 'nonce', false)) {
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
        $wpdb->delete($table_name, array('id' => $id), array('%d'));

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
        $wpdb->update(
            $table_name,
            array(
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'message' => $message
            ),
            array('id' => $id),
            array('%s', '%s', '%s', '%s'),
            array('%d')
        );

        wp_redirect(add_query_arg('updated', '1', admin_url('admin.php?page=contact-info')));
        exit;
    }
} 