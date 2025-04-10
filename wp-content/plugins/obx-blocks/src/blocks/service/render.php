<?php
/**
 * Server-side rendering of the `obx-blocks/service` block.
 *
 * @package OBX_Blocks
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// Extract attributes
$heading = $attributes['heading'] ?? '';
$subheading = $attributes['subheading'] ?? '';
$image = $attributes['image'] ?? null;
$is_reversed = $attributes['isReversed'] ?? false;
$cta_title = $attributes['ctaTitle'] ?? 'Book Call';
$cta_link = $attributes['ctaLink'] ?? '#';
$cta_target = $attributes['ctaTarget'] ?? false;
$cta_position = $attributes['ctaPosition'] ?? 'left';
$align = !empty($attributes['align']) ? $attributes['align'] : 'full';

// Build classes
$wrapper_classes = 'obx-service';
if ($is_reversed) {
    $wrapper_classes .= ' obx-service--reversed';
}
if (!empty($align)) {
    $wrapper_classes .= ' align' . $align;
}

// Add anchor ID if it exists
$anchor_id = !empty($attributes['anchor']) ? 'id="' . esc_attr($attributes['anchor']) . '"' : '';

// Set target attribute for CTA link
$target_attr = $cta_target ? ' target="_blank" rel="noopener noreferrer"' : '';
?>

<div <?php echo $anchor_id; ?> class="<?php echo esc_attr($wrapper_classes); ?>">
    <div class="obx-service__content-container">
        <div class="obx-service__body">
            <div class="obx-service__text-column">
                <div class="obx-service__header">
                    <?php if (!empty($heading)) : ?>
                        <h2 class="obx-service__heading"><?php echo wp_kses_post($heading); ?></h2>
                    <?php endif; ?>
                    
                    <?php if (!empty($subheading)) : ?>
                        <h3 class="obx-service__subheading"><?php echo wp_kses_post($subheading); ?></h3>
                    <?php endif; ?>
                </div>
                
                <div class="obx-service__content">
                    <?php echo $content; ?>
                </div>
                
                <?php if (!empty($cta_title) && !empty($cta_link)) : ?>
                    <div class="obx-service__cta obx-service__cta--<?php echo esc_attr($cta_position); ?>">
                        <a href="<?php echo esc_url($cta_link); ?>" class="obx-service__cta-button"<?php echo $target_attr; ?>>
                            <?php echo esc_html($cta_title); ?>
                        </a>
                    </div>
                <?php endif; ?>
            </div>
            
            <?php if ($image && isset($image['url'])) : ?>
                <div class="obx-service__image-column">
                    <div class="obx-service__image">
                        <img 
                            src="<?php echo esc_url($image['url']); ?>" 
                            alt="<?php echo esc_attr($image['alt'] ?? $heading); ?>"
                            class="obx-service__image-img"
                        />
                    </div>
                </div>
            <?php endif; ?>
        </div>
    </div>
</div> 