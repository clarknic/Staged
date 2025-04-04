/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
export default function navigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-navigation');
  const body = document.body;

  if (menuToggle && mainNav) {
    // Set initial state
    menuToggle.setAttribute('aria-expanded', 'false');
    
    menuToggle.addEventListener('click', function(e) {
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
      
      console.log('Menu toggled:', mainNav.classList.contains('is-open'));
    });
  }
} 