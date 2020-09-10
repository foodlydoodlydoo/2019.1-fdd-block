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

wp.hooks.addFilter(
  'blocks.registerBlockType',
  'fdd-blocks/common/registerBlockType_hook',
  function (properties, name) {
    // ***** TODO
    // Disabled because `properties.edit` is no longer a function.
    // This was a hack anyway :(
    if (false && name === 'core/image') {
      //console.log(`registration`);
      //console.log(properties);

      let edit = properties.edit;
      properties.edit = function () {
        //console.log(`hook to core/image.edit() ENTER`);
        //console.log(arguments);

        let block = arguments[0];
        //console.log(block);
        let { attributes, className } = block;
        if (className && !className.match(/\bno-link\b/)) {
          block.setAttributes({
            linkDestination: 'media',
            href: attributes.url,
            caption: '',
          });
        }

        //console.log(edit);
        let result = edit.apply(this, arguments);

        //console.log(`hook to core/image.edit() LEAVE`);
        return result;
      }
    }
    return properties;
  }
);
