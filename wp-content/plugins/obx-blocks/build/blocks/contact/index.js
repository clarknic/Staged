/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/icons/build-module/library/globe.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/globe.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const globe = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M12 3.3c-4.8 0-8.8 3.9-8.8 8.8 0 4.8 3.9 8.8 8.8 8.8 4.8 0 8.8-3.9 8.8-8.8s-4-8.8-8.8-8.8zm6.5 5.5h-2.6C15.4 7.3 14.8 6 14 5c2 .6 3.6 2 4.5 3.8zm.7 3.2c0 .6-.1 1.2-.2 1.8h-2.9c.1-.6.1-1.2.1-1.8s-.1-1.2-.1-1.8H19c.2.6.2 1.2.2 1.8zM12 18.7c-1-.7-1.8-1.9-2.3-3.5h4.6c-.5 1.6-1.3 2.9-2.3 3.5zm-2.6-4.9c-.1-.6-.1-1.1-.1-1.8 0-.6.1-1.2.1-1.8h5.2c.1.6.1 1.1.1 1.8s-.1 1.2-.1 1.8H9.4zM4.8 12c0-.6.1-1.2.2-1.8h2.9c-.1.6-.1 1.2-.1 1.8 0 .6.1 1.2.1 1.8H5c-.2-.6-.2-1.2-.2-1.8zM12 5.3c1 .7 1.8 1.9 2.3 3.5H9.7c.5-1.6 1.3-2.9 2.3-3.5zM10 5c-.8 1-1.4 2.3-1.8 3.8H5.5C6.4 7 8 5.6 10 5zM5.5 15.3h2.6c.4 1.5 1 2.8 1.8 3.7-1.8-.6-3.5-2-4.4-3.7zM14 19c.8-1 1.4-2.2 1.8-3.7h2.6C17.6 17 16 18.4 14 19z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (globe);
//# sourceMappingURL=globe.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/mobile.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/mobile.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const mobile = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M15 4H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H9c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h6c.3 0 .5.2.5.5v12zm-4.5-.5h2V16h-2v1.5z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mobile);
//# sourceMappingURL=mobile.js.map

/***/ }),

/***/ "./src/blocks/contact/block.json":
/*!***************************************!*\
  !*** ./src/blocks/contact/block.json ***!
  \***************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"obx-blocks/contact","version":"1.0.0","title":"Contact","category":"obx-blocks","icon":"email","description":"Contact form block with background image and content","supports":{"html":false,"align":["wide","full"],"anchor":true},"attributes":{"anchor":{"type":"string"},"heading":{"type":"string","default":""},"styledTitle":{"type":"string","default":"Contact Us"},"title":{"type":"string","default":"Contact Us"},"text":{"type":"string","default":"Get in touch with us"},"backgroundImageUrl":{"type":"string","default":""},"backgroundImageId":{"type":"number","default":0},"backgroundImageAlt":{"type":"string","default":""},"contentWidth":{"type":"number","default":100},"formFields":{"type":"object","default":{"name":{"label":"Name","placeholder":"Enter your name"},"email":{"label":"Email","placeholder":"Enter your email"},"phone":{"label":"Phone","placeholder":"Enter your phone number"},"message":{"label":"Message","placeholder":"Enter your message"},"submit":{"text":"Submit","backgroundColor":"#007bff","textColor":"#ffffff"}}},"mailSubject":{"type":"string","default":"New Contact Form Submission"},"mailReceivers":{"type":"string","default":""}},"textdomain":"obx-blocks","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","viewScript":"file:./view.js"}');

/***/ }),

/***/ "./src/blocks/contact/edit.js":
/*!************************************!*\
  !*** ./src/blocks/contact/edit.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/mobile.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/globe.js");
/* harmony import */ var _icons_email_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./icons/email.svg */ "./src/blocks/contact/icons/email.svg");
/* harmony import */ var _icons_location_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./icons/location.svg */ "./src/blocks/contact/icons/location.svg");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/contact/editor.scss");

/**
 * WordPress dependencies
 */





// Import SVG icons for email and location since they're not available in @wordpress/icons



/**
 * Internal dependencies
 */


/**
 * Edit function for the Contact Us block
 */
