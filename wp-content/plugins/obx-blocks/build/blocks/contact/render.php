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
$form_shortcode = $attributes['formShortcode'] ?? '';
$background_image_url = $attributes['backgroundImageUrl'] ?? '';
$background_image_id = $attributes['backgroundImageId'] ?? null;
$background_image_alt = $attributes['backgroundImageAlt'] ?? '';
$background_color = !empty($attributes['backgroundColor']) ? $attributes['backgroundColor'] : '#ffffff';
$text_color = !empty($attributes['textColor']) ? $attributes['textColor'] : '#000000';
$accent_color = !empty($attributes['accentColor']) ? $attributes['accentColor'] : '#C4A468';
$align = !empty($attributes['align']) ? $attributes['align'] : 'full';
$text_align = !empty($attributes['textAlign']) ? $attributes['textAlign'] : 'left';
$content_width = !empty($attributes['contentWidth']) ? $attributes['contentWidth'] : 100;

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
        
        <?php if (!empty($form_shortcode)) : ?>
            <div class="obx-contact__form">
                <?php echo do_shortcode($form_shortcode); ?>
            </div>
        <?php endif; ?>
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