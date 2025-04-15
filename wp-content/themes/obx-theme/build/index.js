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

/***/ "./src/js/components/smooth-scroll.js":
/*!********************************************!*\
  !*** ./src/js/components/smooth-scroll.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Smooth Scroll Component
 * 
 * Adds smooth scrolling behavior to Table of Contents links and other
 * anchor links that point to IDs on the same page.
 * Also handles sticky TOC functionality.
 */

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initStickyToc();
});

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
  // Get all links that have a hash and are on the same page
  const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  links.forEach(link => {
    link.addEventListener('click', smoothScroll);
  });

  // Special handling for TOC links
  const tocLinks = document.querySelectorAll('.obx-toc-list a');
  tocLinks.forEach(link => {
    // Remove regular event listener first to avoid duplication
    link.removeEventListener('click', smoothScroll);
    // Add it again
    link.addEventListener('click', smoothScroll);
  });
}

/**
 * Initialize sticky TOC functionality
 */
function initStickyToc() {
  const toc = document.querySelector('.obx-toc');
  if (!toc) return;

  // Create a compact clone of the TOC for sticky positioning
  const stickyToc = toc.cloneNode(true);
  stickyToc.classList.add('obx-toc-sticky');

  // Make the title more compact for the sticky version
  const tocTitle = stickyToc.querySelector('.obx-toc-title');
  if (tocTitle) {
    tocTitle.innerText = 'In this article';
  }

  // Add a toggle button to expand/collapse on mobile
  const toggleButton = document.createElement('button');
  toggleButton.className = 'obx-toc-toggle';
  toggleButton.setAttribute('aria-label', 'Toggle table of contents');
  toggleButton.innerHTML = '<span class="obx-toc-toggle-icon"></span>';
  stickyToc.prepend(toggleButton);

  // Add the sticky TOC to the page
  document.body.appendChild(stickyToc);

  // Get the original TOC position for scroll calculations
  const tocRect = toc.getBoundingClientRect();
  let tocTopPosition = tocRect.top + window.pageYOffset;
  let tocBottomPosition = tocRect.bottom + window.pageYOffset;

  // Handle toggle click
  toggleButton.addEventListener('click', () => {
    stickyToc.classList.toggle('obx-toc-expanded');
  });

  // Update sticky TOC position on scroll
  window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;

    // Show sticky TOC when scrolled past the original TOC
    if (scrollPosition > tocTopPosition) {
      stickyToc.classList.add('obx-toc-visible');
    } else {
      stickyToc.classList.remove('obx-toc-visible');
    }
  });

  // Update position on window resize
  window.addEventListener('resize', () => {
    // Recalculate TOC position on resize
    const updatedTocRect = toc.getBoundingClientRect();
    tocTopPosition = updatedTocRect.top + window.pageYOffset;
    tocBottomPosition = updatedTocRect.bottom + window.pageYOffset;
  });
}

/**
 * Smooth scroll event handler
 * 
 * @param {Event} e Click event
 */
function smoothScroll(e) {
  e.preventDefault();
  const href = this.getAttribute('href');

  // Don't do anything if the href is just "#"
  if (href === '#') return;

  // Find the target element
  const targetElement = document.querySelector(href);
  if (!targetElement) return;

  // Calculate position for scrolling
  // Subtract a bit from the top to account for fixed headers
  const headerOffset = 80; // Adjust based on your header height
  const elementPosition = targetElement.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  // Perform the smooth scroll
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });

  // Update URL hash without jumping
  history.pushState(null, null, href);

  // Add a highlight effect to the target element
  targetElement.classList.add('highlight-target');
  setTimeout(() => {
    targetElement.classList.remove('highlight-target');
  }, 1500);

  // Close the expanded TOC on mobile after clicking a link
  const stickyToc = document.querySelector('.obx-toc-sticky');
  if (stickyToc) {
    stickyToc.classList.remove('obx-toc-expanded');
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initSmoothScroll);

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
/* harmony import */ var _js_components_smooth_scroll_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/components/smooth-scroll.js */ "./src/js/components/smooth-scroll.js");
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

  // Initialize smooth scroll
  (0,_js_components_smooth_scroll_js__WEBPACK_IMPORTED_MODULE_4__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map