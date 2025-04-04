/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    InspectorControls,
    ColorPalette,
    BlockControls,
    BlockAlignmentToolbar,
    AlignmentToolbar,
    MediaUpload,
    MediaUploadCheck,
} from '@wordpress/block-editor';
import {
    PanelBody,
    Button,
    TextControl,
    SelectControl,
    RangeControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { plus, trash, mobile, globe } from '@wordpress/icons';
// Import SVG icons for email and location since they're not available in @wordpress/icons
import { ReactComponent as EmailIcon } from './icons/email.svg';
import { ReactComponent as LocationIcon } from './icons/location.svg';

/**
 * Internal dependencies
 */
import './editor.scss';

/**
 * Edit function for the Contact Us block
 */
export default function Edit({ attributes, setAttributes }) {
    const {
        tagline,
        heading,
        introText,
        contactInfo,
        formShortcode,
        backgroundColor,
        textColor,
        accentColor,
        align,
        textAlign,
        contentWidth,
        title,
        text,
        email,
        phone,
        address,
        shortcode,
        backgroundImageUrl,
        backgroundImageId,
        backgroundImageAlt,
    } = attributes;

    const [activeItem, setActiveItem] = useState(null);

    const blockProps = useBlockProps({
        className: `obx-contact align${align || 'none'} text-${textAlign || 'center'}`,
        style: {
            backgroundColor,
            color: textColor,
        },
    });

    const getIconComponent = (type) => {
        switch (type) {
            case 'phone':
                return mobile; // Using mobile icon instead of phone
            case 'email':
                return <EmailIcon />; // Using custom email icon
            case 'address':
                return <LocationIcon />; // Using custom location icon
            case 'website':
                return globe;
            default:
                return null;
        }
    };

    const addContactItem = () => {
        const newItems = [...contactInfo];
        newItems.push({
            id: `contact-${Date.now()}`,
            type: 'phone',
            label: '',
            value: '',
            link: '',
        });
        setAttributes({ contactInfo: newItems });
    };

    const removeContactItem = (index) => {
        const newItems = [...contactInfo];
        newItems.splice(index, 1);
        setAttributes({ contactInfo: newItems });
        setActiveItem(null);
    };

    const updateContactItem = (index, property, value) => {
        const newItems = [...contactInfo];
        newItems[index] = {
            ...newItems[index],
            [property]: value,
        };
        
        // Auto-generate link based on type and value
        if (property === 'type' || property === 'value') {
            const item = newItems[index];
            switch (item.type) {
                case 'phone':
                    newItems[index].link = `tel:${item.value.replace(/[^0-9+]/g, '')}`;
                    break;
                case 'email':
                    newItems[index].link = `mailto:${item.value}`;
                    break;
                case 'website':
                    newItems[index].link = item.value.startsWith('http') ? item.value : `https://${item.value}`;
                    break;
                default:
                    newItems[index].link = '';
                    break;
            }
        }
        
        setAttributes({ contactInfo: newItems });
    };

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
                <PanelBody title={__('Contact Settings', 'obx-blocks')}>
                    <TextControl
                        label={__('Form Shortcode', 'obx-blocks')}
                        value={formShortcode}
                        onChange={(value) => setAttributes({ formShortcode: value })}
                        help={__('Enter a shortcode for your contact form plugin (e.g., Contact Form 7, WPForms, etc.)', 'obx-blocks')}
                    />
                    
                    <div className="components-base-control">
                        <label className="components-base-control__label">
                            {__('Background Image', 'obx-blocks')}
                        </label>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => setAttributes({ 
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
                            onChange={(color) => setAttributes({ backgroundColor: color })}
                        />
                    </div>
                    
                    <div className="components-base-control">
                        <label className="components-base-control__label">
                            {__('Text Color', 'obx-blocks')}
                        </label>
                        <ColorPalette
                            value={textColor}
                            onChange={(color) => setAttributes({ textColor: color })}
                        />
                    </div>
                    
                    <div className="components-base-control">
                        <label className="components-base-control__label">
                            {__('Accent Color', 'obx-blocks')}
                        </label>
                        <ColorPalette
                            value={accentColor}
                            onChange={(color) => setAttributes({ accentColor: color })}
                        />
                    </div>
                </PanelBody>
                
                <PanelBody title={__('Content Settings', 'obx-blocks')}>
                    <RangeControl
                        label={__('Content Width (%)', 'obx-blocks')}
                        value={contentWidth}
                        onChange={(value) => setAttributes({ contentWidth: value })}
                        min={50}
                        max={100}
                        step={5}
                        help={__('Controls the width of the content container on desktop. Mobile will always be 100%.', 'obx-blocks')}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="obx-contact__left">
                    <RichText
                        tagName="h2"
                        className="obx-contact__title"
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                        placeholder={__('Enter title...', 'obx-blocks')}
                    />
                    <div className="obx-contact__heading-line"></div>
                    <RichText
                        tagName="div"
                        className="obx-contact__text"
                        value={text}
                        onChange={(value) => setAttributes({ text: value })}
                        placeholder={__('Enter text...', 'obx-blocks')}
                    />
                    <div className="obx-contact__contact-info">
                        {email && (
                            <div className="obx-contact__contact-item">
                                <i className="fas fa-envelope"></i>
                                <span>{email}</span>
                            </div>
                        )}
                        {phone && (
                            <div className="obx-contact__contact-item">
                                <i className="fas fa-phone"></i>
                                <span>{phone}</span>
                            </div>
                        )}
                        {address && (
                            <div className="obx-contact__contact-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <span>{address}</span>
                            </div>
                        )}
                    </div>
                    <div className="obx-contact__form">
                        {formShortcode ? (
                            <div className="obx-contact__form-preview">
                                <div dangerouslySetInnerHTML={{ __html: formShortcode }} />
                            </div>
                        ) : (
                            <div className="obx-contact__form-placeholder">
                                <p>{__('Add a form shortcode in the block settings.', 'obx-blocks')}</p>
                                <p>{__('Example: [contact-form-7 id="123" title="Contact form"]', 'obx-blocks')}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div 
                    className="obx-contact__right"
                    style={{
                        backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none',
                        backgroundColor: backgroundColor || 'transparent',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: '600px'
                    }}
                />
            </div>
        </>
    );
} 