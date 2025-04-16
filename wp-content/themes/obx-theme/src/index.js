/**
 * Main frontend JavaScript file
 */

// Import styles
import './scss/index.scss';

// Import components
import navigation from './js/components/navigation.js';
import PostLikes from './js/components/post-likes.js';
import SearchForm from './js/components/search-form.js';
import initSmoothScroll from './js/components/smooth-scroll.js';
import initLightbox from './js/components/lightbox.js';
import PostsPagination from './js/components/pagination.js';

// DOM ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize navigation
  navigation();
  
  // Initialize post likes
  PostLikes();
  
  // Initialize search form
  SearchForm();
  
  // Initialize smooth scroll
  initSmoothScroll();
  
  // Initialize lightbox
  initLightbox();
  
  // Initialize pagination (will self-initialize in the component)
  // PostsPagination is auto-initialized in the component
  
  // Initialize copy link functionality
  initCopyLink();
}); 

/**
 * Initialize copy link functionality for social sharing
 */
function initCopyLink() {
  const copyLinkButtons = document.querySelectorAll('.copy-link');
  
  copyLinkButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      const url = this.getAttribute('data-clipboard-text');
      
      // Create a temporary textarea element to copy the text
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.setAttribute('readonly', ''); // Make it readonly to be tamper-proof
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px'; // Move outside the screen to make it invisible
      document.body.appendChild(textarea);
      
      // Select the text and copy it
      textarea.select();
      document.execCommand('copy');
      
      // Remove the textarea
      document.body.removeChild(textarea);
      
      // Visual feedback - change icon color temporarily
      const originalColor = this.style.color;
      this.style.color = 'var(--color-accent)';
      
      // Reset after a short delay
      setTimeout(() => {
        this.style.color = originalColor;
      }, 1500);
    });
  });
} 