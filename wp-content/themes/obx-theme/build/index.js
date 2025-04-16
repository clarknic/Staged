/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/components/lightbox.js":
/*!***************************************!*\
  !*** ./src/js/components/lightbox.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Lightbox Component
 * 
 * Intercepts clicks on core image blocks that link to the image file
 * and displays them in a lightbox instead of navigating to the file.
 */

document.addEventListener('DOMContentLoaded', () => {
  initLightbox();
});

/**
 * Initialize lightbox functionality
 */
function initLightbox() {
  // Create lightbox container
  const lightboxContainer = document.createElement('div');
  lightboxContainer.className = 'obx-lightbox';
  lightboxContainer.setAttribute('aria-hidden', 'true');
  lightboxContainer.innerHTML = `
    <div class="obx-lightbox-overlay"></div>
    <button class="obx-lightbox-close" aria-label="Close lightbox">&times;</button>
    <div class="obx-lightbox-content">
      <img src="" alt="" class="obx-lightbox-image">
      <div class="obx-lightbox-caption"></div>
    </div>
  `;
  document.body.appendChild(lightboxContainer);

  // Get all core image blocks with links
  const imageLinks = document.querySelectorAll('.wp-block-image a[href$=".jpg"], .wp-block-image a[href$=".jpeg"], .wp-block-image a[href$=".png"], .wp-block-image a[href$=".gif"], .wp-block-image a[href$=".webp"]');

  // Lightbox elements
  const lightbox = document.querySelector('.obx-lightbox');
  const lightboxImage = lightbox.querySelector('.obx-lightbox-image');
  const lightboxCaption = lightbox.querySelector('.obx-lightbox-caption');
  const closeButton = lightbox.querySelector('.obx-lightbox-close');
  const overlay = lightbox.querySelector('.obx-lightbox-overlay');

  // Intercept clicks on image links
  imageLinks.forEach(link => {
    // Prevent default link behavior
    link.addEventListener('click', e => {
      e.preventDefault();
      openLightbox(link);
    });
  });

  // Open lightbox with the clicked image
  function openLightbox(link) {
    // Get image source
    const imageSrc = link.getAttribute('href');
    const thumbnailImage = link.querySelector('img');
    const caption = thumbnailImage.getAttribute('alt') || '';

    // Set image and caption
    lightboxImage.src = imageSrc;
    lightboxCaption.textContent = caption;

    // Show lightbox
    lightbox.classList.add('obx-lightbox-active');
    lightbox.setAttribute('aria-hidden', 'false');

    // Disable body scroll
    document.body.style.overflow = 'hidden';
  }

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('obx-lightbox-active');
    lightbox.setAttribute('aria-hidden', 'true');

    // Clear image source after transition
    setTimeout(() => {
      lightboxImage.src = '';
      lightboxCaption.textContent = '';
    }, 300);

    // Re-enable body scroll
    document.body.style.overflow = '';
  }

  // Event listeners
  closeButton.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', closeLightbox);

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('obx-lightbox-active')) return;
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });

  // Prevent zooming on mobile double-tap
  lightboxImage.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initLightbox);

/***/ }),

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
    });
  }
}

/***/ }),

/***/ "./src/js/components/pagination.js":
/*!*****************************************!*\
  !*** ./src/js/components/pagination.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Pagination component - handles AJAX loading of posts
 */

