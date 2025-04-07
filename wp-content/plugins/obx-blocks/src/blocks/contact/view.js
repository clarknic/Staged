document.addEventListener('DOMContentLoaded', function() {

    const forms = document.querySelectorAll('.obx-contact__form form');
    
    forms.forEach(form => {
        if (!form) return;
        
        const statusDiv = form.parentElement.querySelector('.form-status');
        const submitButton = form.querySelector('button[type="submit"]');
        
        if (!submitButton) return;
        
        const originalButtonText = submitButton.textContent;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (submitButton.disabled) return false;
            
            // Disable submit button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            statusDiv.style.display = 'block';
            statusDiv.className = 'form-status loading';
            statusDiv.textContent = 'Sending your message...';
            
            // Get form data
            const formData = new FormData(form);
            formData.append('action', 'submit_contact_form');
            
            // Send AJAX request
            fetch(obx_blocks.ajax_url, {
                method: 'POST',
                credentials: 'same-origin',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    handleSuccess(data.data.message);
                } else {
                    throw new Error(data.data.message || 'An error occurred');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                handleError(error.message || 'An error occurred. Please try again.');
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            });
            
            function handleSuccess(message) {
                statusDiv.className = 'form-status success';
                statusDiv.textContent = message;
                form.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    statusDiv.style.display = 'none';
                }, 5000);
            }
            
            function handleError(message) {
                statusDiv.style.display = 'block';
                statusDiv.className = 'form-status error';
                statusDiv.textContent = message;
            }
            
            return false;
        });
    });
}); 