/**
 * Main frontend JavaScript file
 */

// Import styles
import './scss/index.scss';

// Import components
import navigation from './js/components/navigation.js';
import PostLikes from './js/components/post-likes.js';
import SearchForm from './js/components/search-form.js';

// DOM ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('OBX Theme initialized');
  
  // Initialize navigation
  navigation();
  
  // Initialize post likes
  PostLikes();
  
  // Initialize search form
  SearchForm();
}); 