document.addEventListener('DOMContentLoaded', function() {

    const forms = document.querySelectorAll('.obx-contact__form form');
    
    forms.forEach(form => {
        if (!form) return;
        
        const statusDiv = form.parentElement.querySelector('.form-status');
        const submitButton = form.querySelector('button[type="submit"]');
        
        if (!submitButton) return;
        
        const originalButtonText = submitButton.textContent;
        
        form.addEventListener('submit', function(e) {
            // Prevent default form submission
            e.preventDefault();
            e.stopPropagation();
            
            // Check if the form is already being submitted
            if (submitButton.disabled) return false;
            
            // Disable submit button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Get the nonce from the hidden field
            const nonceField = form.querySelector('#contact_nonce');
            const nonceValue = nonceField ? nonceField.value : obx_blocks.nonce;
            
            // Create FormData object
            const formData = new FormData();
            formData.append('action', 'submit_contact_form');
            formData.append('nonce', nonceValue);
            formData.append('name', form.querySelector('[name="name"]').value);
            formData.append('email', form.querySelector('[name="email"]').value);
            formData.append('phone', form.querySelector('[name="phone"]').value);
            formData.append('message', form.querySelector('[name="message"]').value);
            
            // Send AJAX request
            fetch(obx_blocks.ajax_url, {
                method: 'POST',
                credentials: 'same-origin',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                statusDiv.style.display = 'block';
                if (data.success) {
                    statusDiv.className = 'form-status success';
                    statusDiv.textContent = data.data.message;
                    form.reset();
                } else {
                    statusDiv.className = 'form-status error';
                    statusDiv.textContent = data.data.message;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                statusDiv.style.display = 'block';
                statusDiv.className = 'form-status error';
                statusDiv.textContent = 'An error occurred. Please try again.';
            })
            .finally(() => {
                // Re-enable submit button and restore original text
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                
                // Hide status message after 5 seconds
                setTimeout(() => {
                    statusDiv.style.display = 'none';
                }, 5000);
            });
            
            return false;
        });
    });
}); 