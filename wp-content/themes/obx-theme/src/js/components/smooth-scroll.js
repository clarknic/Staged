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
      
      // Check if we should hide it when we reach footer or content end
      // But only if we're very close to the bottom of the page
      const contentBottomPositionFooter = document.querySelector('.site-footer') 
        ? document.querySelector('.site-footer').offsetTop
        : document.body.scrollHeight;
      
      const footerHeight = document.querySelector('.site-footer').offsetHeight;

      const contentBottomPosition = contentBottomPositionFooter + footerHeight;
      // Only hide when we're almost at the footer, not when just viewing the last heading
      if (scrollPosition + window.innerHeight > contentBottomPosition - 20) {
        stickyToc.classList.remove('obx-toc-visible');
      }
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

export default initSmoothScroll; 