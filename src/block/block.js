const { RichText, MediaUpload, PlainText } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button } = wp.components;

import './style.scss';
import './editor.scss';

registerBlockType('fdd-block/stepbystep', {
	title: 'Step By Step',
	icon: 'heart',
	category: 'common',
	attributes: {
		body: {
			type: 'array',
			source: 'children',
			selector: '.stepbystep__body'
		},
		imageAlt: {
			attribute: 'alt',
			selector: '.stepbystep__image'
		},
		imageUrl: {
			attribute: 'src',
			selector: '.stepbystep__image'
		}
	},

	edit({ attributes, className, setAttributes }) {
		const getImageButton = (openEvent) => {
			if (attributes.imageUrl) {
				return (
					<img
						src={attributes.imageUrl}
						onClick={openEvent}
						className="image"
					/>
				);
			} else {
				return (
					<div className="button-container">
						<Button
							onClick={openEvent}
							className="button button-large"
						>Pick an image</Button>
					</div>
				);
			}
		};
		
		return (
			<div className="container">
				<MediaUpload
					onSelect={media => { setAttributes({ imageAlt: media.alt, imageUrl: media.url }); }}
					type="image"
					value={attributes.imageID}
					render={({ open }) => getImageButton(open)}
				/>
				<RichText
					onChange={content => setAttributes({ body: content })}
					value={attributes.body}
					multiline="p"
					placeholder="One step text"
				/>
			</div>			
		);
	},

	save({ attributes }) {
		const cardImage = (src, alt) => {
			if (!src) return null;

			return (
				<a href={src}>
				<img
					className="stepbystep__image"
					src={src}
					alt={alt}
					/>
				</a>
			);
		};

		return (
			<div className="card">
				{cardImage(attributes.imageUrl, attributes.imageAlt)}
				<div className="stepbystep__content">
					<div className="stepbystep__body">
						{attributes.body}
					</div>
				</div>
			</div>
		);
	}	
});
