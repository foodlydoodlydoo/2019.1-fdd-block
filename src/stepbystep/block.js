const { InnerBlocks } = wp.editor;
const { registerBlockType } = wp.blocks;

import './style.scss';
import './editor.scss';

/********************************************************
 *   Whole page blocks
 ********************************************************/
registerBlockType('fdd-block/stepbystep--page-images', {
	title: 'FDD: Step By Step/Images',
	icon: 'heart',
	category: 'common',
	useOnce: true,
	attributes: {
	},

	edit() {
		return (
			<div className="container">
				<InnerBlocks
					allowedBlocks={['fdd-block/stepbystep--step-with-image', 'fdd-block/stepbystep--step-with-video']}
					template={[['fdd-block/stepbystep--step-with-image']]}
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

registerBlockType('fdd-block/stepbystep--page-video', {
	title: 'FDD: Step By Step/Video',
	icon: 'heart',
	category: 'common',
	useOnce: true,
	attributes: {
	},

	edit() {
		return (
			<div className="container">
				<InnerBlocks
					allowedBlocks={['fdd-block/stepbystep--step-with-video']}
					template={[['fdd-block/stepbystep--step-with-video']]}
					templateLock="all"
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


/********************************************************
 *   Single step blocks
 ********************************************************/
registerBlockType('fdd-block/stepbystep--step-with-image', {
	title: 'FDD: Step By Step/Step with Image',
	icon: 'heart',
	category: 'common',
	parent: [
		'fdd-block/stepbystep--page-images',
		'fdd-block/stepbystep--page-video'
	],
	attributes: {
	},

	edit() {
		const TEMPLATE_REVERSED = [
			['fdd-block/stepbystep--step-description-container', {}],
			['core/image', {
				linkDestination: 'media'
			}]
		];

		const TEMPLATE = [
			['core/image', {
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
	},

	deprecated: [
		{
			save() {
				return (
					<InnerBlocks.Content />
				);
			},
		}
	],
});

registerBlockType('fdd-block/stepbystep--step-with-video', {
	title: 'FDD: Step By Step/Step with Video',
	icon: 'heart',
	category: 'common',
	parent: [
		'fdd-block/stepbystep--page-images',
		'fdd-block/stepbystep--page-video'
	],
	attributes: {
	},

	edit() {
		const TEMPLATE = [
			['fdd-block/video-embed'],
			['fdd-block/stepbystep--step-description-container', {}]
		];

		return (
			<div className="container" >
				<InnerBlocks
					template={TEMPLATE}
					allowedBlocks={['fdd-block/stepbystep--step-description-container']}
					templateLock={false} />
			</div>
		);
	},

	save() {
		return (
			<div className="fdd-video-container">
				<InnerBlocks.Content />
			</div>
		);
	},

	deprecated: [
		{
			save() {
				return (
					<div className="fdd-step-by-step--step fdd-video-container">
						<InnerBlocks.Content />
					</div>
				);
			},

			save() {
				return (
					<InnerBlocks.Content />
				);
			},
		}
	]
});

/********************************************************
 *   Rich text blocks inside steps
 ********************************************************/
registerBlockType('fdd-block/stepbystep--step-description-container', {
	title: 'FDD: Step By Step/Step Text',
	icon: 'heart',
	category: 'common',
	parent: [
		'fdd-block/stepbystep--step-with-image',
		'fdd-block/stepbystep--step-with-video'
	],
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
