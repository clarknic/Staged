<?php
/**
 * Server-side rendering of the `obx/services` block.
 *
 * @package OBX_Blocks
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// Extract attributes with defaults
$heading = $attributes['heading'] ?? '';
$styled_title = $attributes['styledTitle'] ?? '';
$text = $attributes['text'] ?? '';
$background_image = $attributes['backgroundImage'] ?? null;
$button_text = $attributes['buttonText'] ?? '';
$button_link = $attributes['buttonLink'] ?? '';
$service_items = $attributes['serviceItems'] ?? [];
$align = !empty($attributes['align']) ? $attributes['align'] : 'full';

// Build the class names
$class_names = 'obx-services';
if (!empty($align)) {
    $class_names .= ' align' . $align;
}

// Add anchor ID if it exists
$anchor_id = !empty($attributes['anchor']) ? 'id="' . esc_attr($attributes['anchor']) . '"' : '';

// Output the HTML
?>
<div <?php echo $anchor_id; ?> class="<?php echo esc_attr($class_names); ?>">
    <div class="obx-services-main">
        <?php if ($background_image) : ?>
            <div 
                class="obx-services-main__background"
                style="background-image: url(<?php echo esc_url($background_image['url']); ?>)"
            ></div>
        <?php endif; ?>
        
        <div class="obx-services-main__content">
            <?php if ($heading) : ?>
                <h2 class="obx-services-main__heading"><?php echo wp_kses_post($heading); ?></h2>
            <?php endif; ?>

            <?php if ($styled_title) : ?>
                <h3 class="obx-services-main__styled-title"><?php echo wp_kses_post($styled_title); ?></h3>
            <?php endif; ?>

            <?php if ($text) : ?>
                <div class="obx-services-main__text"><?php echo wp_kses_post($text); ?></div>
            <?php endif; ?>

            <?php if ($button_text && $button_link) : ?>
                <div class="obx-services-main__button">
                    <a href="<?php echo esc_url($button_link); ?>"><?php echo esc_html($button_text); ?></a>
                </div>
            <?php endif; ?>
        </div>
    </div>

    <?php if (!empty($service_items)) : ?>
        <div class="obx-services-items">
            <?php foreach ($service_items as $index => $item) : ?>
                <div class="obx-service-item<?php echo !empty($item['isReversed']) ? ' obx-service-item--reversed' : ''; ?><?php echo $index % 2 !== 0 ? ' obx-service-item--odd' : ''; ?>">
                    <?php if (!empty($item['image'])) : ?>
                        <div class="obx-service-item__image">
                            <img 
                                src="<?php echo esc_url($item['image']['url']); ?>"
                                alt="<?php echo esc_attr($item['title']); ?>"
                            />
                        </div>
                    <?php endif; ?>

                    <div class="obx-service-item__content">
                        <?php if (!empty($item['title'])) : ?>
                            <h3 class="obx-service-item__title"><?php echo wp_kses_post($item['title']); ?></h3>
                        <?php endif; ?>
                        <div class="obx-service-item__line"></div>
                        <?php if (!empty($item['text'])) : ?>
                            <div class="obx-service-item__text"><?php echo wp_kses_post($item['text']); ?></div>
                        <?php endif; ?>
                        
                    </div>
                    <?php if (!empty($item['title'])) : ?>
                        <h4 class="obx-service-item__styled-bg"><?php echo wp_kses_post($item['title']); ?></h4>
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</div>