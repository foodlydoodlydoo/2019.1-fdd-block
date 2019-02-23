<?php
/**
 * Plugin Name: FDD Block — a Gutenberg plugin.
 * Plugin URI: https://foodlydoodlydoo.com/
 * Description: FDD Block — a Gutenberg plugin.
 * Author: mhm
 * Author URI: https://foodlydoodlydoo.com/
 * Version: 1.0.0
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
