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
  document.addEventListener('click', (event) => {
    if (
      searchContainer.classList.contains('is-active') &&
      !searchContainer.contains(event.target) &&
      !searchToggle.contains(event.target)
    ) {
      searchContainer.classList.remove('is-active');
      searchToggle.classList.remove('is-active');
      searchToggle.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Close search when pressing Escape
  document.addEventListener('keydown', (event) => {
    if (
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