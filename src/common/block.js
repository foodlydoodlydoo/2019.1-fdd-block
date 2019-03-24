const { InnerBlocks, PlainText } = wp.editor;
const { registerBlockType } = wp.blocks;

import './style.scss';
import './editor.scss';

/********************************************************
 *   Embeding of a video
 ********************************************************/
registerBlockType('fdd-block/video-embed', {
  title: 'FDD: Video Block',
  icon: 'heart',
  category: 'common',
  useOnce: true,
  parent: [
    'fdd-block/stepbystep--step-with-video', // TODO remove
    'fdd-block/recipe--media',
  ],
  attributes: {
  },

  edit() {
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
  title: 'FDD: Titled paragraph',
  icon: 'heart',
  category: 'common',
  useOnce: true,
  parent: ['fdd-block/recipe--text'],
  attributes: paraWithTitleAttributes,

  edit({ attributes, setAttributes }) {
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
