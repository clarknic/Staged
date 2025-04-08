<?php
/**
 * Plugin Name: OBX Blocks
 * Description: Custom Gutenberg blocks for OBX Web Lab themes.
 * Version: 1.0.0
 * Author: OBX Web Lab
 * Author URI: https://obxweblab.com
 * Text Domain: obx-blocks
 * Domain Path: /languages
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Define plugin constants
 */
define('OBX_BLOCKS_VERSION', '1.0.0');
define('OBX_BLOCKS_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('OBX_BLOCKS_PLUGIN_URL', plugin_dir_url(__FILE__));

// Include global functions
require_once plugin_dir_path(__FILE__) . 'includes/functions.php';

// Include required files
require_once OBX_BLOCKS_PLUGIN_DIR . 'includes/class-obx-blocks-activator.php';
require_once OBX_BLOCKS_PLUGIN_DIR . 'includes/class-obx-blocks.php';

/**
 * Register activation hook
 */
register_activation_hook(__FILE__, array('OBX_Blocks_Activator', 'activate'));

/**
 * Register block categories
 */
function obx_blocks_register_category($categories) {
    return array_merge(
        $categories,
        array(
            array(
                'slug' => 'obx-blocks',
                'title' => __('OBX Blocks', 'obx-blocks'),
            ),
        )
    );
}
add_filter('block_categories_all', 'obx_blocks_register_category', 10, 1);

/**
 * Load text domain
 */
function obx_blocks_load_textdomain() {
    load_plugin_textdomain('obx-blocks', false, dirname(plugin_basename(__FILE__)) . '/languages');
}
add_action('plugins_loaded', 'obx_blocks_load_textdomain');

/**
 * Localize scripts for blocks that require ajax
 */
function obx_blocks_localize_scripts() {
    // Check if the block's script is enqueued or if we're on a page with the contact block
    if (wp_script_is('obx-blocks-contact-view-script', 'registered')) {
        // Localize the ajax URL for the contact form
        wp_localize_script('obx-blocks-contact-view-script', 'obx_blocks', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('contact_form_nonce')
        ));
    }
}
// Use a later priority to ensure the script is registered first
add_action('wp_enqueue_scripts', 'obx_blocks_localize_scripts', 99);

// Initialize the plugin
function run_obx_blocks() {
    $plugin = OBX_Blocks::get_instance();
    $plugin->run();
}
add_action('plugins_loaded', 'run_obx_blocks');
