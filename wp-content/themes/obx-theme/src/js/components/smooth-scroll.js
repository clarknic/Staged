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
    const scrollPercent = (scrollPosition / (docHeight - windowHeight)) * 100;
    
    // Update progress bar width based on scroll percentage only for smaller screens
    if (progressBar && isSmallScreen()) {
      progressBar.style.width = `${scrollPercent}%`;
    }
    
    // Show sticky TOC only when scrolled past the BOTTOM of the original TOC
    if (scrollPosition > tocBottomPosition) {
      stickyToc.classList.add('obx-toc-visible');
      
      // Check if we should hide it when we reach footer or content end
      // But only if we're very close to the bottom of the page
      const contentBottomPositionFooter = document.querySelector('.site-footer') 
        ? document.querySelector('.site-footer').offsetTop
        : document.body.scrollHeight;
      
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
        const scrollPercent = (scrollPosition / (docHeight - windowHeight)) * 100;
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
    scrollToTopButton.addEventListener('click', (e) => {
      e.preventDefault();
      
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

export default initSmoothScroll; 