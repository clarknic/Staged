/**
 * Mobile Categories Select
 * 
 * Transforms the categories list into a select dropdown on mobile
 */

document.addEventListener('DOMContentLoaded', function() {
  const categoriesContainer = document.querySelector('.post-categories-search__categories');
  if (!categoriesContainer) return;
  
  const categoriesList = categoriesContainer.querySelector('.categories-list');
  if (!categoriesList) return;
  
  // Check if we're on mobile
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // Create select element
    const select = document.createElement('select');
    select.className = 'mobile-categories-select';
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select Category';
    select.appendChild(defaultOption);
    
    // Get current page URL to detect active category
    const currentUrl = window.location.href;
    let currentCategoryFound = false;
    
    // Add options from the categories list
    const categoryItems = categoriesList.querySelectorAll('li a');
    categoryItems.forEach(item => {
      const option = document.createElement('option');
      const itemUrl = item.getAttribute('href');
      option.value = itemUrl;
      option.textContent = item.textContent.trim();
      
      // Check if this is the current category
      if (currentUrl === itemUrl || 
          (currentUrl.endsWith('/') && currentUrl.slice(0, -1) === itemUrl) || 
          (!currentUrl.endsWith('/') && currentUrl + '/' === itemUrl)) {
        option.selected = true;
        currentCategoryFound = true;
        
        // Also highlight the original list item for desktop view
        item.parentElement.classList.add('current-category');
        item.style.fontWeight = 'bold';
        item.style.color = 'var(--color-accent, #c4a468)';
      }
      
      // Also check if we're on a child category
      if (!currentCategoryFound && currentUrl.includes(itemUrl) && itemUrl !== '/') {
        option.selected = true;
        currentCategoryFound = true;
      }
      
      select.appendChild(option);
    });
    
    // Handle selection change
    select.addEventListener('change', function() {
      if (this.value) {
        window.location.href = this.value;
      }
    });
    
    // Append the select element
    categoriesContainer.appendChild(select);
  }
  
  // Handle resize events
  window.addEventListener('resize', function() {
    const isMobileNow = window.innerWidth <= 768;
    const existingSelect = categoriesContainer.querySelector('.mobile-categories-select');
    
    if (isMobileNow && !existingSelect) {
      // Re-run the function if resized to mobile and select doesn't exist
      document.dispatchEvent(new Event('DOMContentLoaded'));
    } else if (!isMobileNow && existingSelect) {
      // Remove select if resized to desktop
      existingSelect.remove();
    }
  });
}); 