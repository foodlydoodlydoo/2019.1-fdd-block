const { InnerBlocks } = wp.editor;
const { registerBlockType } = wp.blocks;

import './style.scss';
import './editor.scss';


registerBlockType('fdd-block/art', {
	title: 'Art',
	icon: 'admin-customizer',
	category: 'fdd-block-category',
	useOnce: true,
	attributes: {
	},

	edit() {
		return (
			<div className="container">
				<InnerBlocks
					allowedBlocks={['fdd-block/art--description-container', 'core/image']}
					template={[
						['core/image', { className: "featured" }],
						['fdd-block/art--description-container'],
						['core/image']
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
			save() {
				return (
					<div className="fdd-art--page">
						<InnerBlocks.Content />
					</div>
				);
			},
		},
	],
});


registerBlockType('fdd-block/art--description-container', {
	title: 'Art Text',
	icon: 'editor-alignleft',
	category: 'fdd-block-category',
	parent: ['fdd-block/art'],
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
		return <InnerBlocks.Content />;
	},

	deprecated: [
		{
			save() {
				return (
					<div className="fdd-art--description">
						<div className="fdd-art--description-before"></div>
						<InnerBlocks.Content />
						<div className="fdd-art--description-after"></div>
					</div>
				);
			},
		},
		{
			save() {
				return (
					<div className="fdd-art--description">
						<InnerBlocks.Content />
					</div>
				);
			},
		},
	]
});
