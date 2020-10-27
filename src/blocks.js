/**
 * Gutenberg Blocks
 *
 * All blocks related JavaScript files should be imported here.
 * You can create a new block folder in this dir and include code
 * for that block here as well.
 *
 * All blocks should be included here since this is the file that
 * Webpack is compiling as the input file.
 */

import './common/block.js';
import './art/block.js';
import './recipe/block.js';

// Don't forget to update init.php to add new php render code
// The link type default should be fixed with
// https://github.com/WordPress/gutenberg/pull/25578/commits

import './extend/image-product.js';
