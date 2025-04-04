/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    MediaUpload,
    InspectorControls,
    ColorPalette,
    BlockControls,
    AlignmentToolbar,
    BlockAlignmentToolbar,
} from '@wordpress/block-editor';
import {
    PanelBody,
    Button,
    TextControl,
    RangeControl,
} from '@wordpress/components';
import { MediaUploadCheck } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import './editor.scss';

/**
 * Edit function for the Hero block
 */
export default function Edit({ attributes, setAttributes }) {
    const {
        title,
        primaryButtonText,
        primaryButtonUrl,
        secondaryButtonText,
        secondaryButtonUrl,
        backgroundImageUrl,
        backgroundImageId,
        backgroundImageAlt,
        overlayColor,
        overlayOpacity,
        textColor,
        align,
        textAlign,
        content,
        contentWidth,
        backgroundImage,
        backgroundColor,
        backgroundOverlayOpacity,
    } = attributes;

    const blockProps = useBlockProps({
        className: `obx-hero align${align || 'none'} ${backgroundImageUrl ? 'has-background-image' : ''}`,
        style: {
            color: textColor || '#23282d',
        },
    });

    return (
        <>
            <BlockControls>
                <BlockAlignmentToolbar
                    value={align}
                    onChange={(newAlign) => setAttributes({ align: newAlign })}
                    controls={['wide', 'full']}
                />
                <AlignmentToolbar
                    value={textAlign}
                    onChange={(newAlign) => setAttributes({ textAlign: newAlign })}
                />
            </BlockControls>
            
            <InspectorControls>
                <PanelBody title={__('Background Settings', 'obx-blocks')}>
                    <div className="components-base-control">
                        <label className="components-base-control__label">
                            {__('Background Image', 'obx-blocks')}
                        </label>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => setAttributes({ 
                                    backgroundImage: media,
                                    backgroundImageUrl: media.url,
                                    backgroundImageId: media.id,
                                    backgroundImageAlt: media.alt
                                })}
                                allowedTypes={['image']}
                                value={backgroundImageId}
                                render={({ open }) => (
                                    <Button 
                                        onClick={open}
                                        className="editor-post-featured-image__toggle"
                                    >
                                        {backgroundImageUrl ? __('Change Background Image', 'obx-blocks') : __('Set Background Image', 'obx-blocks')}
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                    </div>
                    <div className="components-base-control">
                        <label className="components-base-control__label">
                            {__('Background Color', 'obx-blocks')}
                        </label>
                        <ColorPalette
                            value={backgroundColor}
                            onChange={(value) => setAttributes({ backgroundColor: value })}
                        />
                    </div>
                    <div className="components-base-control">
                        <label className="components-base-control__label">
                            {__('Background Overlay Opacity', 'obx-blocks')}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={backgroundOverlayOpacity}
                            onChange={(e) => setAttributes({ backgroundOverlayOpacity: parseInt(e.target.value) })}
                        />
                        <span>{backgroundOverlayOpacity}%</span>
                    </div>
                </PanelBody>
                <PanelBody title={__('Content Settings', 'obx-blocks')}>
                    <RangeControl
                        label={__('Content Width (%)', 'obx-blocks')}
                        value={contentWidth}
                        onChange={(value) => setAttributes({ contentWidth: value })}
                        min={30}
                        max={100}
                        step={5}
                        help={__('Width of content area on desktop. Mobile will always be 100%.', 'obx-blocks')}
                    />
                </PanelBody>
                <PanelBody title={__('Button Settings', 'obx-blocks')}>
                    <TextControl
                        label={__('Primary Button Text', 'obx-blocks')}
                        value={primaryButtonText}
                        onChange={(value) => setAttributes({ primaryButtonText: value })}
                    />
                    <TextControl
                        label={__('Primary Button URL', 'obx-blocks')}
                        value={primaryButtonUrl}
                        onChange={(value) => setAttributes({ primaryButtonUrl: value })}
                    />
                    <TextControl
                        label={__('Secondary Button Text', 'obx-blocks')}
                        value={secondaryButtonText}
                        onChange={(value) => setAttributes({ secondaryButtonText: value })}
                    />
                    <TextControl
                        label={__('Secondary Button URL', 'obx-blocks')}
                        value={secondaryButtonUrl}
                        onChange={(value) => setAttributes({ secondaryButtonUrl: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div 
                    className="obx-hero__background"
                    style={{
                        backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none',
                        backgroundColor: backgroundColor || 'transparent',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div 
                        className="obx-hero__overlay"
                        style={{
                            backgroundColor: overlayColor || 'rgba(0, 0, 0, 0.5)',
                            opacity: overlayOpacity / 100
                        }}
                    />
                </div>
                <div 
                    className={`obx-hero__content text-${textAlign || 'center'}`}
                    style={{ 
                        textAlign,
                        maxWidth: `${contentWidth}%`,
                        position: 'relative',
                        zIndex: 1
                    }}
                >
                    <RichText
                        tagName="h1"
                        className="obx-hero__title"
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                        placeholder={__('Add title...', 'obx-blocks')}
                        style={{ color: textColor }}
                    />
                    <RichText
                        tagName="p"
                        className="obx-hero__text"
                        value={content}
                        onChange={(value) => setAttributes({ content: value })}
                        placeholder={__('Add content...', 'obx-blocks')}
                        style={{ color: textColor }}
                    />
                    <div className="obx-hero__buttons">
                        {primaryButtonText && (
                            <div className="wp-block-button">
                                <RichText
                                    tagName="a"
                                    className="wp-block-button__link obx-button"
                                    value={primaryButtonText}
                                    onChange={(value) => setAttributes({ primaryButtonText: value })}
                                    placeholder={__('Add text...', 'obx-blocks')}
                                />
                            </div>
                        )}
                        {secondaryButtonText && (
                            <div className="wp-block-button">
                                <RichText
                                    tagName="a"
                                    className="wp-block-button__link obx-button obx-button-ghost"
                                    value={secondaryButtonText}
                                    onChange={(value) => setAttributes({ secondaryButtonText: value })}
                                    placeholder={__('Add text...', 'obx-blocks')}
                                    style={{ 
                                        backgroundColor: 'transparent',
                                        color: 'white',
                                        border: '1px solid white'
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}