class PostsPagination {
  constructor() {
    this.loadMoreBtn = document.getElementById('load-more');
    this.postsContainer = document.getElementById('ajax-posts');
    this.spinner = document.querySelector('.loading-spinner');
    if (!this.loadMoreBtn || !this.postsContainer) {
      return;
    }
    this.loading = false;
    this.currentPage = parseInt(this.loadMoreBtn.dataset.page);
    this.maxPages = parseInt(this.loadMoreBtn.dataset.maxPages);
    this.postsPerPage = parseInt(this.loadMoreBtn.dataset.postsPerPage);
    this.searchQuery = this.loadMoreBtn.dataset.search || '';
    this.categoryId = this.loadMoreBtn.dataset.cat || '';
    this.autoLoadThreshold = 200; // pixels from bottom to trigger auto load
    this.loadDelay = 1000; // 1-second delay for loading posts

    // Initialize event listeners
    this.initEvents();
  }
  initEvents() {
    // Click handler for Load More button
    this.loadMoreBtn.addEventListener('click', e => {
      e.preventDefault();
      this.loadMorePosts();
    });

    // Auto-load when scrolling near bottom
    window.addEventListener('scroll', () => {
      if (this.loading) return;
      if (window.scrollY + window.innerHeight > document.documentElement.scrollHeight - this.autoLoadThreshold) {
        this.loadMorePosts();
      }
    });
  }
  loadMorePosts() {
    if (this.loading || this.currentPage >= this.maxPages) {
      return;
    }
    this.loading = true;
    this.currentPage++;
    this.spinner.classList.remove('hidden');

    // Create FormData for the request
    const formData = new FormData();
    formData.append('action', 'load_more_posts');
    formData.append('page', this.currentPage);
    formData.append('posts_per_page', this.postsPerPage);

    // Add search query if available
    if (this.searchQuery) {
      formData.append('s', this.searchQuery);
    }

    // Add category if available
    if (this.categoryId) {
      formData.append('cat', this.categoryId);
    }

    // Use modern Fetch API instead of jQuery.ajax
    fetch(obx_site.ajax_url, {
      method: 'POST',
      body: formData,
      credentials: 'same-origin'
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    }).then(html => {
      // Add a slight delay before showing the posts
      setTimeout(() => {
        if (html) {
          // Append new posts to container
          this.postsContainer.insertAdjacentHTML('beforeend', html);
          this.loadMoreBtn.dataset.page = this.currentPage;

          // Remove button if we've reached the max pages
          if (this.currentPage >= this.maxPages) {
            this.loadMoreBtn.remove();
          }
        } else {
          this.loadMoreBtn.remove();
        }
        this.loading = false;
        this.spinner.classList.add('hidden');
      }, this.loadDelay);
    }).catch(error => {
      console.error('Error loading more posts:', error);
      this.loading = false;
      this.spinner.classList.add('hidden');
    });
  }
}

