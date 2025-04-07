<?php
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="wrap">
    <h1><?php echo esc_html(get_admin_page_title()); ?></h1>

    <?php if (isset($_GET['deleted'])): ?>
        <div class="notice notice-success">
            <p><?php _e('Submission deleted successfully.', 'obx-blocks'); ?></p>
        </div>
    <?php endif; ?>

    <?php if (isset($_GET['updated'])): ?>
        <div class="notice notice-success">
            <p><?php _e('Submission updated successfully.', 'obx-blocks'); ?></p>
        </div>
    <?php endif; ?>

    <table class="wp-list-table widefat fixed striped">
        <thead>
            <tr>
                <th><?php _e('ID', 'obx-blocks'); ?></th>
                <th><?php _e('Name', 'obx-blocks'); ?></th>
                <th><?php _e('Email', 'obx-blocks'); ?></th>
                <th><?php _e('Phone', 'obx-blocks'); ?></th>
                <th><?php _e('Message', 'obx-blocks'); ?></th>
                <th><?php _e('Date', 'obx-blocks'); ?></th>
                <th><?php _e('Actions', 'obx-blocks'); ?></th>
            </tr>
        </thead>
        <tbody>
            <?php if (empty($submissions)): ?>
                <tr>
                    <td colspan="7"><?php _e('No submissions found.', 'obx-blocks'); ?></td>
                </tr>
            <?php else: ?>
                <?php foreach ($submissions as $submission): ?>
                    <tr>
                        <td><?php echo esc_html($submission->id); ?></td>
                        <td><?php echo esc_html($submission->name); ?></td>
                        <td><?php echo esc_html($submission->email); ?></td>
                        <td><?php echo esc_html($submission->phone); ?></td>
                        <td><?php echo esc_html($submission->message); ?></td>
                        <td><?php echo esc_html($submission->created_at); ?></td>
                        <td>
                            <button type="button" class="button edit-submission" 
                                    data-id="<?php echo esc_attr($submission->id); ?>"
                                    data-name="<?php echo esc_attr($submission->name); ?>"
                                    data-email="<?php echo esc_attr($submission->email); ?>"
                                    data-phone="<?php echo esc_attr($submission->phone); ?>"
                                    data-message="<?php echo esc_attr($submission->message); ?>">
                                <?php _e('Edit', 'obx-blocks'); ?>
                            </button>
                            <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" style="display: inline;">
                                <?php wp_nonce_field('delete_contact_submission'); ?>
                                <input type="hidden" name="action" value="delete_contact_submission">
                                <input type="hidden" name="submission_id" value="<?php echo esc_attr($submission->id); ?>">
                                <button type="submit" class="button delete-submission" onclick="return confirm('<?php esc_attr_e('Are you sure you want to delete this submission?', 'obx-blocks'); ?>')">
                                    <?php _e('Delete', 'obx-blocks'); ?>
                                </button>
                            </form>
                        </td>
                    </tr>
                <?php endforeach; ?>
            <?php endif; ?>
        </tbody>
    </table>
</div>

<!-- Edit Modal -->
<div id="edit-modal" class="modal" style="display: none;">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2><?php _e('Edit Submission', 'obx-blocks'); ?></h2>
        <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
            <?php wp_nonce_field('edit_contact_submission'); ?>
            <input type="hidden" name="action" value="edit_contact_submission">
            <input type="hidden" name="submission_id" id="edit-submission-id">
            
            <div class="form-field">
                <label for="edit-name"><?php _e('Name', 'obx-blocks'); ?></label>
                <input type="text" id="edit-name" name="name" required>
            </div>

            <div class="form-field">
                <label for="edit-email"><?php _e('Email', 'obx-blocks'); ?></label>
                <input type="email" id="edit-email" name="email" required>
            </div>

            <div class="form-field">
                <label for="edit-phone"><?php _e('Phone', 'obx-blocks'); ?></label>
                <input type="tel" id="edit-phone" name="phone" required>
            </div>

            <div class="form-field">
                <label for="edit-message"><?php _e('Message', 'obx-blocks'); ?></label>
                <textarea id="edit-message" name="message" required></textarea>
            </div>

            <button type="submit" class="button button-primary"><?php _e('Save Changes', 'obx-blocks'); ?></button>
        </form>
    </div>
</div>

<style>
.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.4);
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%;
    max-width: 500px;
    position: relative;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.close:hover {
    color: #000;
}

.form-field {
    margin-bottom: 15px;
}

.form-field label {
    display: block;
    margin-bottom: 5px;
}

.form-field input,
.form-field textarea {
    width: 100%;
    padding: 8px;
}

.form-field textarea {
    height: 100px;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const editButtons = document.querySelectorAll('.edit-submission');
    const closeButtons = document.querySelectorAll('.close');
    const editModal = document.getElementById('edit-modal');
    
    // Open modal
    editButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const data = this.dataset;
            document.getElementById('edit-submission-id').value = data.id;
            document.getElementById('edit-name').value = data.name;
            document.getElementById('edit-email').value = data.email;
            document.getElementById('edit-phone').value = data.phone;
            document.getElementById('edit-message').value = data.message;
            editModal.style.display = 'block';
        });
    });

    // Close modal when clicking close button
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            editModal.style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
});
</script> 