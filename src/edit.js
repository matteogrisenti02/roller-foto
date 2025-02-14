import { useBlockProps, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes }) {
    const { images } = attributes;

    return (
        <div {...useBlockProps()}>
            <MediaUploadCheck>
                <MediaUpload
                    onSelect={(media) => {
                        const imageUrls = media.map(img => img.url).join(',');
                        setAttributes({ images: imageUrls });
                    }}
                    allowedTypes={['image']}
                    multiple
                    gallery
                    render={({ open }) => (
                        <Button onClick={open} variant="primary">
                            {__('Seleziona immagini', 'roller-foto')}
                        </Button>
                    )}
                />
            </MediaUploadCheck>

            {images && images.length > 0 && (
                <div className="roller-preview">
                    {images.split(',').map((src, index) => (
                        <img key={index} src={src} alt="" style={{ width: '100px', margin: '5px' }} />
                    ))}
                </div>
            )}
        </div>
    );
}