// Initialize the pagination when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PostsPagination();
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PostsPagination);

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
      // Focus immediately without delay
      const input = searchContainer.querySelector('.search-field');
      if (input) {
        // Use a minimal timeout to ensure DOM is updated before focusing
        setTimeout(() => {
          input.focus();
        }, 10);
      }
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
  initActiveTocItem();
  initScrollToTop();
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

  // Store original title text
  let originalTitleText = 'In this article';

  // Remove the original container if it exists
  const originalContainer = stickyToc.querySelector('.obx-toc-container');
  if (originalContainer) {
    // Save the contents to reinsert later
    const contents = originalContainer.innerHTML;
    originalContainer.remove();

    // Create a new container
    const container = document.createElement('div');
    container.className = 'obx-toc-sticky-container';
    container.innerHTML = contents;

    // Add a toggle button to expand/collapse on mobile
    const toggleButton = document.createElement('button');
    toggleButton.className = 'obx-toc-toggle';
    toggleButton.setAttribute('aria-label', 'Toggle table of contents');
    toggleButton.innerHTML = '<span class="obx-toc-toggle-icon"></span>';

    // Make the title more compact for the sticky version
    const tocTitle = container.querySelector('.obx-toc-title');
    if (tocTitle) {
      tocTitle.innerText = originalTitleText;
      originalTitleText = tocTitle.innerText;
    }

    // Add toggle button to the container (before any other content)
    container.prepend(toggleButton);

    // Add the container to the sticky TOC
    stickyToc.appendChild(container);
  } else {
    // Fallback if there's no container structure
    // Make the title more compact for the sticky version
    const tocTitle = stickyToc.querySelector('.obx-toc-title');
    if (tocTitle) {
      tocTitle.innerText = originalTitleText;
      originalTitleText = tocTitle.innerText;
    }

    // Add a toggle button to expand/collapse on mobile
    const toggleButton = document.createElement('button');
    toggleButton.className = 'obx-toc-toggle';
    toggleButton.setAttribute('aria-label', 'Toggle table of contents');
    toggleButton.innerHTML = '<span class="obx-toc-toggle-icon"></span>';
    stickyToc.prepend(toggleButton);
  }

  // Add progress indicator element
  const progressBar = document.createElement('div');
  progressBar.className = 'obx-toc-sticky-progress';
  stickyToc.appendChild(progressBar);

  // Add the sticky TOC to the page
  document.body.appendChild(stickyToc);

  // Get the original TOC position for scroll calculations
  const tocRect = toc.getBoundingClientRect();
  let tocTopPosition = tocRect.top + window.pageYOffset;
  let tocBottomPosition = tocRect.bottom + window.pageYOffset;

  // Function to check if screen is smaller than 1500px
  function isSmallScreen() {
    return window.innerWidth < 1500;
  }

  // Handle toggle click
  const toggleButton = stickyToc.querySelector('.obx-toc-toggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      stickyToc.classList.toggle('obx-toc-expanded');

      // When expanded, restore the original title
      const tocTitle = stickyToc.querySelector('.obx-toc-title');
      if (tocTitle) {
        if (stickyToc.classList.contains('obx-toc-expanded')) {
          tocTitle.innerText = originalTitleText;
        } else if (isSmallScreen()) {
          // When collapsed, display active item text if available and only on smaller screens
          const activeItem = stickyToc.querySelector('.obx-toc-list a.active');
          if (activeItem) {
            tocTitle.innerText = activeItem.innerText;
          } else {
            tocTitle.innerText = originalTitleText;
          }
        }
      }
    });
  }

  // Update scroll progress and sticky TOC position on scroll
  window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // Calculate scroll progress (0 to 100%)
    const scrollPercent = scrollPosition / (docHeight - windowHeight) * 100;

    // Update progress bar width based on scroll percentage only for smaller screens
    if (progressBar && isSmallScreen()) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    // Show sticky TOC only when scrolled past the BOTTOM of the original TOC
    if (scrollPosition > tocBottomPosition) {
      stickyToc.classList.add('obx-toc-visible');

      // Check if we should hide it when we reach footer or content end
      // But only if we're very close to the bottom of the page
      const contentBottomPositionFooter = document.querySelector('.site-footer') ? document.querySelector('.site-footer').offsetTop : document.body.scrollHeight;
      const footerHeight = document.querySelector('.site-footer') ? document.querySelector('.site-footer').offsetHeight : 0;
      const contentBottomPosition = contentBottomPositionFooter + footerHeight;
      // Only hide when we're almost at the footer, not when just viewing the last heading
      if (scrollPosition + windowHeight > contentBottomPosition - 20) {
        stickyToc.classList.remove('obx-toc-visible');
      }
    } else {
      stickyToc.classList.remove('obx-toc-visible');
    }
  });

  // Handle window resize - update progress bar visibility and title text
  window.addEventListener('resize', () => {
    // Recalculate TOC position on resize
    const updatedTocRect = toc.getBoundingClientRect();
    tocTopPosition = updatedTocRect.top + window.pageYOffset;
    tocBottomPosition = updatedTocRect.bottom + window.pageYOffset;

    // Update progress bar width immediately on resize if needed
    if (progressBar) {
      if (isSmallScreen()) {
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollPercent = scrollPosition / (docHeight - windowHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;
      } else {
        progressBar.style.width = '0';
      }
    }

    // Update title text based on screen size
    const tocTitle = stickyToc.querySelector('.obx-toc-title');
    if (tocTitle && !stickyToc.classList.contains('obx-toc-expanded')) {
      if (isSmallScreen()) {
        // On small screens, show active item text if available
        const activeItem = stickyToc.querySelector('.obx-toc-list a.active');
        if (activeItem) {
          tocTitle.innerText = activeItem.innerText;
        }
      } else {
        // On larger screens, always show the original title
        tocTitle.innerText = originalTitleText;
      }
    }
  });
}

