/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    InnerBlocks,
    MediaUpload,
    MediaUploadCheck,
    InspectorControls,
} from '@wordpress/block-editor';
import {
    PanelBody,
    Button,
    TextControl,
    ToggleControl,
    Placeholder,
    SelectControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { upload, image, edit } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object} props               Block props.
 * @param {Object} props.attributes    Block attributes.
 * @param {Function} props.setAttributes Function to update block attributes.
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
    const {
        heading,
        subheading,
        image,
        isReversed,
        ctaTitle,
        ctaLink,
        ctaTarget,
        ctaPosition,
        allowedBlocks,
    } = attributes;

    const blockProps = useBlockProps({
        className: `obx-service${isReversed ? ' obx-service--reversed' : ''}`
    });

    // Define the template for inner blocks
    const TEMPLATE = [
        ['core/heading', { level: 3, placeholder: 'Enter content heading...' }],
        ['core/paragraph', { placeholder: 'Enter content...' }],
    ];

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Layout Settings', 'obx-blocks')}>
                    <ToggleControl
                        label={__('Reverse Layout', 'obx-blocks')}
                        checked={isReversed}
                        onChange={(value) => setAttributes({ isReversed: value })}
                        help={__('Toggle to reverse the image and content layout', 'obx-blocks')}
                    />
                </PanelBody>
                
                <PanelBody title={__('CTA Settings', 'obx-blocks')}>
                    <TextControl
                        label={__('CTA Button Text', 'obx-blocks')}
                        value={ctaTitle}
                        onChange={(value) => setAttributes({ ctaTitle: value })}
                    />
                    <TextControl
                        label={__('CTA Link URL', 'obx-blocks')}
                        value={ctaLink}
                        onChange={(value) => setAttributes({ ctaLink: value })}
                    />
                    <ToggleControl
                        label={__('Open in new tab', 'obx-blocks')}
                        checked={ctaTarget}
                        onChange={(value) => setAttributes({ ctaTarget: value })}
                    />
                    <SelectControl
                        label={__('Button Alignment', 'obx-blocks')}
                        value={ctaPosition}
                        options={[
                            { label: __('Left', 'obx-blocks'), value: 'left' },
                            { label: __('Center', 'obx-blocks'), value: 'center' },
                            { label: __('Right', 'obx-blocks'), value: 'right' },
                        ]}
                        onChange={(value) => setAttributes({ ctaPosition: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="obx-service__content-container">
                    <div className="obx-service__body">
                        <div className="obx-service__text-column">
                            <div className="obx-service__header">
                                <RichText
                                    tagName="h2"
                                    className="obx-service__heading"
                                    value={heading}
                                    onChange={(value) => setAttributes({ heading: value })}
                                    placeholder={__('Enter heading...', 'obx-blocks')}
                                />
                                
                                <RichText
                                    tagName="h3"
                                    className="obx-service__subheading"
                                    value={subheading}
                                    onChange={(value) => setAttributes({ subheading: value })}
                                    placeholder={__('Enter subheading...', 'obx-blocks')}
                                />
                            </div>
                            
                            <div className="obx-service__content">
                                <InnerBlocks
                                    allowedBlocks={allowedBlocks}
                                    template={TEMPLATE}
                                    templateLock={false}
                                />
                            </div>
                            
                            <div className={`obx-service__cta obx-service__cta--${ctaPosition}`}>
                                <a 
                                    href={ctaLink}
                                    target={ctaTarget ? '_blank' : '_self'}
                                    rel={ctaTarget ? 'noopener noreferrer' : ''}
                                    className="obx-service__cta-button"
                                >
                                    {ctaTitle || __('Book Call', 'obx-blocks')}
                                </a>
                            </div>
                        </div>
                        
                        <div className="obx-service__image-column">
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) => setAttributes({ image: media })}
                                    allowedTypes={['image']}
                                    value={image?.id}
                                    render={({ open }) => (
                                        <div className="obx-service__image-wrapper">
                                            {image ? (
                                                <div className="obx-service__image">
                                                    <img 
                                                        src={image.url} 
                                                        alt={image.alt || heading} 
                                                    />
                                                    <Button
                                                        className="obx-service__image-edit"
                                                        onClick={open}
                                                        icon={edit}
                                                        label={__('Edit image', 'obx-blocks')}
                                                    />
                                                </div>
                                            ) : (
                                                <Placeholder
                                                    icon={image}
                                                    label={__('Service Image', 'obx-blocks')}
                                                    instructions={__('Upload an image for this service', 'obx-blocks')}
                                                >
                                                    <Button
                                                        variant="primary"
                                                        onClick={open}
                                                        icon={upload}
                                                    >
                                                        {__('Upload Image', 'obx-blocks')}
                                                    </Button>
                                                </Placeholder>
                                            )}
                                        </div>
                                    )}
                                />
                            </MediaUploadCheck>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 