/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    InspectorControls,
    MediaUpload,
    MediaUploadCheck,
    ColorPalette,
} from '@wordpress/block-editor';
import {
    PanelBody,
    RadioControl,
    RangeControl,
    Button,
    TextControl,
    ToggleControl,
    SelectControl,
} from '@wordpress/components';

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
        content,
        leftImage,
        rightImage,
        circleImage,
        useCircleImage,
        textColor,
        textAlign,
        contentWidth,
        ctaText,
        ctaLink,
        ctaTarget,
        ctaPosition,
    } = attributes;

    const blockProps = useBlockProps({
        className: 'obx-about',
    });

    // Handlers for attribute changes
    const onChangeTextAlign = (value) => {
        setAttributes({ textAlign: value });
    };

    const onChangeContentWidth = (value) => {
        setAttributes({ contentWidth: value });
    };

    const onSelectLeftImage = (media) => {
        // Log to help with debugging
        console.log('Setting left image:', media);
        setAttributes({
            leftImage: {
                id: media.id,
                url: media.url,
                alt: media.alt || '',
            },
        });
    };

    const onRemoveLeftImage = () => {
        setAttributes({
            leftImage: {},
        });
    };

    const onSelectRightImage = (media) => {
        // Log to help with debugging
        console.log('Setting right image:', media);
        setAttributes({
            rightImage: {
                id: media.id,
                url: media.url,
                alt: media.alt || '',
            },
        });
    };

    const onRemoveRightImage = () => {
        setAttributes({
            rightImage: {},
        });
    };

    const onSelectCircleImage = (media) => {
        console.log('Setting circle image:', media);
        setAttributes({
            circleImage: {
                id: media.id,
                url: media.url,
                alt: media.alt || '',
            },
        });
    };

    const onRemoveCircleImage = () => {
        setAttributes({
            circleImage: {},
        });
    };

    const toggleCircleImage = () => {
        setAttributes({ useCircleImage: !useCircleImage });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Layout Settings', 'obx-blocks')}>
                    <RadioControl
                        label={__('Text Alignment', 'obx-blocks')}
                        selected={textAlign}
                        options={[
                            { label: __('Left', 'obx-blocks'), value: 'left' },
                            { label: __('Center', 'obx-blocks'), value: 'center' },
                            { label: __('Right', 'obx-blocks'), value: 'right' },
                        ]}
                        onChange={onChangeTextAlign}
                    />
                    <RangeControl
                        label={__('Content Width (%)', 'obx-blocks')}
                        value={contentWidth}
                        onChange={onChangeContentWidth}
                        min={30}
                        max={100}
                    />
                    <div className="color-settings">
                        <p>{__('Text Color', 'obx-blocks')}</p>
                        <ColorPalette
                            value={textColor}
                            onChange={(color) => setAttributes({ textColor: color })}
                        />
                    </div>
                </PanelBody>
                
                <PanelBody title={__('Circle Image', 'obx-blocks')}>
                    <ToggleControl
                        label={__('Use Circle Image', 'obx-blocks')}
                        checked={useCircleImage}
                        onChange={toggleCircleImage}
                        help={__('Display an image in the circular border at the top of the content', 'obx-blocks')}
                    />
                    
                    {useCircleImage && (
                        <MediaUploadCheck>
                            <p className="components-base-control__label">{__('Circle Image', 'obx-blocks')}</p>
                            <MediaUpload
                                onSelect={onSelectCircleImage}
                                allowedTypes={['image']}
                                value={circleImage?.id}
                                render={({ open }) => (
                                    <div className="editor-post-featured-image">
                                        {circleImage?.url ? (
                                            <div>
                                                <img
                                                    src={circleImage.url}
                                                    alt={circleImage.alt}
                                                    style={{ 
                                                        width: '100%', 
                                                        marginBottom: '10px',
                                                        borderRadius: '50%',
                                                        objectFit: 'cover',
                                                        aspectRatio: '1/1'
                                                    }}
                                                />
                                                <Button
                                                    isSecondary
                                                    className="is-destructive"
                                                    onClick={onRemoveCircleImage}
                                                >
                                                    {__('Remove Image', 'obx-blocks')}
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button
                                                isPrimary
                                                onClick={open}
                                            >
                                                {__('Set Circle Image', 'obx-blocks')}
                                            </Button>
                                        )}
                                    </div>
                                )}
                            />
                        </MediaUploadCheck>
                    )}
                </PanelBody>
                
                <PanelBody title={__('Side Images', 'obx-blocks')}>
                    <p className="components-base-control__label">{__('Left Image', 'obx-blocks')}</p>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={onSelectLeftImage}
                            allowedTypes={['image']}
                            value={leftImage?.id}
                            render={({ open }) => (
                                <div className="editor-post-featured-image">
                                    {leftImage?.url ? (
                                        <div>
                                            <img
                                                src={leftImage.url}
                                                alt={leftImage.alt}
                                                style={{ width: '100%', marginBottom: '10px' }}
                                            />
                                            <Button
                                                isSecondary
                                                className="is-destructive"
                                                onClick={onRemoveLeftImage}
                                            >
                                                {__('Remove Image', 'obx-blocks')}
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            isPrimary
                                            onClick={open}
                                        >
                                            {__('Set Left Image', 'obx-blocks')}
                                        </Button>
                                    )}
                                </div>
                            )}
                        />
                    </MediaUploadCheck>
                    
                    <p className="components-base-control__label" style={{ marginTop: '20px' }}>{__('Right Image', 'obx-blocks')}</p>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={onSelectRightImage}
                            allowedTypes={['image']}
                            value={rightImage?.id}
                            render={({ open }) => (
                                <div className="editor-post-featured-image">
                                    {rightImage?.url ? (
                                        <div>
                                            <img
                                                src={rightImage.url}
                                                alt={rightImage.alt}
                                                style={{ width: '100%', marginBottom: '10px' }}
                                            />
                                            <Button
                                                isSecondary
                                                className="is-destructive"
                                                onClick={onRemoveRightImage}
                                            >
                                                {__('Remove Image', 'obx-blocks')}
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            isPrimary
                                            onClick={open}
                                        >
                                            {__('Set Right Image', 'obx-blocks')}
                                        </Button>
                                    )}
                                </div>
                            )}
                        />
                    </MediaUploadCheck>
                </PanelBody>
                <PanelBody title={__('CTA Button Settings', 'obx-blocks')}>
                    <TextControl
                        label={__('Button Text', 'obx-blocks')}
                        value={ctaText}
                        onChange={(value) => setAttributes({ ctaText: value })}
                    />
                    <TextControl
                        label={__('Button Link', 'obx-blocks')}
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
                <div className="obx-about__container">
                    {leftImage?.url ? (
                        <div className="obx-about__image obx-about__image--left">
                            <img 
                                src={leftImage.url} 
                                alt={leftImage.alt || ''} 
                                className="obx-about__image-img"
                            />
                        </div>
                    ) : (
                        <div className="obx-about__image obx-about__image--left obx-about__image--placeholder">
                            <div style={{padding: '30px', border: '1px dashed #ccc', textAlign: 'center', backgroundColor: '#f0f0f0'}}>
                                <p>Please add a left image</p>
                            </div>
                        </div>
                    )}
                    
                    <div 
                        className={`obx-about__content ${useCircleImage ? 'obx-about__content--with-circle' : ''}`}
                        style={{ 
                            maxWidth: `${contentWidth}%`, 
                            textAlign: textAlign
                        }}
                    >
                        {useCircleImage && (
                            <div className="obx-about__circle">
                                {circleImage?.url ? (
                                    <img 
                                        src={circleImage.url}
                                        alt={circleImage.alt || ''}
                                        className="obx-about__circle-img"
                                    />
                                ) : (
                                    <div className="obx-about__circle-placeholder"></div>
                                )}
                            </div>
                        )}
                        
                        <RichText
                            tagName="h2"
                            className="obx-about__heading"
                            value={heading}
                            onChange={(value) => setAttributes({ heading: value })}
                            placeholder={__('Enter heading...', 'obx-blocks')}
                            style={{ color: textColor }}
                        />
                        
                        <RichText
                            tagName="div"
                            className="obx-about__text"
                            value={content}
                            onChange={(value) => setAttributes({ content: value })}
                            placeholder={__('Enter content...', 'obx-blocks')}
                            style={{ color: textColor }}
                        />
                        
                        {ctaText && (
                            <div className={`obx-about__cta obx-about__cta--${ctaPosition}`}>
                                <a 
                                    href={ctaLink || '#'}
                                    className="obx-about__button"
                                    target={ctaTarget ? '_blank' : '_self'}
                                    rel={ctaTarget ? 'noopener noreferrer' : ''}
                                >
                                    {ctaText}
                                </a>
                            </div>
                        )}
                    </div>
                    
                    {rightImage?.url ? (
                        <div className="obx-about__image obx-about__image--right">
                            <img 
                                src={rightImage.url} 
                                alt={rightImage.alt || ''} 
                                className="obx-about__image-img"
                            />
                        </div>
                    ) : (
                        <div className="obx-about__image obx-about__image--right obx-about__image--placeholder">
                            <div style={{padding: '30px', border: '1px dashed #ccc', textAlign: 'center', backgroundColor: '#f0f0f0'}}>
                                <p>Please add a right image</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
} 