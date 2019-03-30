const { InnerBlocks, PlainText } = wp.editor;
const { registerBlockType, registerBlockStyle } = wp.blocks;
import domReady from '@wordpress/dom-ready';

import './style.scss';
import './editor.scss';

/********************************************************
 *   Embeding of a video
 ********************************************************/

const fdd_embedingStyles = [
  { name: '_default', label: 'Default', isDefault: true },
  { name: 'vertical', label: 'Vertical' },
];

domReady(() => {
  fdd_embedingStyles.forEach(style => {
    registerBlockStyle('core-embed/youtube', style);
    console.log(style);
  });
});

/*

// Removed in favor of core-embed/youtube

registerBlockType('fdd-block/video-embed', {
  title: 'Video Block',
  icon: 'format-video',
  category: 'fdd-block-category',
  useOnce: true,
  parent: [
    'fdd-block/recipe--media',
  ],
  attributes: {
  },
  styles: fdd_embedingStyles,

  edit({ insertBlocksAfter }) {
    if (!insertBlocksAfter) {
      // https://github.com/WordPress/gutenberg/issues/9897#issuecomment-454390792
      return <div className='fake-preview'></div>;
    }
    return (
      <div className="container">
        Type in the &lt;iframe&gt; code for video:
        <InnerBlocks
          allowedBlocks={['core/html']}
          template={[['core/html']]}
          templateLock="all"
        />
      </div>
    );
  },

  save({ className }) {
    let classes = ["fdd-video-wrapper-outer", className].join(" ");
    return (
      <div className={classes}>
        <div className="fdd-video-wrapper-inner">
          <InnerBlocks.Content />
        </div>
      </div>
    );
  }
});

*/


/********************************************************
 *   Subtitled paragraph
 ********************************************************/

const paraWithTitleAttributes = {
  title: {
    source: 'text',
    selector: '.fdd-titled-para__title',
    placeholder: 'Section Title',
  },
};

registerBlockType('fdd-block/para-with-title', {
  title: 'Titled paragraph',
  icon: 'editor-table',
  category: 'fdd-block-category',
  useOnce: true,
  parent: ['fdd-block/recipe--text'],
  attributes: paraWithTitleAttributes,
  styles: [
    { name: '_default', label: 'Default', isDefault: true },
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
          allowedBlocks={['core/paragraph']}
          template={[
            ['core/paragraph', { placeholder: '...' }],
          ]}
          templateLock={false}
        />
      </div>
    );
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

  deprecated: [
    {
      attributes: paraWithTitleAttributes,
      save({ className, attributes }) {
        let classes = ["fdd-titled-para", className].join(" ");
        return (
          <div className={classes}>
            <h3 className="fdd-titled-para__title">{attributes.title}</h3>
            <div><InnerBlocks.Content /></div>
          </div>
        );
      },
    }
  ]

});
