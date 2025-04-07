<?php
/**
 * Server-side rendering of the Contact block
 *
 * @package OBX_Blocks
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// Extract attributes with defaults
$title = $attributes['title'] ?? '';
$text = $attributes['text'] ?? '';
$email = $attributes['email'] ?? '';
$phone = $attributes['phone'] ?? '';
$address = $attributes['address'] ?? '';
$background_image_url = $attributes['backgroundImageUrl'] ?? '';
$background_color = !empty($attributes['backgroundColor']) ? $attributes['backgroundColor'] : '#ffffff';
$text_color = !empty($attributes['textColor']) ? $attributes['textColor'] : '#000000';
$accent_color = !empty($attributes['accentColor']) ? $attributes['accentColor'] : '#C4A468';
$align = !empty($attributes['align']) ? $attributes['align'] : 'full';
$text_align = !empty($attributes['textAlign']) ? $attributes['textAlign'] : 'left';
$form_fields = $attributes['formFields'] ?? [];
$mail_subject = $attributes['mailSubject'] ?? '';
$mail_receivers = $attributes['mailReceivers'] ?? '';

// Build the class names
$class_names = 'obx-contact';
if (!empty($align)) {
    $class_names .= ' align' . $align;
}
$class_names .= ' text-' . $text_align;

// Build the inline styles
$block_style = '';
if (!empty($background_color)) {
    $block_style .= "background-color: {$background_color};";
}
if (!empty($text_color)) {
    $block_style .= "color: {$text_color};";
}


// Add anchor ID if it exists
$anchor_id = !empty($attributes['anchor']) ? 'id="' . esc_attr($attributes['anchor']) . '"' : '';
?>
<div <?php echo $anchor_id; ?> class="<?php echo esc_attr($class_names); ?>" <?php echo !empty($block_style) ? 'style="' . esc_attr($block_style) . '"' : ''; ?>>
    <div class="obx-contact__left">
        <?php if (!empty($title)) : ?>
            <h2 class="obx-contact__title"><?php echo wp_kses_post($title); ?></h2>
        <?php endif; ?>
        
        <div class="obx-contact__heading-line" style="background-color: <?php echo esc_attr($accent_color); ?>;"></div>
        
        <?php if (!empty($text)) : ?>
            <div class="obx-contact__text"><?php echo wp_kses_post($text); ?></div>
        <?php endif; ?>
        
        <div class="obx-contact__contact-info">
            <?php if (!empty($email)) : ?>
                <div class="obx-contact__contact-item">
                    <i class="fas fa-envelope"></i>
                    <span><?php echo esc_html($email); ?></span>
                </div>
            <?php endif; ?>
            
            <?php if (!empty($phone)) : ?>
                <div class="obx-contact__contact-item">
                    <i class="fas fa-phone"></i>
                    <span><?php echo esc_html($phone); ?></span>
                </div>
            <?php endif; ?>
            
            <?php if (!empty($address)) : ?>
                <div class="obx-contact__contact-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span><?php echo esc_html($address); ?></span>
                </div>
            <?php endif; ?>
        </div>
        
        <div class="obx-contact__form" id="contact-us">
            <form class="contact-form" id="contact-form-<?php echo esc_attr($block->id); ?>">
                <?php wp_nonce_field('contact_form_nonce', 'nonce'); ?>
                <input type="hidden" name="block_id" value="<?php echo esc_attr($block->id); ?>">
                <?php $mail_data = array(
                    'mail_subject' => $mail_subject,
                    'mail_receivers' => $mail_receivers
                ); 
                $mail_data = base64_encode(json_encode($mail_data));
                ?>
                <input type="hidden" name="mail_data" value="<?php echo esc_attr($mail_data); ?>">
                <div class="form-group">
                    <label for="name-<?php echo esc_attr($block->id); ?>"><?php echo esc_html($form_fields['name']['label']); ?></label>
                    <input
                        type="text"
                        id="name-<?php echo esc_attr($block->id); ?>"
                        name="name"
                        placeholder="<?php echo esc_attr($form_fields['name']['placeholder']); ?>"
                        required
                        pattern="[A-Za-z\s]+"
                        title="Please enter only letters and spaces"
                    >
                </div>

                <div class="form-group">
                    <label for="email-<?php echo esc_attr($block->id); ?>"><?php echo esc_html($form_fields['email']['label']); ?></label>
                    <input
                        type="email"
                        id="email-<?php echo esc_attr($block->id); ?>"
                        name="email"
                        placeholder="<?php echo esc_attr($form_fields['email']['placeholder']); ?>"
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                        title="Please enter a valid email address"
                        required
                    >
                </div>

                <div class="form-group">
                    <label for="phone-<?php echo esc_attr($block->id); ?>"><?php echo esc_html($form_fields['phone']['label']); ?></label>
                    <input
                        type="tel"
                        id="phone-<?php echo esc_attr($block->id); ?>"
                        name="phone"
                        placeholder="<?php echo esc_attr($form_fields['phone']['placeholder']); ?>"
                        required
                        pattern="[0-9\s\-\(\)\+]+"
                        title="Please enter a valid phone number"
                    >
                </div>

                <div class="form-group">
                    <label for="message-<?php echo esc_attr($block->id); ?>"><?php echo esc_html($form_fields['message']['label']); ?></label>
                    <textarea
                        id="message-<?php echo esc_attr($block->id); ?>"
                        name="message"
                        placeholder="<?php echo esc_attr($form_fields['message']['placeholder']); ?>"
                        required
                        maxlength="500"
                    ></textarea>
            </div>

                <button
                    type="submit"
                    class="submit-button"
                >
                    <?php echo esc_html($form_fields['submit']['text']); ?>
                </button>
            </form>

            <div class="form-status" style="display: none;"></div>
        </div>
    </div>
    
    <div 
        class="obx-contact__right"
        style="
            background-image: <?php echo $background_image_url ? 'url(' . esc_url($background_image_url) . ')' : 'none'; ?>;
            background-color: <?php echo esc_attr($background_color); ?>;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        "
    ></div>
</div>