<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
  exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function fdd_block_cgb_block_assets() {
  // phpcs:ignore
  // Styles.
  wp_enqueue_style(
    'fdd_block-cgb-style-css', // Handle.
    plugins_url('dist/blocks.style.build.css', dirname(__FILE__)), // Block style CSS.
    array('wp-editor', 'fdd-style') // Dependency to include the CSS after it.
    // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
  );
}

// Hook: Frontend assets.
add_action('enqueue_block_assets', 'fdd_block_cgb_block_assets');

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function fdd_block_cgb_editor_assets() {
  // phpcs:ignore
  // Scripts.
  wp_enqueue_script(
    'fdd_block-cgb-block-js', // Handle.
    plugins_url('/dist/blocks.build.js', dirname(__FILE__)), // Block.build.js: We register the block here. Built with Webpack.
    array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'), // Dependencies, defined above.
    // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: File modification time.
    true// Enqueue the script in the footer.
  );

  // Styles.
  wp_enqueue_style(
    'fdd_block-cgb-block-editor-css', // Handle.
    plugins_url('dist/blocks.editor.build.css', dirname(__FILE__)), // Block editor CSS.
    array('wp-edit-blocks') // Dependency to include the CSS after it.
    // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
  );
}

// Hook: Editor assets.
add_action('enqueue_block_editor_assets', 'fdd_block_cgb_editor_assets');

// FDD blocks category

function fdd_blocks_categories($categories, $post) {
  if ($post->post_type !== 'post') {
    return $categories;
  }
  return array_merge(
    $categories,
    array(
      array(
        'slug' => 'fdd-block-category',
        'title' => 'FDD',
        'icon' => 'palmtree',
      ),
    )
  );
}
add_filter('block_categories', 'fdd_blocks_categories', 10, 2);

// FDD render hooks

// see: https://www.ibenic.com/enable-inner-blocks-gutenberg/
//function fdd_block_register_blocks() {
//  register_block_type('fdd-block/recipe--characteristics', [
//    'render_callback' => 'fdd_render_callback_frontend_recipe__characteristics',
//  ]);
//}
//add_action('init', 'fdd_block_register_blocks');

//function fdd_collect_innerblocks($block) {
//  if (!array_key_exists('innerBlocks', $block)) {
//    return '';
//  }
//
//  $content = '';
//  $innerBlocks = $block['innerBlocks'];
//  foreach ($innerBlocks as $innerBlock) {
//    $content .= $innerBlock['innerHTML'];
//    $content .= fdd_collect_innerblocks($innerBlock, $content);
//  }
//
//  return $content;
//}

function fdd_render_block_frontend($content, $block) {
  $is_fdd_block = preg_match('/^fdd-block\/(.*)/', $block['blockName'], $match);
  if ($is_fdd_block) {
    $fdd_block = $match[1];
    $fdd_block_render_fuction = "fdd_render_block__" . str_replace('-', '_', $fdd_block);
    if (is_callable($fdd_block_render_fuction)) {
      $content = call_user_func($fdd_block_render_fuction, $content, $block, $block['attrs']);
    }
  }

  return $content;
}
add_action('render_block', 'fdd_render_block_frontend', 10, 2);

require_once 'art/render.php';
require_once 'common/render.php';
require_once 'recipe/render.php';
