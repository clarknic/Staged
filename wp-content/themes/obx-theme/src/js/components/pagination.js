/**
 * Pagination component - handles AJAX loading of posts
 */

class PostsPagination {
  constructor() {
    this.loadMoreBtn = document.getElementById('load-more');
    this.postsContainer = document.getElementById('ajax-posts');
    this.spinner = document.querySelector('.loading-spinner');
    
    if (!this.loadMoreBtn || !this.postsContainer) {
      return;
    }
    
    this.loading = false;
    this.currentPage = parseInt(this.loadMoreBtn.dataset.page);
    this.maxPages = parseInt(this.loadMoreBtn.dataset.maxPages);
    this.postsPerPage = parseInt(this.loadMoreBtn.dataset.postsPerPage);
    this.searchQuery = this.loadMoreBtn.dataset.search || '';
    this.categoryId = this.loadMoreBtn.dataset.cat || '';
    this.autoLoadThreshold = 200; // pixels from bottom to trigger auto load
    this.loadDelay = 1000; // 1-second delay for loading posts
    
    // Initialize event listeners
    this.initEvents();
  }
  
  initEvents() {
    // Click handler for Load More button
    this.loadMoreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.loadMorePosts();
    });
    
    // Auto-load when scrolling near bottom
    window.addEventListener('scroll', () => {
      if (this.loading) return;
      
      if ((window.scrollY + window.innerHeight) > 
          (document.documentElement.scrollHeight - this.autoLoadThreshold)) {
        this.loadMorePosts();
      }
    });
  }
  
  loadMorePosts() {
    if (this.loading || this.currentPage >= this.maxPages) {
      return;
    }
    
    this.loading = true;
    this.currentPage++;
    this.spinner.classList.remove('hidden');
    
    // Create FormData for the request
    const formData = new FormData();
    formData.append('action', 'load_more_posts');
    formData.append('page', this.currentPage);
    formData.append('posts_per_page', this.postsPerPage);
    
    // Add search query if available
    if (this.searchQuery) {
      formData.append('s', this.searchQuery);
    }
    
    // Add category if available
    if (this.categoryId) {
      formData.append('cat', this.categoryId);
    }
    
    // Use modern Fetch API instead of jQuery.ajax
    fetch(obx_site.ajax_url, {
      method: 'POST',
      body: formData,
      credentials: 'same-origin'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(html => {
      // Add a slight delay before showing the posts
      setTimeout(() => {
        if (html) {
          // Append new posts to container
          this.postsContainer.insertAdjacentHTML('beforeend', html);
          this.loadMoreBtn.dataset.page = this.currentPage;
          
          // Remove button if we've reached the max pages
          if (this.currentPage >= this.maxPages) {
            this.loadMoreBtn.remove();
          }
        } else {
          this.loadMoreBtn.remove();
        }
        
        this.loading = false;
        this.spinner.classList.add('hidden');
      }, this.loadDelay);
    })
    .catch(error => {
      console.error('Error loading more posts:', error);
      this.loading = false;
      this.spinner.classList.add('hidden');
    });
  }
}

// Initialize the pagination when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PostsPagination();
});

export default PostsPagination; 