/**
 * Initialize active TOC item tracking
 */
function initActiveTocItem() {
  const toc = document.querySelector('.obx-toc');
  const stickyToc = document.querySelector('.obx-toc-sticky');
  if (!toc) return;

  // Function to check if screen is smaller than 1500px
  function isSmallScreen() {
    return window.innerWidth < 1500;
  }

  // Store original title text for the sticky TOC
  let originalTitleText = 'In this article';
  const stickyTocTitle = stickyToc ? stickyToc.querySelector('.obx-toc-title') : null;
  if (stickyTocTitle) {
    originalTitleText = stickyTocTitle.innerText;
  }

  // Get all headings that match the TOC links
  const tocLinks = document.querySelectorAll('.obx-toc-list a');
  const headings = [];

  // Store whether user is currently scrolling via click
  // This helps prevent flickering during programmatic scrolling
  let isScrollingProgrammatically = false;
  let scrollTimeout;
  let activeHeadingHref = null;

  // Build an array of heading elements and their positions
  tocLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const heading = document.querySelector(href);
      if (heading) {
        headings.push({
          element: heading,
          link: link
        });
      }
    }
  });
  if (headings.length === 0) return;

  // Add active class initially to the first item
  if (headings.length > 0 && headings[0].link) {
    activeHeadingHref = headings[0].link.getAttribute('href');
    headings[0].link.classList.add('active');

    // Also add to sticky TOC if it exists
    if (stickyToc) {
      const stickyLink = stickyToc.querySelector(`a[href="${activeHeadingHref}"]`);
      if (stickyLink) {
        stickyLink.classList.add('active');

        // Update the sticky TOC title with the active item text if collapsed and only on small screens
        if (stickyTocTitle && !stickyToc.classList.contains('obx-toc-expanded') && isSmallScreen()) {
          stickyTocTitle.innerText = headings[0].link.innerText;
        }
      }
    }
  }

  // Debounce function to avoid excessive calculations
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Update active TOC item
  function updateActiveTocItem() {
    // Skip updating during programmatic scrolling
    if (isScrollingProgrammatically) return;

    // Get current scroll position
    const scrollPos = window.scrollY;
    const headerOffset = 100; // Offset for fixed header

    // Find the heading that is currently in view
    let activeHeading = null;

    // Loop through headings from bottom to top to find the first one above the viewport
    for (let i = headings.length - 1; i >= 0; i--) {
      const heading = headings[i].element;
      const headingTop = heading.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      if (scrollPos >= headingTop) {
        activeHeading = headings[i];
        break;
      }
    }

    // If we're at the very top of the page before any headings
    if (!activeHeading && headings.length > 0 && scrollPos < headings[0].element.getBoundingClientRect().top + window.pageYOffset) {
      activeHeading = headings[0];
    }

    // If we're at the very bottom of the page
    if (!activeHeading && headings.length > 0 && scrollPos + window.innerHeight >= document.body.scrollHeight - 50) {
      activeHeading = headings[headings.length - 1];
    }

    // Update active class only if the active heading has changed
    if (activeHeading) {
      const newActiveHref = activeHeading.link.getAttribute('href');

      // Only update if the active heading has changed
      if (newActiveHref !== activeHeadingHref) {
        activeHeadingHref = newActiveHref;

        // Remove active class from all links
        tocLinks.forEach(link => {
          link.classList.remove('active');
        });

        // Add active class to current link
        activeHeading.link.classList.add('active');

        // Also update the sticky TOC if it exists
        if (stickyToc) {
          const stickyLinks = stickyToc.querySelectorAll('.obx-toc-list a');
          stickyLinks.forEach(link => {
            link.classList.remove('active');
          });
          const activeStickyLink = stickyToc.querySelector(`a[href="${activeHeadingHref}"]`);
          if (activeStickyLink) {
            activeStickyLink.classList.add('active');

            // Update the sticky TOC title with the active item text if collapsed and only on small screens
            if (stickyTocTitle && !stickyToc.classList.contains('obx-toc-expanded') && isSmallScreen()) {
              stickyTocTitle.innerText = activeHeading.link.innerText;
            }
          }
        }
      }
    }
  }

  // Create debounced version of the update function
  const debouncedUpdateActiveTocItem = debounce(updateActiveTocItem, 20);

  // Track active heading on scroll
  window.addEventListener('scroll', debouncedUpdateActiveTocItem);
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

  // Function to check if screen is smaller than 1500px
  function isSmallScreen() {
    return window.innerWidth < 1500;
  }

  // Get all TOC links
  const tocLinks = document.querySelectorAll('.obx-toc-list a');

  // Update active TOC item immediately on click to prevent flickering
  tocLinks.forEach(link => {
    link.classList.remove('active');
  });
  this.classList.add('active');

  // Update active item in sticky TOC
  const stickyToc = document.querySelector('.obx-toc-sticky');
  if (stickyToc) {
    const stickyLinks = stickyToc.querySelectorAll('.obx-toc-list a');
    stickyLinks.forEach(link => {
      link.classList.remove('active');
    });
    const stickyLink = stickyToc.querySelector(`a[href="${href}"]`);
    if (stickyLink) {
      stickyLink.classList.add('active');
    }

    // Update the title with active item text if collapsed and only on small screens
    const stickyTocTitle = stickyToc.querySelector('.obx-toc-title');
    if (stickyTocTitle && !stickyToc.classList.contains('obx-toc-expanded') && isSmallScreen()) {
      stickyTocTitle.innerText = this.innerText;
    }

    // Close the expanded TOC on mobile after clicking a link
    stickyToc.classList.remove('obx-toc-expanded');
  }

  // Set flag to prevent scroll handler from changing active item during animation
  window.isScrollingProgrammatically = true;

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

  // Reset scroll flag after animation completes
  setTimeout(() => {
    window.isScrollingProgrammatically = false;
  }, 1000); // Slightly longer than typical scroll animation
}

