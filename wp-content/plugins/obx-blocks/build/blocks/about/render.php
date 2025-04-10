<?php
/**
 * Server-side rendering of the About Us block
 *
 * @package OBX_Blocks
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// Extract attributes with defaults
$heading = $attributes['heading'] ?? 'We know that life happens in stages.';
$content = $attributes['content'] ?? '';
$left_image = $attributes['leftImage'] ?? [];
$right_image = $attributes['rightImage'] ?? [];
$circle_image = $attributes['circleImage'] ?? [];
$use_circle_image = $attributes['useCircleImage'] ?? true;
$text_color = !empty($attributes['textColor']) ? $attributes['textColor'] : '#333333';
$text_align = !empty($attributes['textAlign']) ? $attributes['textAlign'] : 'center';
$content_width = !empty($attributes['contentWidth']) ? $attributes['contentWidth'] : 60;
$cta_text = !empty($attributes['ctaText']) ? $attributes['ctaText'] : 'Our Services';
$cta_link = !empty($attributes['ctaLink']) ? $attributes['ctaLink'] : '#services';
$cta_target = !empty($attributes['ctaTarget']) ? true : false;
$cta_position = !empty($attributes['ctaPosition']) ? $attributes['ctaPosition'] : 'center';
$align = !empty($attributes['align']) ? $attributes['align'] : 'full';

// Add anchor ID if it exists
$anchor_id = !empty($attributes['anchor']) ? 'id="' . esc_attr($attributes['anchor']) . '"' : '';

// Build the class names
$class_names = 'obx-about';
if (!empty($align)) {
    $class_names .= ' align' . $align;
}

// Add class if using circle image
$content_class = 'obx-about__content';
if ($use_circle_image) {
    $content_class .= ' obx-about__content--with-circle';
}

// Set target attribute for CTA link
$target_attr = $cta_target ? ' target="_blank" rel="noopener noreferrer"' : '';

// Output the HTML
?>
<div <?php echo $anchor_id; ?> class="<?php echo esc_attr($class_names); ?>">
    <div class="obx-about__container">
        <?php if (!empty($left_image) && !empty($left_image['url'])) : ?>
            <div class="obx-about__image obx-about__image--left">
                <img 
                    src="<?php echo esc_url($left_image['url']); ?>" 
                    alt="<?php echo esc_attr($left_image['alt'] ?? ''); ?>"
                    class="obx-about__image-img"
                />
            </div>
        <?php else: ?>
            <!-- Left image not displayed: empty or missing URL -->
        <?php endif; ?>
        
        <div class="<?php echo esc_attr($content_class); ?>" style="max-width: <?php echo esc_attr($content_width); ?>%; text-align: <?php echo esc_attr($text_align); ?>;">
            <?php if ($use_circle_image) : ?>
                <div class="obx-about__circle">
                    <?php if (!empty($circle_image) && !empty($circle_image['url'])) : ?>
                        <img 
                            src="<?php echo esc_url($circle_image['url']); ?>" 
                            alt="<?php echo esc_attr($circle_image['alt'] ?? ''); ?>"
                            class="obx-about__circle-img"
                        />
                    <?php else: ?>
                        <div class="obx-about__circle-placeholder"></div>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
            
            <?php if (!empty($heading)) : ?>
                <h2 class="obx-about__heading" style="color: <?php echo esc_attr($text_color); ?>;">
                    <?php echo wp_kses_post($heading); ?>
                </h2>
            <?php endif; ?>
            
            <?php if (!empty($content)) : ?>
                <div class="obx-about__text" style="color: <?php echo esc_attr($text_color); ?>;">
                    <?php echo wp_kses_post($content); ?>
                </div>
            <?php endif; ?>
            
            <?php if (!empty($cta_text)) : ?>
                <div class="obx-about__cta obx-about__cta--<?php echo esc_attr($cta_position); ?>">
                    <a href="<?php echo esc_url($cta_link); ?>" class="obx-about__button"<?php echo $target_attr; ?>>
                        <?php echo esc_html($cta_text); ?>
                    </a>
                </div>
            <?php endif; ?>
        </div>
        
        <?php if (!empty($right_image) && !empty($right_image['url'])) : ?>
            <div class="obx-about__image obx-about__image--right">
                <img 
                    src="<?php echo esc_url($right_image['url']); ?>" 
                    alt="<?php echo esc_attr($right_image['alt'] ?? ''); ?>"
                    class="obx-about__image-img"
                />
            </div>
        <?php else: ?>
            <!-- Right image not displayed: empty or missing URL -->
        <?php endif; ?>
    </div>
</div> 