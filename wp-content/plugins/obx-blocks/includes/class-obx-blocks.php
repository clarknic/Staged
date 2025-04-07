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

        // Sanitize and validate form data
        $name = sanitize_text_field($_POST['name'] ?? '');
        $email = sanitize_email($_POST['email'] ?? '');
        $phone = sanitize_text_field($_POST['phone'] ?? '');
        $message = sanitize_textarea_field($_POST['message'] ?? '');
        $block_id = sanitize_text_field($_POST['block_id'] ?? '');

        // Validate required fields
        if (empty($name) || empty($email) || empty($phone) || empty($message)) {
            wp_send_json_error(array('message' => 'Please fill in all required fields.'));
            return;
        }

        // Validate email format
        if (!is_email($email)) {
            wp_send_json_error(array('message' => 'Please enter a valid email address.'));
            return;
        }

        // Validate message length
        if (strlen($message) > 500) {
            wp_send_json_error(array('message' => 'Message cannot exceed 500 characters.'));
            return;
        }

        // Rate limiting
        $ip = $_SERVER['REMOTE_ADDR'];
        $transient_key = 'contact_form_' . md5($ip);
        if (get_transient($transient_key)) {
            wp_send_json_error(array('message' => 'Please wait a few minutes before submitting again.'));
            return;
        }

        global $wpdb;
        $table_name = $wpdb->prefix . 'contact_submissions';

        // Format fields for database storage
        $db_name = 'Name: ' . $name;
        $db_phone = 'Phone: ' . $phone;
        $db_message = 'Message: ' . $message;

        // Insert submission
        $result = $wpdb->insert(
            $table_name,
            array(
                'name' => $db_name,
                'email' => $email,
                'phone' => $db_phone,
                'message' => $db_message,
                'created_at' => current_time('mysql')
            ),
            array('%s', '%s', '%s', '%s', '%s')
        );

        if ($result === false) {
            wp_send_json_error(array('message' => 'Failed to save your message. Please try again later.'));
            return;
        }

        // Set rate limiting transient
        set_transient($transient_key, true, 5 * MINUTE_IN_SECONDS);

        // Get email settings from block attributes
        $block_data = $this->get_contact_block_data($block_id);
        
        // Send email notification
        $this->send_contact_email($name, $email, $phone, $message, $block_data);

        // Send success response
        wp_send_json_success(array('message' => 'Thank you for your message. We will get back to you soon.'));
    }

    /**
     * Get block data by block ID
     *
     * @param string $block_id The block ID
     * @return array Block data with default values if not found
     */
    private function get_contact_block_data($block_id) {
        global $wpdb;
        
        // First try to get from post meta (for regular posts)
        $meta_query = $wpdb->prepare(
            "SELECT meta_value FROM {$wpdb->postmeta} WHERE meta_key LIKE %s AND meta_value LIKE %s LIMIT 1",
            '%_block_instances%',
            '%' . $wpdb->esc_like($block_id) . '%'
        );
        
        $meta_value = $wpdb->get_var($meta_query);
        
        if ($meta_value) {
            $blocks_data = maybe_unserialize($meta_value);
            
            if (is_array($blocks_data)) {
                foreach ($blocks_data as $block) {
                    if (isset($block['id']) && $block['id'] === $block_id) {
                        return $block['attrs'] ?? array();
                    }
                }
            }
        }
        
        // Fallback
        return array(
            'mailReceivers' => get_option('admin_email'),
            'mailSubject' => 'New Contact Form Submission'
        );
    }

    /**
     * Send contact form email
     *
     * @param string $name The sender's name
     * @param string $email The sender's email
     * @param string $phone The sender's phone
     * @param string $message The message
     * @param array $block_data The block data containing email settings
     * @return bool Whether the email was sent
     */
    private function send_contact_email($name, $email, $phone, $message, $block_data) {
        // Get recipients
        $recipients = !empty($block_data['mailReceivers']) ? $block_data['mailReceivers'] : get_option('admin_email');
        
        // Get subject
        $subject = !empty($block_data['mailSubject']) ? $block_data['mailSubject'] : __('New Contact Form Submission', 'obx-blocks');
        
        // Format message body
        $body = sprintf(
            "Name: %s\nEmail: %s\nPhone: %s\n\nMessage:\n%s",
            $name,
            $email,
            $phone,
            $message
        );
        
        // Set headers
        $headers = array(
            'Content-Type: text/plain; charset=UTF-8',
            'From: ' . $name . ' <' . $email . '>',
            'Reply-To: ' . $email
        );
        
        // Send email
        return wp_mail($recipients, $subject, $body, $headers);
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