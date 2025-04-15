/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/components/navigation.js":
/*!*****************************************!*\
  !*** ./src/js/components/navigation.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ navigation)
/* harmony export */ });
/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
function navigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-navigation');
  const body = document.body;
  if (menuToggle && mainNav) {
    // Set initial state
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.addEventListener('click', function (e) {
      e.preventDefault();

      // Toggle navigation visibility
      mainNav.classList.toggle('is-open');

      // Toggle button state
      menuToggle.classList.toggle('is-active');

      // Toggle body class to prevent scrolling
      body.classList.toggle('menu-open');

      // Update aria-expanded attribute
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      console.log('Menu toggled:', mainNav.classList.contains('is-open'));
    });
  }
}

/***/ }),

/***/ "./src/js/components/post-likes.js":
/*!*****************************************!*\
  !*** ./src/js/components/post-likes.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Post likes functionality
 * Handles toggling like state for posts
 */

const PostLikes = () => {
  // Initialize like buttons
  function init() {
    const likeButtons = document.querySelectorAll('.like-button');
    if (!likeButtons.length) return;
    likeButtons.forEach(button => {
      button.addEventListener('click', handleLike);
    });
  }

  /**
   * Handle like button click
   */
  function handleLike() {
    // Get the heart icon (this element)
    const heart = this;
    const postId = heart.dataset.postId;
    const countElement = heart.closest('.likes-count').querySelector('.count');

    // Check if heart is currently liked
    const isLiked = heart.classList.contains('liked');

    // Action is opposite of current state
    const action = isLiked ? 'unlike' : 'like';

    // Send the request
    fetch(obx_site.ajax_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        action: 'post_like',
        post_id: postId,
        action_type: action,
        nonce: obx_site.nonce
      })
    }).then(response => response.json()).then(data => {
      if (data.success) {
        // Update count
        countElement.textContent = data.data.count;

        // Update heart state based on server response
        if (data.data.liked) {
          // Post is liked, fill heart with red
          heart.classList.add('liked');
          heart.setAttribute('fill', '#ff4757');
        } else {
          // Post is unliked, show outline only
          heart.classList.remove('liked');
          heart.setAttribute('fill', 'none');
          console.log('Heart unliked - setting fill to none');
        }
      }
    }).catch(error => {
      console.error('Error:', error);
    });
  }

  // Initialize
  init();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PostLikes);

/***/ }),

/***/ "./src/js/components/search-form.js":
/*!******************************************!*\
  !*** ./src/js/components/search-form.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Search form animation
 */

const SearchForm = () => {
  const searchToggle = document.querySelector('.search-toggle');
  const searchContainer = document.querySelector('.search-form-container');
  if (!searchToggle || !searchContainer) return;

  // Toggle search form visibility
  searchToggle.addEventListener('click', () => {
    const isExpanded = searchToggle.getAttribute('aria-expanded') === 'true';

    // Update ARIA state
    searchToggle.setAttribute('aria-expanded', !isExpanded);

    // Toggle active classes
    searchContainer.classList.toggle('is-active');
    searchToggle.classList.toggle('is-active');

    // Focus the search input when opened
    if (!isExpanded) {
      setTimeout(() => {
        const input = searchContainer.querySelector('.search-field');
        if (input) input.focus();
      }, 300); // Wait for animation to complete
    }
  });

  // Close search when clicking outside
  document.addEventListener('click', event => {
    if (searchContainer.classList.contains('is-active') && !searchContainer.contains(event.target) && !searchToggle.contains(event.target)) {
      searchContainer.classList.remove('is-active');
      searchToggle.classList.remove('is-active');
      searchToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close search when pressing Escape
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && searchContainer.classList.contains('is-active')) {
      searchContainer.classList.remove('is-active');
      searchToggle.classList.remove('is-active');
      searchToggle.setAttribute('aria-expanded', 'false');
      searchToggle.focus();
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SearchForm);

/***/ }),

/***/ "./src/scss/index.scss":
/*!*****************************!*\
  !*** ./src/scss/index.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/index.scss */ "./src/scss/index.scss");
/* harmony import */ var _js_components_navigation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/components/navigation.js */ "./src/js/components/navigation.js");
/* harmony import */ var _js_components_post_likes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/components/post-likes.js */ "./src/js/components/post-likes.js");
/* harmony import */ var _js_components_search_form_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/components/search-form.js */ "./src/js/components/search-form.js");
/**
 * Main frontend JavaScript file
 */

// Import styles


// Import components




// DOM ready
document.addEventListener('DOMContentLoaded', function () {
  console.log('OBX Theme initialized');

  // Initialize navigation
  (0,_js_components_navigation_js__WEBPACK_IMPORTED_MODULE_1__["default"])();

  // Initialize post likes
  (0,_js_components_post_likes_js__WEBPACK_IMPORTED_MODULE_2__["default"])();

  // Initialize search form
  (0,_js_components_search_form_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map