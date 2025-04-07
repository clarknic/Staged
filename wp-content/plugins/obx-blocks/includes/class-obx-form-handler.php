<?php
/**
 * Form submission handler class
 */

class OBX_Form_Handler {
    private static $instance = null;
    private $table_name;
    private $rate_limit_minutes = 5;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        global $wpdb;
        $this->table_name = $wpdb->prefix . 'contact_submissions';
    }

    /**
     * Process form submission
     *
     * @param array $data Form submission data
     * @return array Response data
     */
    public function process_submission($data) {
        try {
            // Validate and sanitize data
            $validated_data = $this->validate_submission($data);
            
            // Check rate limiting
            if ($this->is_rate_limited()) {
                throw new Exception('Please wait a few minutes before submitting again.');
            }

            // Save to database
            $submission_id = $this->save_submission($validated_data);
            if (!$submission_id) {
                throw new Exception('Failed to save your message. Please try again later.');
            }

            // Send email notification
            $email_sent = $this->send_notification($validated_data);
            if (!$email_sent) {
                error_log('OBX Blocks: Failed to send email notification for submission ID: ' . $submission_id);
            }

            // Set rate limit
            $this->set_rate_limit();

            return array(
                'success' => true,
                'message' => 'Thank you for your message. We will get back to you soon.',
                'submission_id' => $submission_id
            );

        } catch (Exception $e) {
            return array(
                'success' => false,
                'message' => $e->getMessage()
            );
        }
    }

    /**
     * Validate and sanitize submission data
     *
     * @param array $data Raw submission data
     * @return array Validated and sanitized data
     * @throws Exception If validation fails
     */
    private function validate_submission($data) {
        $required_fields = array('name', 'email', 'phone', 'message');
        $validated = array();

        // Check required fields
        foreach ($required_fields as $field) {
            if (empty($data[$field])) {
                throw new Exception('Please fill in all required fields.');
            }
            $validated[$field] = sanitize_text_field($data[$field]);
        }

        // Validate email
        if (!is_email($validated['email'])) {
            throw new Exception('Please enter a valid email address.');
        }

        // Validate message length
        if (strlen($validated['message']) > 500) {
            throw new Exception('Message cannot exceed 500 characters.');
        }

        // Add timestamp
        $validated['created_at'] = current_time('mysql');

        return $validated;
    }

    /**
     * Save submission to database
     *
     * @param array $data Validated submission data
     * @return int|false Submission ID or false on failure
     */
    private function save_submission($data) {
        global $wpdb;

        $result = $wpdb->insert(
            $this->table_name,
            array(
                'name' => 'Name: ' . $data['name'],
                'email' => $data['email'],
                'phone' => 'Phone: ' . $data['phone'],
                'message' => 'Message: ' . $data['message'],
                'created_at' => $data['created_at']
            ),
            array('%s', '%s', '%s', '%s', '%s')
        );

        return $result ? $wpdb->insert_id : false;
    }

    /**
     * Send email notification
     *
     * @param array $data Submission data
     * @return bool Whether the email was sent
     */
    private function send_notification($data) {
        // Decode mail data
        $mail_data = json_decode(base64_decode($data['mail_data']), true);
        
        $recipients = !empty($mail_data['mail_receivers']) ? $mail_data['mail_receivers'] : get_option('admin_email');
        $subject = !empty($mail_data['mail_subject']) ? $mail_data['mail_subject'] : __('New Contact Form Submission', 'obx-blocks');
        
        $body = sprintf(
            "Name: %s\nEmail: %s\nPhone: %s\n\nMessage:\n%s",
            $data['name'],
            $data['email'],
            $data['phone'],
            $data['message']
        );
        
        $headers = array(
            'Content-Type: text/plain; charset=UTF-8',
            'From: ' . $data['name'] . ' <' . $data['email'] . '>',
            'Reply-To: ' . $data['email']
        );
        
        return wp_mail($recipients, $subject, $body, $headers);
    }

    /**
     * Check if user is rate limited
     *
     * @return bool Whether the user is rate limited
     */
    private function is_rate_limited() {
        $ip = $_SERVER['REMOTE_ADDR'];
        $transient_key = 'contact_form_' . md5($ip);
        return (bool) get_transient($transient_key);
    }

    /**
     * Set rate limit for user
     */
    private function set_rate_limit() {
        $ip = $_SERVER['REMOTE_ADDR'];
        $transient_key = 'contact_form_' . md5($ip);
        set_transient($transient_key, true, $this->rate_limit_minutes * MINUTE_IN_SECONDS);
    }
} 