function Edit({
  attributes,
  setAttributes
}) {
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
  const [activeItem, setActiveItem] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(null);
  const [formFields, setFormFields] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(attributes.formFields || {
    name: {
      label: 'Name',
      placeholder: 'Enter your name'
    },
    email: {
      label: 'Email',
      placeholder: 'Enter your email'
    },
    phone: {
      label: 'Phone',
      placeholder: 'Enter your phone number'
    },
    message: {
      label: 'Message',
      placeholder: 'Enter your message'
    },
    submit: {
      text: 'Submit',
      backgroundColor: '#007bff',
      textColor: '#ffffff'
    }
  });
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    setAttributes({
      formFields
    });
  }, [formFields]);
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
    className: `obx-contact align${align || 'none'} text-${textAlign || 'center'}`,
    style: {
      backgroundColor,
      color: textColor
    }
  });
  const getIconComponent = type => {
    switch (type) {
      case 'phone':
        return _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__["default"];
      // Using mobile icon instead of phone
      case 'email':
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_icons_email_svg__WEBPACK_IMPORTED_MODULE_5__.ReactComponent, null);
      // Using custom email icon
      case 'address':
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_icons_location_svg__WEBPACK_IMPORTED_MODULE_6__.ReactComponent, null);
      // Using custom location icon
      case 'website':
        return _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__["default"];
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
      link: ''
    });
    setAttributes({
      contactInfo: newItems
    });
  };
  const removeContactItem = index => {
    const newItems = [...contactInfo];
    newItems.splice(index, 1);
    setAttributes({
      contactInfo: newItems
    });
    setActiveItem(null);
  };
  const updateContactItem = (index, property, value) => {
    const newItems = [...contactInfo];
    newItems[index] = {
      ...newItems[index],
      [property]: value
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
    setAttributes({
      contactInfo: newItems
    });
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
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.BlockControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.BlockAlignmentToolbar, {
    value: align,
    onChange: newAlign => setAttributes({
      align: newAlign
    }),
    controls: ['wide', 'full']
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.AlignmentToolbar, {
    value: textAlign,
    onChange: newAlign => setAttributes({
      textAlign: newAlign
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Contact Settings', 'obx-blocks')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "components-base-control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "components-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Image', 'obx-blocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUploadCheck, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUpload, {
    onSelect: media => setAttributes({
      backgroundImageUrl: media.url,
      backgroundImageId: media.id,
      backgroundImageAlt: media.alt
    }),
    allowedTypes: ['image'],
    value: backgroundImageId,
    render: ({
      open
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, backgroundImageUrl && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "editor-post-featured-image__preview"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: backgroundImageUrl,
      alt: backgroundImageAlt,
      style: {
        maxHeight: '150px',
        width: 'auto'
      }
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      onClick: open,
      variant: "secondary",
      className: "editor-post-featured-image__toggle"
    }, backgroundImageUrl ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Replace Image', 'obx-blocks') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Set Background Image', 'obx-blocks')), backgroundImageUrl && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      onClick: () => setAttributes({
        backgroundImageUrl: '',
        backgroundImageId: 0,
        backgroundImageAlt: ''
      }),
      variant: "link",
      isDestructive: true
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove Image', 'obx-blocks')))
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Content Settings', 'obx-blocks')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Content Width (%)', 'obx-blocks'),
    value: contentWidth,
    onChange: value => setAttributes({
      contentWidth: value
    }),
    min: 50,
    max: 100,
    step: 5,
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Controls the width of the content container on desktop. Mobile will always be 100%.', 'obx-blocks')
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Email Settings', 'obx-blocks')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Email Recipients', 'obx-blocks'),
    value: mailReceivers,
    onChange: value => setAttributes({
      mailReceivers: value
    }),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enter email addresses separated by comma', 'obx-blocks'),
    placeholder: "admin@example.com, info@example.com"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Email Subject', 'obx-blocks'),
    value: mailSubject,
    onChange: value => setAttributes({
      mailSubject: value
    }),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('New Contact Form Submission', 'obx-blocks')
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Form Settings', 'obx-blocks')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "form-fields-settings"
  }, Object.entries(formFields).map(([field, settings]) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: field,
    className: "field-settings"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, field.charAt(0).toUpperCase() + field.slice(1)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Label', 'obx-blocks'),
    value: settings.label,
    onChange: value => updateField(field, 'label', value)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Placeholder', 'obx-blocks'),
    value: settings.placeholder,
    onChange: value => updateField(field, 'placeholder', value)
  }), field === 'submit' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "color-picker"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Color', 'obx-blocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ColorPicker, {
    color: settings.backgroundColor,
    onChange: value => updateField(field, 'backgroundColor', value)
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "color-picker"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Text Color', 'obx-blocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ColorPicker, {
    color: settings.textColor,
    onChange: value => updateField(field, 'textColor', value)
  })))))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "obx-contact__left"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
    tagName: "h2",
    className: "obx-contact__title",
    value: title,
    onChange: value => setAttributes({
      title: value
    }),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enter title...', 'obx-blocks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "obx-contact__heading-line"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
    tagName: "div",
    className: "obx-contact__text",
    value: text,
    onChange: value => setAttributes({
      text: value
    }),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enter text...', 'obx-blocks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "obx-contact__contact-info"
  }, email && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "obx-contact__contact-item"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fas fa-envelope"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, email)), phone && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "obx-contact__contact-item"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fas fa-phone"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, phone)), address && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "obx-contact__contact-item"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fas fa-map-marker-alt"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, address))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "obx-contact__form"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
    className: "contact-form"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "form-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, formFields.name.label), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    placeholder: formFields.name.placeholder,
    disabled: true
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "form-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, formFields.email.label), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "email",
    placeholder: formFields.email.placeholder,
    disabled: true
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "form-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, formFields.phone.label), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "tel",
    placeholder: formFields.phone.placeholder,
    disabled: true
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "form-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, formFields.message.label), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
    placeholder: formFields.message.placeholder,
    disabled: true
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "submit-button",
    disabled: true,
    style: {
      backgroundColor: formFields.submit.backgroundColor,
      color: formFields.submit.textColor
    }
  }, formFields.submit.text)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "obx-contact__right",
    style: {
      backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none',
      backgroundColor: backgroundColor || 'transparent',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '600px'
    }
  })));
}

