/******/ (() => { // webpackBootstrap
/*!*********************************!*\
  !*** ./src/blocks/hero/view.js ***!
  \*********************************/
/**
 * Hero block frontend JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  const heroBlocks = document.querySelectorAll('.obx-hero');
  heroBlocks.forEach(hero => {
    const background = hero.querySelector('.obx-hero__background');
    if (!background) return;
    let startScale = 1;
    let currentScale = startScale;
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollDiff = scrollY - lastScrollY;

      // Calculate new scale based on scroll direction
      if (scrollDiff > 0) {
        // Scrolling down - zoom in
        currentScale = Math.min(startScale + scrollY * 0.0005, 1.5);
      } else {
        // Scrolling up - zoom out
        currentScale = Math.max(startScale + scrollY * 0.0005, 1);
      }

      // Apply the scale transform
      background.style.transform = `scale(${currentScale})`;
      lastScrollY = scrollY;
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map