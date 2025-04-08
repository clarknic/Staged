/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    MediaUpload,
    MediaUploadCheck,
    InspectorControls,
} from '@wordpress/block-editor';
import {
    Button,
    Placeholder,
    Tooltip,
    Spinner,
    PanelBody,
    TextControl,
    ToggleControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { plus, upload, image, edit, link } from '@wordpress/icons';

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
        styledTitle,
        text,
        backgroundImage,
        buttonText,
        buttonLink,
        serviceItems = []
    } = attributes;

    const blockProps = useBlockProps({
        className: 'obx-what-we-do'
    });

    const updateServiceItem = (index, field, value) => {
        const updatedItems = [...serviceItems];
        updatedItems[index] = {
            ...updatedItems[index],
            [field]: value
        };
        setAttributes({ serviceItems: updatedItems });
    };

    const addServiceItem = () => {
        setAttributes({
            serviceItems: [...serviceItems, {
                title: '',
                text: '',
                image: null,
                isReversed: false
            }]
        });
    };

    const removeServiceItem = (index) => {
        const updatedItems = serviceItems.filter((_, i) => i !== index);
        setAttributes({ serviceItems: updatedItems });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Button Settings', 'obx-blocks')}>
                    <TextControl
                        label={__('Button Text', 'obx-blocks')}
                        value={buttonText}
                        onChange={(value) => setAttributes({ buttonText: value })}
                    />
                    <TextControl
                        label={__('Button Link', 'obx-blocks')}
                        value={buttonLink}
                        onChange={(value) => setAttributes({ buttonLink: value })}
                    />
                </PanelBody>

                {serviceItems.map((item, index) => (
                    <PanelBody 
                        key={index}
                        title={item.title ? 
                            __(`Service Item: ${item.title}`, 'obx-blocks') : 
                            __(`Service Item ${index + 1}`, 'obx-blocks')}
                        initialOpen={false}
                    >
                        <ToggleControl
                            label={__('Reverse Layout', 'obx-blocks')}
                            checked={item.isReversed}
                            onChange={(value) => updateServiceItem(index, 'isReversed', value)}
                            help={__('Toggle to reverse the image and content layout', 'obx-blocks')}
                        />
                    </PanelBody>
                ))}
            </InspectorControls>

            <div {...blockProps}>
                <div className="obx-what-we-do-main">
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(media) => setAttributes({ backgroundImage: media })}
                            allowedTypes={['image']}
                            value={backgroundImage?.id}
                            render={({ open }) => (
                                <div className="obx-what-we-do-main__background-upload">
                                    {backgroundImage ? (
                                        <div 
                                            className="obx-what-we-do-main__background"
                                            style={{ backgroundImage: `url(${backgroundImage.url})` }}
                                        >
                                            <Button
                                                className="obx-what-we-do-main__background-edit"
                                                onClick={open}
                                                icon={edit}
                                                label={__('Edit background image', 'obx-blocks')}
                                            />
                                        </div>
                                    ) : (
                                        <Placeholder
                                            icon={image}
                                            label={__('Background Image', 'obx-blocks')}
                                            instructions={__('Upload a background image for the services section', 'obx-blocks')}
                                        >
                                            <Button
                                                variant="primary"
                                                onClick={open}
                                                icon={upload}
                                            >
                                                {__('Upload Background Image', 'obx-blocks')}
                                            </Button>
                                        </Placeholder>
                                    )}
                                </div>
                            )}
                        />
                    </MediaUploadCheck>
                    
                    <div className="obx-what-we-do-main__content">
                        <RichText
                            tagName="h2"
                            className="obx-what-we-do-main__heading"
                            value={heading}
                            onChange={(value) => setAttributes({ heading: value })}
                            placeholder={__('Enter heading...', 'obx-blocks')}
                        />

                        <RichText
                            tagName="h3"
                            className="obx-what-we-do-main__styled-title"
                            value={styledTitle}
                            onChange={(value) => setAttributes({ styledTitle: value })}
                            placeholder={__('Enter styled title...', 'obx-blocks')}
                        />

                        <RichText
                            tagName="div"
                            className="obx-what-we-do-main__text"
                            value={text}
                            onChange={(value) => setAttributes({ text: value })}
                            placeholder={__('Enter text...', 'obx-blocks')}
                        />

                        {buttonText && buttonLink && (
                            <div className="obx-what-we-do-main__button">
                                <a href={buttonLink}>{buttonText}</a>
                            </div>
                        )}
                    </div>
                </div>

                <div className="obx-what-we-do-items">
                    {serviceItems.map((item, index) => (
                        <div 
                            key={index}
                            className={`obx-what-we-do-item${item.isReversed ? ' obx-what-we-do-item--reversed' : ''}${index % 2 !== 0 ? ' obx-what-we-do-item--odd' : ''}`}
                        >
                            <div className="obx-what-we-do-item__image">
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={(media) => updateServiceItem(index, 'image', media)}
                                        allowedTypes={['image']}
                                        value={item.image?.id}
                                        render={({ open }) => (
                                            <div className="obx-what-we-do-item__image-upload">
                                                {item.image ? (
                                                    <div className="obx-what-we-do-item__image-preview">
                                                        <img src={item.image.url} alt={item.title || ''} />
                                                        <Button
                                                            className="obx-what-we-do-item__image-edit"
                                                            onClick={open}
                                                            icon={edit}
                                                            label={__('Edit image', 'obx-blocks')}
                                                        />
                                                    </div>
                                                ) : (
                                                    <Placeholder
                                                        icon={image}
                                                        label={__('Service Item Image', 'obx-blocks')}
                                                        instructions={__('Upload an image for the service item', 'obx-blocks')}
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

                            <div className="obx-what-we-do-item__content">
                                <RichText
                                    tagName="h3"
                                    className="obx-what-we-do-item__title"
                                    value={item.title}
                                    onChange={(value) => updateServiceItem(index, 'title', value)}
                                    placeholder={__('Enter service item title...', 'obx-blocks')}
                                />
                                <div className="obx-what-we-do-item__line"></div>
                                <RichText
                                    tagName="div"
                                    className="obx-what-we-do-item__text"
                                    value={item.text}
                                    onChange={(value) => updateServiceItem(index, 'text', value)}
                                    placeholder={__('Enter service item text...', 'obx-blocks')}
                                />
                            </div>

                            {item.title && (
                                <RichText
                                    tagName="h4"
                                    className="obx-what-we-do-item__styled-bg"
                                    value={item.title}
                                    onChange={(value) => updateServiceItem(index, 'title', value)}
                                />
                            )}

                            <div className="obx-what-we-do-item__actions">
                                <Button
                                    isDestructive
                                    className="obx-what-we-do-item__remove"
                                    onClick={() => removeServiceItem(index)}
                                >
                                    {__('Remove Service Item', 'obx-blocks')}
                                </Button>
                            </div>
                        </div>
                    ))}

                    <Button
                        variant="primary"
                        onClick={addServiceItem}
                        icon={plus}
                    >
                        {__('Add Service Item', 'obx-blocks')}
                    </Button>
                </div>
            </div>
        </>
    );
} 