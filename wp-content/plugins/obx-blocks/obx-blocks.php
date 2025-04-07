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
 * Enqueue frontend assets
 */
function obx_blocks_frontend_assets() {
    error_log('OBX Blocks: Enqueuing frontend assets');
    
    // Enqueue main style file
    if (file_exists(OBX_BLOCKS_PLUGIN_DIR . 'build/css/style-index.css')) {
        wp_enqueue_style(
            'obx-blocks-style',
            OBX_BLOCKS_PLUGIN_URL . 'build/css/style-index.css',
            array(),
            OBX_BLOCKS_VERSION
        );
        error_log('OBX Blocks: Enqueued main style file');
    } else {
        error_log('OBX Blocks: Main style file not found');
    }

    // Enqueue individual block styles
    $blocks_dir = OBX_BLOCKS_PLUGIN_DIR . 'build/blocks';
    if (file_exists($blocks_dir) && is_dir($blocks_dir)) {
        $block_folders = array_filter(glob($blocks_dir . '/*'), 'is_dir');
        foreach ($block_folders as $block_folder) {
            $style_file = $block_folder . '/style-index.css';
            if (file_exists($style_file)) {
                $block_name = basename($block_folder);
                wp_enqueue_style(
                    'obx-blocks-' . $block_name,
                    OBX_BLOCKS_PLUGIN_URL . 'build/blocks/' . $block_name . '/style-index.css',
                    array(),
                    OBX_BLOCKS_VERSION
                );
                error_log('OBX Blocks: Enqueued style for block: ' . $block_name);
            }
        }
    }
}
add_action('wp_enqueue_scripts', 'obx_blocks_frontend_assets');

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

// Initialize the plugin
function run_obx_blocks() {
    $plugin = OBX_Blocks::get_instance();
    $plugin->run();
}
add_action('plugins_loaded', 'run_obx_blocks');
