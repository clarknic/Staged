import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, ColorPicker, Button } from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const { title, backgroundColor, backgroundImage, imageAfter } = attributes;
    const blockProps = useBlockProps();

    const style = {
        backgroundColor: backgroundColor || '#F5EEE1',
        backgroundImage: backgroundImage?.url ? `url(${backgroundImage.url})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Block Settings', 'obx-blocks')}>
                    <TextControl
                        label={__('Title', 'obx-blocks')}
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                    />
                    <div className="components-base-control">
                        <label className="components-base-control__label">
                            {__('Background Color', 'obx-blocks')}
                        </label>
                        <ColorPicker
                            color={backgroundColor}
                            onChange={(value) => setAttributes({ backgroundColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="components-base-control">
                        <label className="components-base-control__label">
                            {__('Background Image', 'obx-blocks')}
                        </label>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => {
                                    setAttributes({
                                        backgroundImage: {
                                            id: media.id,
                                            url: media.url,
                                            alt: media.alt || ''
                                        }
                                    });
                                }}
                                allowedTypes={['image']}
                                value={backgroundImage?.id}
                                render={({ open }) => (
                                    <div>
                                        <Button
                                            onClick={open}
                                            variant="secondary"
                                            className="editor-post-featured-image__toggle"
                                        >
                                            {backgroundImage?.url
                                                ? __('Replace Image', 'obx-blocks')
                                                : __('Add Image', 'obx-blocks')
                                            }
                                        </Button>
                                        {backgroundImage?.url && (
                                            <Button
                                                onClick={() => setAttributes({ backgroundImage: null })}
                                                variant="link"
                                                isDestructive
                                            >
                                                {__('Remove Image', 'obx-blocks')}
                                            </Button>
                                        )}
                                    </div>
                                )}
                            />
                        </MediaUploadCheck>
                    </div>
                    <div className="components-base-control">
                        <label className="components-base-control__label">
                            {__('Bottom Image', 'obx-blocks')}
                        </label>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => {
                                    setAttributes({
                                        imageAfter: {
                                            id: media.id,
                                            url: media.url,
                                            alt: media.alt || ''
                                        }
                                    });
                                }}
                                allowedTypes={['image']}
                                value={imageAfter?.id}
                                render={({ open }) => (
                                    <div>
                                        <Button
                                            onClick={open}
                                            variant="secondary"
                                            className="editor-post-featured-image__toggle"
                                        >
                                            {imageAfter?.url
                                                ? __('Replace Bottom Image', 'obx-blocks')
                                                : __('Add Bottom Image', 'obx-blocks')
                                            }
                                        </Button>
                                        {imageAfter?.url && (
                                            <Button
                                                onClick={() => setAttributes({ imageAfter: null })}
                                                variant="link"
                                                isDestructive
                                            >
                                                {__('Remove Bottom Image', 'obx-blocks')}
                                            </Button>
                                        )}
                                    </div>
                                )}
                            />
                        </MediaUploadCheck>
                    </div>
                </PanelBody>
            </InspectorControls>
            <div className="whatwedo-wrapper">
                <div {...blockProps} style={style}>
                    <div className="whatwedo-content">
                        <RichText
                            tagName="h2"
                            className="whatwedo-title"
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                            placeholder={__('Enter title...', 'obx-blocks')}
                            allowedFormats={[]}
                        />
                        <div className="whatwedo-line"></div>
                    </div>
                </div>
                {imageAfter?.url && (
                    <div className="whatwedo-image-section">
                        <img src={imageAfter.url} alt={imageAfter.alt} />
                    </div>
                )}
            </div>
        </>
    );
} 