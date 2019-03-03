const { InnerBlocks } = wp.editor;
const { registerBlockType } = wp.blocks;

import './style.scss';
import './editor.scss';


registerBlockType('fdd-block/art', {
	title: 'FDD: Art/Page',
	icon: 'heart',
	category: 'common',
	useOnce: true,
	attributes: {
	},

	edit() {
		return (
			<div className="container">
				<InnerBlocks
					allowedBlocks={['fdd-block/art--description-container', 'core/image']}
					template={[['fdd-block/art--description-container'], ['core/image']]}
					templateLock={false}
				/>
			</div>
		);
	},

	save() {
		return (
			<div className="fdd-art--page fdd-image-container">
				<InnerBlocks.Content />
			</div>
		);
	}
});


registerBlockType('fdd-block/art--step-description-container', {
	title: 'FDD: Art/Description',
	icon: 'heart',
	category: 'common',
	parent: ['fdd-block/art--step-with-image'],
	attributes: {
	},

	edit() {
		return (
			<div>
				<InnerBlocks allowedBlocks={['core/paragraph']} templateLock={false} />
			</div>
		);
	},

	save() {
		return (
			<div className="fdd-art--description">
				<InnerBlocks.Content />
			</div>
		);
	}
});
