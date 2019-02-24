const { InnerBlocks } = wp.editor;
const { registerBlockType } = wp.blocks;

import './style.scss';
import './editor.scss';


registerBlockType('fdd-block/stepbystep', {
	title: 'FDD: Step By Step/Page',
	icon: 'heart',
	category: 'common',
	useOnce: true,
	attributes: {
	},

	edit() {
		return (
			<div className="container">
				<InnerBlocks
					allowedBlocks={['fdd-block/stepbystep--step']}
					template={[['fdd-block/stepbystep--step']]}
					templateLock={false}
				/>
			</div>
		);
	},

	save() {
		return (
			<div className="fdd-step-by-step--page">
				<InnerBlocks.Content />
			</div>
		);
	}
});


registerBlockType('fdd-block/stepbystep--step', {
	title: 'FDD: Step By Step/Step',
	icon: 'heart',
	category: 'common',
	parent: ['fdd-block/stepbystep'],
	attributes: {
	},

	edit(params) {
		const TEMPLATE = [
			['core/image', {
				caption: null,
				href: (args) => console.log(args),
				linkDestination: 'media'
			}],
			['fdd-block/stepbystep--step-description-container', {}]
		];

		return (
			<div className="container">
				<InnerBlocks template={TEMPLATE} templateLock="all" />
			</div>
		);
	},

	save() {
		return (
			<div className="fdd-step-by-step--step fdd-image-container">
				<InnerBlocks.Content />
			</div>
		);
	}
});


registerBlockType('fdd-block/stepbystep--step-description-container', {
	title: 'FDD: Step By Step/Step Text',
	icon: 'heart',
	category: 'common',
	parent: ['fdd-block/stepbystep--step'],
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
			<div className="fdd-step-by-step--step-description">
				<InnerBlocks.Content />
			</div>
		);
	}
});

wp.hooks.addFilter(
	'blocks.registerBlockType',
	'my-plugin/class-names/list-block',
	(properties, name) => {
		//console.log(name);
		//console.log(properties);
		if (name === 'core/image') {
		}
		return properties;
	}
);
