<?php
/**
 * Fired during plugin activation
 *
 * @package    OBX_Blocks
 * @subpackage OBX_Blocks/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @package    OBX_Blocks
 * @subpackage OBX_Blocks/includes
 */
class OBX_Blocks_Activator {

    /**
     * Create the contact submissions table on plugin activation.
     */
    public static function activate() {
        global $wpdb;
        $table_name = $wpdb->prefix . 'contact_submissions';
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE IF NOT EXISTS $table_name (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            name varchar(100) NOT NULL,
            email varchar(100) NOT NULL,
            phone varchar(20) NOT NULL,
            message text NOT NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY  (id)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
} 