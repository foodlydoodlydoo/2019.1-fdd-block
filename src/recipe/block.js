const { InnerBlocks, PlainText } = wp.editor;
const { registerBlockType } = wp.blocks;

import './style.scss';
import './editor.scss';

/********************************************************
 *   Whole Recipe page blocks and intermediate subblocks
 ********************************************************/
registerBlockType('fdd-block/recipe--page', {
	title: 'Recipe',
	icon: 'editor-ul',
	category: 'fdd-block-category',
	useOnce: true,
	attributes: {
	},

	edit() {
		setTimeout(() => {
			// https://github.com/WordPress/gutenberg/issues/6687#issuecomment-468294328
			$("#fdd-editor-focus-first").focus();
		}, 500);

		return (
			<div className="container">
				<InnerBlocks
					allowedBlocks={['fdd-block/recipe--text', 'fdd-block/recipe--media']}
					template={[
						['fdd-block/recipe--media'],
						['fdd-block/recipe--text'],
					]}
					templateLock="all"
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
					<div className="fdd-recipe--page">
						<InnerBlocks.Content />
						<div className="fdd-heel"></div>
					</div>
				);
			},
		},
	],
});


registerBlockType('fdd-block/recipe--text', {
	title: 'Recipe Text',
	icon: 'editor-alignleft',
	category: 'fdd-block-category',
	useOnce: true,
	parent: ['fdd-block/recipe--page'],
	attributes: {
	},

	edit() {
		return (
			<div className="container">
				<span className="oob">Recipe data and text:</span>
				<InnerBlocks
					allowedBlocks={['fdd-block/para-with-title']}
					template={[
						['fdd-block/recipe--characteristics'],
						['fdd-block/para-with-title', { title: 'Ingrediences' }],
						['fdd-block/para-with-title', { title: 'Preparation' }],
						['fdd-block/para-with-title', { title: 'Instructions' }],
						['fdd-block/para-with-title', { title: 'Notes' }],
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
					<div className="fdd-recipe--text">
						<InnerBlocks.Content />
					</div>
				);
			}
		},
	],
});


registerBlockType('fdd-block/recipe--media', {
	title: 'Recipe Media',
	icon: 'images-alt',
	category: 'fdd-block-category',
	useOnce: true,
	parent: ['fdd-block/recipe--page'],
	attributes: {
	},

	edit() {
		return (
			<div className="container">
				<span className="oob">Add images and/or videos here:</span>
				<InnerBlocks
					allowedBlocks={['core/image', 'core/embed']}
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
			attributes: {},
			save() {
				return (
					<div className="fdd-recipe--media">
						<InnerBlocks.Content />
					</div>
				);
			},
		},
	],
});

registerBlockType('fdd-block/recipe--characteristics', {
	title: 'Recipe Characteristics',
	icon: 'admin-settings',
	category: 'fdd-block-category',
	useOnce: true,
	parent: ['fdd-block/recipe--text'],
	attributes: {
		level: {
			type: 'string',
		},
		prep_time: {
			type: 'string',
		},
		cook_time: {
			type: 'string',
		},
		portions: {
			type: 'string',
		},
	},

	edit({ attributes, setAttributes }) {
		return (
			<div className="container">
				<span className="PlainText-label">Level</span>
				<PlainText
					id='fdd-editor-focus-first'
					onChange={content => setAttributes({ level: content })}
					value={attributes.level}
				/>
				<span className="PlainText-label">Prep Time</span>
				<PlainText
					onChange={content => setAttributes({ prep_time: content })}
					value={attributes.prep_time}
				/>
				<span className="PlainText-label">Cook Time</span>
				<PlainText
					onChange={content => setAttributes({ cook_time: content })}
					value={attributes.cook_time}
				/>
				<span className="PlainText-label">Portions</span>
				<PlainText
					onChange={content => setAttributes({ portions: content })}
					value={attributes.portions}
				/>
			</div>
		);
	},

	save() {
		return null;
	},

	deprecated: [
		{
			attributes: {
				level: {
					source: 'text',
					selector: '.fdd-recipe--chars--level',
				},
				prep_time: {
					source: 'text',
					selector: '.fdd-recipe--chars--prep_time',
				},
				cook_time: {
					source: 'text',
					selector: '.fdd-recipe--chars--cook_time',
				},
				portions: {
					source: 'text',
					selector: '.fdd-recipe--chars--portions',
				},
			},
			save({ attributes }) {
				let levelClass = ["fdd-recipe--chars--level", attributes.level.toLowerCase()].join(" ");
				return (
					<div className="fdd-recipe--chars">
						<div className={levelClass}>{attributes.level}</div>
						<div className="fdd-recipe--chars--prep_time">{attributes.prep_time}</div>
						<div className="fdd-recipe--chars--cook_time">{attributes.cook_time}</div>
						<div className="fdd-recipe--chars--portions">{attributes.portions}</div>
					</div>
				);
			},
		},
	]
});
