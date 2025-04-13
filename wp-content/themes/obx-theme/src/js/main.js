/**
 * Main frontend JavaScript file
 */

// Import styles

// Import components
import navigation from './components/navigation.js';
import PostLikes from './components/post-likes.js';
import SearchForm from './components/search-form.js';

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