/***/ }),

/***/ "./src/blocks/contact/editor.scss":
/*!****************************************!*\
  !*** ./src/blocks/contact/editor.scss ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/contact/icons/email.svg":
/*!********************************************!*\
  !*** ./src/blocks/contact/icons/email.svg ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgEmail),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgEmail = function SvgEmail(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "currentColor",
    d: "M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1m17 4.238-7.928 7.1L4 7.216V19h16zM4.511 5l7.55 6.662L19.502 5z"
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij4KICA8cGF0aCBkPSJNMyAzaDE4YTEgMSAwIDAgMSAxIDF2MTZhMSAxIDAgMCAxLTEgMUgzYTEgMSAwIDAgMS0xLTFWNGExIDEgMCAwIDEgMS0xem0xNyA0LjIzOGwtNy45MjggNy4xTDQgNy4yMTZWMTloMTZWNy4yMzh6TTQuNTExIDVsNy41NSA2LjY2MkwxOS41MDIgNUg0LjUxMXoiIGZpbGw9ImN1cnJlbnRDb2xvciIvPgo8L3N2Zz4g");

/***/ }),

/***/ "./src/blocks/contact/icons/location.svg":
/*!***********************************************!*\
  !*** ./src/blocks/contact/icons/location.svg ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgLocation),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgLocation = function SvgLocation(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "currentColor",
    d: "m12 20.9 4.95-4.95a7 7 0 1 0-9.9 0zm0 2.828-6.364-6.364a9 9 0 1 1 12.728 0zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 2a4 4 0 1 1 0-8 4 4 0 0 1 0 8"
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij4KICA8cGF0aCBkPSJNMTIgMjAuOWw0Ljk1LTQuOTVhNyA3IDAgMSAwLTkuOSAwTDEyIDIwLjl6bTAgMi44MjhsLTYuMzY0LTYuMzY0YTkgOSAwIDEgMSAxMi43MjggMEwxMiAyMy43Mjh6TTEyIDEzYTIgMiAwIDEgMCAwLTQgMiAyIDAgMCAwIDAgNHptMCAyYTQgNCAwIDEgMSAwLTggNCA0IDAgMCAxIDAgOHoiIGZpbGw9ImN1cnJlbnRDb2xvciIvPgo8L3N2Zz4g");

/***/ }),

/***/ "./src/blocks/contact/index.js":
/*!*************************************!*\
  !*** ./src/blocks/contact/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/blocks/contact/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/blocks/contact/block.json");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "./src/blocks/contact/style.scss");
/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */




/**
 * Register the block
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_2__.name, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  save: () => null // Server-side rendering with render.php
});

/***/ }),

/***/ "./src/blocks/contact/style.scss":
/*!***************************************!*\
  !*** ./src/blocks/contact/style.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["primitives"];

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"blocks/contact/index": 0,
/******/ 			"blocks/contact/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkobx_blocks"] = globalThis["webpackChunkobx_blocks"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["blocks/contact/style-index"], () => (__webpack_require__("./src/blocks/contact/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map