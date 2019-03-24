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

wp.hooks.addFilter(
  'blocks.registerBlockType',
  'fdd-blocks/common/hook',
  (properties, name) => {
    if (name === 'core/image') {
      //console.log(`registration`);
      //console.log(properties);

      let edit = properties.edit;
      properties.edit = function () {
        //console.log(`hook to core/image.edit() ENTER`);
        //console.log(arguments);

        let block = arguments[0];
        let { attributes } = block;
        block.setAttributes({
          linkDestination: 'media',
          href: attributes.url,
          caption: '',
        });

        let result = edit.apply(this, arguments);

        //console.log(`hook to core/image.edit() LEAVE`);
        return result;
      }
    }
    return properties;
  }
);
