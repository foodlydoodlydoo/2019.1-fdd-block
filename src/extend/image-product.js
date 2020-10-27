const { addFilter } = wp.hooks;
const { __ } = wp.i18n;
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, TextControl } = wp.components;

import './style.scss';

// Enable spacing control on the following blocks
const enableProductLinkOnBlocks = [
  'core/image',
];

const addProductAttribute = (settings, name) => {
  if (!enableProductLinkOnBlocks.includes(name)) {
    return settings;
  }

  settings.attributes = Object.assign(settings.attributes, {
    productSlug: {
      type: 'string',
      default: '',
    },
  });

  return settings;
};

addFilter('blocks.registerBlockType', 'fdd-extend/product/attrs', addProductAttribute);

const withProductReference = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    if (!enableProductLinkOnBlocks.includes(props.name)) {
      return (
        <BlockEdit {...props} />
      );
    }

    const { productSlug } = props.attributes;

    return (
      <Fragment>
        <BlockEdit {...props} />
        <InspectorControls>
          <PanelBody
            title={__('Product slug to link to')}
            initialOpen={true}
          >
            <TextControl
              value={productSlug}
              onChange={(nextValue) => {
                props.setAttributes({
                  productSlug: nextValue,
                });
              }}
            />
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  };
}, 'withProductReference');

addFilter('editor.BlockEdit', 'fdd-extend/editor/product/ref-field', withProductReference);

const addProductSlugExtraProps = (saveElementProps, blockType, attributes) => {
  if (!enableProductLinkOnBlocks.includes(blockType.name)) {
    return saveElementProps;
  }

  // This adds a new attribute to the saved markup we then can dynamically process
  Object.assign(saveElementProps, { productslug: attributes.productSlug });
  return saveElementProps;
};

addFilter('blocks.getSaveContent.extraProps', 'fdd-extend/product/extra-props', addProductSlugExtraProps);

/**
 * With this we end up as:
 * <figure>
 *   <a href="image"><img/></a>
 *   <a href="product"></a>
 * </figure>
 *
 * ...and the first <a> captures (via the pswp event) the click.
 * Hence we need a different mechanism to capture users' clicks.
 *
const modifyGetSaveElement = (element, blockType, attributes) => {
  if (!enableProductLinkOnBlocks.includes(blockType.name)) {
    return element;
  }

  let productSlug = attributes.productSlug;
  if (!productSlug) {
    return element;
  }

  productSlug = "/product/" + productSlug;

  const children = wp.element.Children.map(element.props.children, child => child);
  children.push(
    <a class="fdd-product-link" href={productSlug}> </a>
  );
  const clone = wp.element.cloneElement(element, element.props, children);

  return clone;
};

wp.hooks.addFilter('blocks.getSaveElement', 'fdd-extend/product/get-save-element', modifyGetSaveElement);
*/
