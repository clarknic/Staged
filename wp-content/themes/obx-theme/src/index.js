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
}); 