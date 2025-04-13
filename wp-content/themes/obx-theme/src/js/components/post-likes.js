/**
 * Post likes functionality
 * Handles toggling like state for posts
 */

const PostLikes = () => {
  // Initialize like buttons
  function init() {
    const likeButtons = document.querySelectorAll('.like-button');
    if (!likeButtons.length) return;
    
    likeButtons.forEach(button => {
      button.addEventListener('click', handleLike);
    });
  }

  /**
   * Handle like button click
   */
  function handleLike() {
    // Get the heart icon (this element)
    const heart = this;
    const postId = heart.dataset.postId;
    const countElement = heart.closest('.likes-count').querySelector('.count');
    
    // Check if heart is currently liked
    const isLiked = heart.classList.contains('liked');
    
    // Action is opposite of current state
    const action = isLiked ? 'unlike' : 'like';
    
    // Send the request
    fetch(obx_site.ajax_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        action: 'post_like',
        post_id: postId,
        action_type: action,
        nonce: obx_site.nonce
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Update count
        countElement.textContent = data.data.count;
        
        // Update heart state based on server response
        if (data.data.liked) {
          // Post is liked, fill heart with red
          heart.classList.add('liked');
          heart.setAttribute('fill', '#ff4757');
        } else {
          // Post is unliked, show outline only
          heart.classList.remove('liked');
          heart.setAttribute('fill', 'none');
          console.log('Heart unliked - setting fill to none');
        }
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  // Initialize
  init();
};

export default PostLikes; 