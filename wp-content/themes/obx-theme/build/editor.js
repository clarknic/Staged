/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/editor/table-of-contents.js":
/*!********************************************!*\
  !*** ./src/js/editor/table-of-contents.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

// WordPress dependencies
const {
  __
} = wp.i18n;
const {
  addFilter
} = wp.hooks;
const {
  createHigherOrderComponent
} = wp.compose;
const {
  Fragment
} = wp.element;
const {
  InspectorControls,
  PanelColorSettings
} = wp.blockEditor;
const {
  PanelBody,
  PanelRow,
  ToggleControl,
  TextControl
} = wp.components;
const {
  registerBlockStyle
} = wp.blocks;

// Initialize editor customizations
document.addEventListener('DOMContentLoaded', function () {
  console.log('OBX Theme: Editor scripts initialized');
});

// Register custom block styles
document.addEventListener('DOMContentLoaded', function () {
  if (wp && wp.blocks && wp.blocks.registerBlockStyle) {
    // Register custom paragraph style
    registerBlockStyle('core/paragraph', {
      name: 'highlight',
      label: 'Highlight'
    });

    // Register custom button style
    registerBlockStyle('core/button', {
      name: 'outline',
      label: 'Outline'
    });
  }
});

/**
 * Add custom attributes to core/heading block
 */
function addHeadingAttributes(settings, name) {
  // Only add attributes to core/heading block
  if (name !== 'core/heading') {
    return settings;
  }

  // Add custom attributes
  return {
    ...settings,
    attributes: {
      ...settings.attributes,
      showInToc: {
        type: 'boolean',
        default: true
      },
      titleInToc: {
        type: 'string',
        default: ''
      }
    }
  };
}

// Add the custom attributes to core/heading
addFilter('blocks.registerBlockType', 'obx-theme/heading-attributes', addHeadingAttributes);

/**
 * Add custom controls to the Inspector Controls panel
 */
const withTocControls = createHigherOrderComponent(BlockEdit => {
  return props => {
    // Only add controls to core/heading block
    if (props.name !== 'core/heading') {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(BlockEdit, {
        ...props
      });
    }
    const {
      attributes,
      setAttributes
    } = props;
    const {
      showInToc,
      titleInToc,
      anchor,
      content
    } = attributes;

    // Make sure heading has an anchor if it's shown in TOC
    const ensureAnchor = () => {
      if (content) {
        // Generate slug from content
        const slug = content.toString().toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

        // Set the anchor attribute if it doesn't exist or if we should update it
        if (!anchor || shouldUpdateAnchor && anchor !== slug) {
          setAttributes({
            anchor: slug
          });
        }
      }
    };

    // Track if we should auto-update the anchor
    // This is true when no anchor exists or when the anchor was auto-generated
    const [shouldUpdateAnchor, setShouldUpdateAnchor] = wp.element.useState(!anchor || anchor && content && anchor === content.toString().toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-'));

    // When content changes, update anchor if appropriate
    wp.element.useEffect(() => {
      if (showInToc && shouldUpdateAnchor) {
        ensureAnchor();
      }
    }, [content]);

    // When the component mounts or updates, ensure anchor if needed
    if (showInToc && content && !anchor) {
      ensureAnchor();
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(BlockEdit, {
        ...props
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(InspectorControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(PanelBody, {
          title: __('Table of Contents Settings', 'obx-theme'),
          initialOpen: false,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PanelRow, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleControl, {
              label: __('Show in Table of Contents', 'obx-theme'),
              checked: showInToc,
              onChange: value => {
                setAttributes({
                  showInToc: value
                });
                // If turning on TOC visibility, ensure anchor exists
                if (value) {
                  ensureAnchor();
                }
              },
              help: showInToc ? __('This heading will appear in the Table of Contents.', 'obx-theme') : __('This heading will not appear in the Table of Contents.', 'obx-theme')
            })
          }), showInToc && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PanelRow, {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TextControl, {
                label: __('Alternative TOC Title', 'obx-theme'),
                value: titleInToc,
                onChange: value => setAttributes({
                  titleInToc: value
                }),
                help: __('Custom text to display in the Table of Contents. Leave empty to use the heading text.', 'obx-theme')
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PanelRow, {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleControl, {
                label: __('Auto-update anchor', 'obx-theme'),
                checked: shouldUpdateAnchor,
                onChange: value => setShouldUpdateAnchor(value),
                help: shouldUpdateAnchor ? __('Anchor will update automatically when heading changes.', 'obx-theme') : __('Anchor will remain fixed when heading changes.', 'obx-theme')
              })
            })]
          })]
        })
      })]
    });
  };
}, 'withTocControls');

// Add the custom controls to the editor
addFilter('editor.BlockEdit', 'obx-theme/with-toc-controls', withTocControls);

/**
 * Save the custom attributes
 */
const saveHeadingAttributes = (extraProps, blockType, attributes) => {
  // Only add props to core/heading block
  if (blockType.name !== 'core/heading') {
    return extraProps;
  }
  const {
    showInToc,
    titleInToc
  } = attributes;

  // Add custom attributes as data attributes
  // Use string values for data attributes to ensure they're properly set in HTML
  extraProps['data-show-in-toc'] = showInToc === false ? 'false' : 'true';
  if (titleInToc) {
    extraProps['data-title-in-toc'] = titleInToc;
  }

  // Ensure anchors are reflected in the HTML id attribute
  if (attributes.anchor && !extraProps.id) {
    extraProps.id = attributes.anchor;
  }
  return extraProps;
};

// Add custom attributes to saved block
addFilter('blocks.getSaveContent.extraProps', 'obx-theme/save-heading-attributes', saveHeadingAttributes);

/***/ }),

/***/ "./src/scss/editor.scss":
/*!******************************!*\
  !*** ./src/scss/editor.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

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
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/editor.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/editor.scss */ "./src/scss/editor.scss");
/* harmony import */ var _js_editor_table_of_contents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/editor/table-of-contents */ "./src/js/editor/table-of-contents.js");
/**
 * Editor script
 */

// Import editor styles


// Import editor components

})();

/******/ })()
;
//# sourceMappingURL=editor.js.map