const { InnerBlocks } = wp.blockEditor;
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
					allowedBlocks={[
						'fdd-block/art--description-container',
						'core/image',
						'core/embed',
						'fdd-block/call-to-action-shop',
					]}
					template={[
						['core/image', { className: "featured" }],
						['fdd-block/art--description-container'],
						['core/image'],
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
				<InnerBlocks allowedBlocks={[
					'core/paragraph',
					'fdd-block/call-to-action-shop',
				]} templateLock={false} />
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
