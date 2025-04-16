/**
 * Lightbox Component
 * 
 * Intercepts clicks on core image blocks that link to the image file
 * and displays them in a lightbox instead of navigating to the file.
 */

document.addEventListener('DOMContentLoaded', () => {
  initLightbox();
});

/**
 * Initialize lightbox functionality
 */
function initLightbox() {
  // Create lightbox container
  const lightboxContainer = document.createElement('div');
  lightboxContainer.className = 'obx-lightbox';
  lightboxContainer.setAttribute('aria-hidden', 'true');
  lightboxContainer.innerHTML = `
    <div class="obx-lightbox-overlay"></div>
    <button class="obx-lightbox-close" aria-label="Close lightbox">&times;</button>
    <div class="obx-lightbox-content">
      <img src="" alt="" class="obx-lightbox-image">
      <div class="obx-lightbox-caption"></div>
    </div>
  `;
  document.body.appendChild(lightboxContainer);
  
  // Get all core image blocks with links
  const imageLinks = document.querySelectorAll('.wp-block-image a[href$=".jpg"], .wp-block-image a[href$=".jpeg"], .wp-block-image a[href$=".png"], .wp-block-image a[href$=".gif"], .wp-block-image a[href$=".webp"]');
  
  // Lightbox elements
  const lightbox = document.querySelector('.obx-lightbox');
  const lightboxImage = lightbox.querySelector('.obx-lightbox-image');
  const lightboxCaption = lightbox.querySelector('.obx-lightbox-caption');
  const closeButton = lightbox.querySelector('.obx-lightbox-close');
  const overlay = lightbox.querySelector('.obx-lightbox-overlay');
  
  // Intercept clicks on image links
  imageLinks.forEach((link) => {
    // Prevent default link behavior
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(link);
    });
  });
  
  // Open lightbox with the clicked image
  function openLightbox(link) {
    // Get image source
    const imageSrc = link.getAttribute('href');
    const thumbnailImage = link.querySelector('img');
    const caption = thumbnailImage.getAttribute('alt') || '';
    
    // Set image and caption
    lightboxImage.src = imageSrc;
    lightboxCaption.textContent = caption;
    
    // Show lightbox
    lightbox.classList.add('obx-lightbox-active');
    lightbox.setAttribute('aria-hidden', 'false');
    
    // Disable body scroll
    document.body.style.overflow = 'hidden';
  }
  
  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('obx-lightbox-active');
    lightbox.setAttribute('aria-hidden', 'true');
    
    // Clear image source after transition
    setTimeout(() => {
      lightboxImage.src = '';
      lightboxCaption.textContent = '';
    }, 300);
    
    // Re-enable body scroll
    document.body.style.overflow = '';
  }
  
  // Event listeners
  closeButton.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', closeLightbox);
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('obx-lightbox-active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });
  
  // Prevent zooming on mobile double-tap
  lightboxImage.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
}

export default initLightbox; 