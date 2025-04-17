/**
 * Search form animation
 */

const SearchForm = () => {
  const searchToggle = document.querySelector('.search-toggle');
  const searchContainer = document.querySelector('.search-form-container');
  
  if (!searchToggle || !searchContainer) return;
  
  // Check if we're on mobile
  const checkMobile = () => window.innerWidth <= 768;
  
  // For desktop: Toggle search form visibility
  searchToggle.addEventListener('click', () => {
    if (checkMobile()) return; // Skip on mobile as the form is always visible
    
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
  
  // Initialize mobile state
  if (checkMobile()) {
    searchContainer.classList.add('is-active');
  }
  
  // Handle resize events
  window.addEventListener('resize', () => {
    if (checkMobile()) {
      searchContainer.classList.add('is-active');
    } else if (!searchToggle.classList.contains('is-active')) {
      searchContainer.classList.remove('is-active');
    }
  });
  
  // Close search when clicking outside (desktop only)
  document.addEventListener('click', (event) => {
    if (
      !checkMobile() &&
      searchContainer.classList.contains('is-active') &&
      !searchContainer.contains(event.target) &&
      !searchToggle.contains(event.target)
    ) {
      searchContainer.classList.remove('is-active');
      searchToggle.classList.remove('is-active');
      searchToggle.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Close search when pressing Escape (desktop only)
  document.addEventListener('keydown', (event) => {
    if (
      !checkMobile() &&
      event.key === 'Escape' &&
      searchContainer.classList.contains('is-active')
    ) {
      searchContainer.classList.remove('is-active');
      searchToggle.classList.remove('is-active');
      searchToggle.setAttribute('aria-expanded', 'false');
      searchToggle.focus();
    }
  });
};

export default SearchForm; 