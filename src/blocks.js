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

import './art/block.js';
import './stepbystep/block.js';

wp.hooks.addFilter(
  'blocks.registerBlockType',
  'my-plugin/class-names/list-block',
  (properties, name) => {
    //console.log(name);
    //console.log(properties);
    if (name === 'core/image') {
    }
    return properties;
  }
);
