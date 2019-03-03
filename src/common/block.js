const { InnerBlocks } = wp.editor;
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
  parent: ['fdd-block/stepbystep--step-with-video'],
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

