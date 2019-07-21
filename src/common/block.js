const { InnerBlocks, PlainText } = wp.editor;
const { registerBlockType, registerBlockStyle } = wp.blocks;
import domReady from '@wordpress/dom-ready';

import './style.scss';
import './editor.scss';

/********************************************************
 *   Embeding of a video
 ********************************************************/

const fdd_embedingStyles = [
  { name: 'default', label: '<Not selected>', isDefault: true },
  { name: 'square', label: 'Square 1:1' },
  { name: 'horiz-15-10', label: 'Landscape 3:2' },
  { name: 'horiz-4-266', label: 'Landscape 4:2.66' },
  { name: 'horiz-4-3', label: 'Landscape 4:3' },
  { name: 'horiz-16-844', label: 'Landscape 16:8.44' },
  { name: 'horiz-16-9', label: 'Landscape 16:9' },
  { name: 'horiz-16-10', label: 'Landscape 16:10' },
  { name: 'vertical-15-10', label: 'Portrait 2:3' },
  { name: 'vertical-16-844', label: 'Portrait 8.44:16' },
  { name: 'vertical-16-9', label: 'Portrait 9:16' },
];

domReady(() => {
  fdd_embedingStyles.forEach(style => {
    registerBlockStyle('core-embed/youtube', style);
  });
});

/********************************************************
 *   Subtitled paragraph
 ********************************************************/

registerBlockType('fdd-block/para-with-title', {
  title: 'Titled paragraph',
  icon: 'editor-table',
  category: 'fdd-block-category',
  useOnce: true,
  parent: ['fdd-block/recipe--text'],
  attributes: {
    title: {
      type: 'string',
      placeholder: 'Section Title',
    },
  },
  styles: [
    { name: 'default', label: 'Default', isDefault: true },
    { name: 'two-columns', label: 'Two Columns' },
  ],

  edit({ attributes, setAttributes, insertBlocksAfter }) {
    if (!insertBlocksAfter) {
      // https://github.com/WordPress/gutenberg/issues/9897#issuecomment-454390792
      return <div className='fake-preview'></div>;
    }
    return (
      <div className="container">
        <PlainText
          onChange={content => setAttributes({ title: content })}
          value={attributes.title}
        />
        <InnerBlocks
          allowedBlocks={['core/paragraph', 'core/list']}
          template={[
            ['core/paragraph', { placeholder: '...' }],
          ]}
          templateLock={false}
        />
      </div>
    );
  },

  save() {
    return <InnerBlocks.Content />;
  },

  deprecated: [
    {
      attributes: {
        title: {
          source: 'text',
          selector: '.fdd-titled-para__title',
          placeholder: 'Section Title',
        },
      },
      save({ className, attributes }) {
        let classes = ["fdd-titled-para", className].join(" ");
        return (
          <div className={classes}>
            <h3 className="fdd-titled-para__title">{attributes.title}</h3>
            <div className="fdd-titled-para__inner"><InnerBlocks.Content /></div>
          </div>
        );
      },
    },
    {
      attributes: {
        title: {
          source: 'text',
          selector: '.fdd-titled-para__title',
          placeholder: 'Section Title',
        },
      },
      save({ className, attributes }) {
        let classes = ["fdd-titled-para", className].join(" ");
        return (
          <div className={classes}>
            <h3 className="fdd-titled-para__title">{attributes.title}</h3>
            <div><InnerBlocks.Content /></div>
          </div>
        );
      },
    },
  ]

});
