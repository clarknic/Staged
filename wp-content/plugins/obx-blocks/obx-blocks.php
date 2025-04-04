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

/**
 * Initialize the plugin
 */
function obx_blocks_init() {
    // Automatically register all blocks from the build directory
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
                    error_log('OBX Blocks: Registering block: ' . $block_name);
                    
                    // Register the block with its render callback
                    register_block_type($block_folder);
                }
            }
        } else {
            error_log('OBX Blocks: No block folders found in ' . $blocks_dir);
        }
    } else {
        error_log('OBX Blocks: Blocks directory not found at ' . $blocks_dir);
    }
}
add_action('init', 'obx_blocks_init');

/**
 * Enqueue block editor assets
 */
function obx_blocks_editor_assets() {
    wp_enqueue_style(
        'obx-blocks-editor-style',
        OBX_BLOCKS_PLUGIN_URL . 'build/css/editor.css',
        array(),
        OBX_BLOCKS_VERSION
    );
}
add_action('enqueue_block_editor_assets', 'obx_blocks_editor_assets');

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
 * Verify block registration
 */
function obx_blocks_verify_registration() {
    $registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
    error_log('OBX Blocks: Registered blocks:');
    foreach ($registered_blocks as $block_name => $block) {
        if (strpos($block_name, 'obx-blocks/') === 0) {
            error_log('OBX Blocks: Found registered block: ' . $block_name);
        }
    }
}
add_action('init', 'obx_blocks_verify_registration', 20);

/**
 * Load text domain
 */
function obx_blocks_load_textdomain() {
    load_plugin_textdomain('obx-blocks', false, dirname(plugin_basename(__FILE__)) . '/languages');
}
add_action('plugins_loaded', 'obx_blocks_load_textdomain');
