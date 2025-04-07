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
     * 
     * @param bool $network_wide Whether to activate the plugin for all sites in the network
     */
    public static function activate($network_wide = false) {
        if (is_multisite() && $network_wide) {
            // Network-wide activation
            $sites = get_sites();
            foreach ($sites as $site) {
                switch_to_blog($site->blog_id);
                self::create_tables();
                restore_current_blog();
            }
        } else {
            // Single site activation
            self::create_tables();
        }
    }

    /**
     * Create necessary database tables
     */
    private static function create_tables() {
        global $wpdb;
        $table_name = $wpdb->prefix . 'contact_submissions';
        $charset_collate = $wpdb->get_charset_collate();

        // Check if table exists
        if ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") != $table_name) {
            $sql = "CREATE TABLE $table_name (
                id bigint(20) NOT NULL AUTO_INCREMENT,
                name varchar(100) NOT NULL,
                email varchar(100) NOT NULL,
                phone varchar(20) NOT NULL,
                message text NOT NULL,
                created_at datetime DEFAULT CURRENT_TIMESTAMP,
                site_id bigint(20) NOT NULL DEFAULT 1,
                site_url varchar(255) NOT NULL DEFAULT '',
                PRIMARY KEY  (id),
                KEY site_id (site_id)
            ) $charset_collate;";

            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            dbDelta($sql);
        } else {
            // Table exists, check for new columns
            $columns = $wpdb->get_results("SHOW COLUMNS FROM $table_name");
            $column_names = wp_list_pluck($columns, 'Field');
            
            // Add site_id if not exists
            if (!in_array('site_id', $column_names)) {
                $wpdb->query("ALTER TABLE $table_name ADD COLUMN site_id bigint(20) NOT NULL DEFAULT 1");
            }
            
            // Add site_url if not exists
            if (!in_array('site_url', $column_names)) {
                $wpdb->query("ALTER TABLE $table_name ADD COLUMN site_url varchar(255) NOT NULL DEFAULT ''");
            }
            
            // Add index for site_id if not exists
            $indexes = $wpdb->get_results("SHOW INDEX FROM $table_name");
            $index_names = wp_list_pluck($indexes, 'Key_name');
            if (!in_array('site_id', $index_names)) {
                $wpdb->query("ALTER TABLE $table_name ADD INDEX site_id (site_id)");
            }
        }
    }
} 