/**
 * Initialize scroll to top functionality
 */
function initScrollToTop() {
  const scrollToTopButton = document.querySelector('.site-footer__scroll-top');
  if (scrollToTopButton) {
    scrollToTopButton.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
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
/* harmony import */ var _js_components_lightbox_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/components/lightbox.js */ "./src/js/components/lightbox.js");
/* harmony import */ var _js_components_pagination_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./js/components/pagination.js */ "./src/js/components/pagination.js");
/**
 * Main frontend JavaScript file
 */

// Import styles


// Import components







// DOM ready
document.addEventListener('DOMContentLoaded', function () {
  // Initialize navigation
  (0,_js_components_navigation_js__WEBPACK_IMPORTED_MODULE_1__["default"])();

  // Initialize post likes
  (0,_js_components_post_likes_js__WEBPACK_IMPORTED_MODULE_2__["default"])();

  // Initialize search form
  (0,_js_components_search_form_js__WEBPACK_IMPORTED_MODULE_3__["default"])();

  // Initialize smooth scroll
  (0,_js_components_smooth_scroll_js__WEBPACK_IMPORTED_MODULE_4__["default"])();

  // Initialize lightbox
  (0,_js_components_lightbox_js__WEBPACK_IMPORTED_MODULE_5__["default"])();

  // Initialize pagination (will self-initialize in the component)
  // PostsPagination is auto-initialized in the component
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map