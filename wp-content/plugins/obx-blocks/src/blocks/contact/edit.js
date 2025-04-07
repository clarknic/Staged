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
    ColorPicker,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
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
        mailSubject,
        mailReceivers
    } = attributes;

    const [activeItem, setActiveItem] = useState(null);
    const [formFields, setFormFields] = useState(attributes.formFields || {
        name: { label: 'Name', placeholder: 'Enter your name' },
        email: { label: 'Email', placeholder: 'Enter your email' },
        phone: { label: 'Phone', placeholder: 'Enter your phone number' },
        message: { label: 'Message', placeholder: 'Enter your message' },
        submit: {
            text: 'Submit',
            backgroundColor: '#007bff',
            textColor: '#ffffff'
        }
    });

    useEffect(() => {
        setAttributes({ formFields });
    }, [formFields]);

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

    const updateField = (field, property, value) => {
        setFormFields(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                [property]: value
            }
        }));
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

                <PanelBody title={__('Email Settings', 'obx-blocks')}>
                    <TextControl
                        label={__('Email Recipients', 'obx-blocks')}
                        value={mailReceivers}
                        onChange={(value) => setAttributes({ mailReceivers: value })}
                        help={__('Enter email addresses separated by comma', 'obx-blocks')}
                        placeholder="admin@example.com, info@example.com"
                    />
                    <TextControl
                        label={__('Email Subject', 'obx-blocks')}
                        value={mailSubject}
                        onChange={(value) => setAttributes({ mailSubject: value })}
                        placeholder={__('New Contact Form Submission', 'obx-blocks')}
                    />
                </PanelBody>

                <PanelBody title={__('Form Settings', 'obx-blocks')}>
                    <div className="form-fields-settings">
                        {Object.entries(formFields).map(([field, settings]) => (
                            <div key={field} className="field-settings">
                                <h3>{field.charAt(0).toUpperCase() + field.slice(1)}</h3>
                                <TextControl
                                    label={__('Label', 'obx-blocks')}
                                    value={settings.label}
                                    onChange={(value) => updateField(field, 'label', value)}
                                />
                                <TextControl
                                    label={__('Placeholder', 'obx-blocks')}
                                    value={settings.placeholder}
                                    onChange={(value) => updateField(field, 'placeholder', value)}
                                />
                                {field === 'submit' && (
                                    <>
                                        <div className="color-picker">
                                            <label>{__('Background Color', 'obx-blocks')}</label>
                                            <ColorPicker
                                                color={settings.backgroundColor}
                                                onChange={(value) => updateField(field, 'backgroundColor', value)}
                                            />
                                        </div>
                                        <div className="color-picker">
                                            <label>{__('Text Color', 'obx-blocks')}</label>
                                            <ColorPicker
                                                color={settings.textColor}
                                                onChange={(value) => updateField(field, 'textColor', value)}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
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
                        <form className="contact-form">
                            <div className="form-group">
                                <label>{formFields.name.label}</label>
                                <input
                                    type="text"
                                    placeholder={formFields.name.placeholder}
                                    disabled
                                />
                            </div>

                            <div className="form-group">
                                <label>{formFields.email.label}</label>
                                <input
                                    type="email"
                                    placeholder={formFields.email.placeholder}
                                    disabled
                                />
                            </div>

                            <div className="form-group">
                                <label>{formFields.phone.label}</label>
                                <input
                                    type="tel"
                                    placeholder={formFields.phone.placeholder}
                                    disabled
                                />
                            </div>

                            <div className="form-group">
                                <label>{formFields.message.label}</label>
                                <textarea
                                    placeholder={formFields.message.placeholder}
                                    disabled
                                ></textarea>
                            </div>

                            <button
                                type="button"
                                className="submit-button"
                                disabled
                                style={{
                                    backgroundColor: formFields.submit.backgroundColor,
                                    color: formFields.submit.textColor
                                }}
                            >
                                {formFields.submit.text}
                            </button>
                        </form>
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