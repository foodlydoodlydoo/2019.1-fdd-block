const { InnerBlocks, PlainText } = wp.editor;
const { registerBlockType } = wp.blocks;

import './style.scss';
import './editor.scss';

/********************************************************
 *   Whole Recipe page blocks and intermediate subblocks
 ********************************************************/
registerBlockType('fdd-block/recipe--page', {
	title: 'FDD: Recipe',
	icon: 'heart',
	category: 'common',
	useOnce: true,
	attributes: {
	},

	edit() {
		return (
			<div className="container">
				<InnerBlocks
					allowedBlocks={['fdd-block/recipe--text', 'fdd-block/recipe--media']}
					template={[
						['fdd-block/recipe--text'],
						['fdd-block/recipe--media'],
					]}
					templateLock="all"
				/>
			</div>
		);
	},

	save() {
		return (
			<div className="fdd-recipe--page">
				<InnerBlocks.Content />
				<div className="fdd-bottom-filling"></div>
			</div>
		);
	},
});


registerBlockType('fdd-block/recipe--text', {
	title: 'FDD: Recipe Text',
	icon: 'heart',
	category: 'common',
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
						['fdd-block/para-with-title', { title: 'Instructions' }],
						['fdd-block/para-with-title', { title: 'Notes' }],
					]}
					templateLock={false}
				/>
			</div>
		);
	},

	save() {
		return (
			<div className="fdd-recipe--text">
				<InnerBlocks.Content />
			</div>
		);
	}
});


registerBlockType('fdd-block/recipe--media', {
	title: 'FDD: Recipe Media',
	icon: 'heart',
	category: 'common',
	useOnce: true,
	parent: ['fdd-block/recipe--page'],
	attributes: {
	},

	edit() {
		return (
			<div className="container">
				<span className="oob">Add images and/or videos here:</span>
				<InnerBlocks
					allowedBlocks={['core/image', 'fdd-block/video-embed']}
					templateLock={false}
				/>
			</div>
		);
	},

	save() {
		return (
			<div className="fdd-recipe--media">
				<InnerBlocks.Content />
			</div>
		);
	}
});

/********************************************************
 *   Recipe/Text specific blocks
 ********************************************************/
registerBlockType('fdd-block/recipe--characteristics', {
	title: 'FDD: Recipe Characteristics',
	icon: 'heart',
	category: 'common',
	useOnce: true,
	parent: ['fdd-block/recipe--text'],
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

	edit({ attributes, setAttributes }) {
		return (
			<div className="container">
				<span className="PlainText-label">Level</span>
				<PlainText
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

	deprecated: [
		{
			save({ attributes }) {
				return (
					<div className="fdd-recipe--chars">
						<div className="fdd-recipe--chars--level">{attributes.level}</div>
						<div className="fdd-recipe--chars--prep_time">{attributes.prep_time}</div>
						<div className="fdd-recipe--chars--cook_time">{attributes.cook_time}</div>
						<div className="fdd-recipe--chars--portions">{attributes.portions}</div>
					</div>
				);
			}
		}
	]
});
