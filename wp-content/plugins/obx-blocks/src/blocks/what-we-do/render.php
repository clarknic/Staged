<?php
/**
 * Server-side rendering of the `obx-blocks/what-we-do` block.
 *
 * @package OBX_Blocks
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// Extract attributes
$heading = $attributes['heading'] ?? '';
$styled_title = $attributes['styledTitle'] ?? '';
$text = $attributes['text'] ?? '';
$background_image = $attributes['backgroundImage'] ?? null;
$button_text = $attributes['buttonText'] ?? '';
$button_link = $attributes['buttonLink'] ?? '';
$service_items = $attributes['serviceItems'] ?? [];
$align = !empty($attributes['align']) ? $attributes['align'] : 'full';

// Build classes
$wrapper_classes = 'obx-what-we-do';
if (!empty($align)) {
    $wrapper_classes .= ' align' . $align;
}

// Add anchor ID if it exists
$anchor_id = !empty($attributes['anchor']) ? 'id="' . esc_attr($attributes['anchor']) . '"' : '';

// Build background style
$background_style = '';
if ($background_image && isset($background_image['url'])) {
    $background_style = 'background-image: url(' . esc_url($background_image['url']) . ');';
}
?>

<div <?php echo $anchor_id; ?> class="<?php echo esc_attr($wrapper_classes); ?>">
    <div class="obx-what-we-do-main">
        <div class="obx-what-we-do-main__background" style="<?php echo esc_attr($background_style); ?>"></div>
        <div class="obx-what-we-do-main__content">
            <?php if (!empty($heading)) : ?>
                <h2 class="obx-what-we-do-main__heading"><?php echo wp_kses_post($heading); ?></h2>
            <?php endif; ?>
            
            <?php if (!empty($styled_title)) : ?>
                <h3 class="obx-what-we-do-main__styled-title"><?php echo wp_kses_post($styled_title); ?></h3>
            <?php endif; ?>
            
            <?php if (!empty($text)) : ?>
                <div class="obx-what-we-do-main__text"><?php echo wp_kses_post($text); ?></div>
            <?php endif; ?>
            
            <?php if (!empty($button_text) && !empty($button_link)) : ?>
                <div class="obx-what-we-do-main__button">
                    <a href="<?php echo esc_url($button_link); ?>"><?php echo esc_html($button_text); ?></a>
                </div>
            <?php endif; ?>
        </div>
    </div>
    
    <?php if (!empty($service_items)) : ?>
        <div class="obx-what-we-do-items">
            <?php foreach ($service_items as $index => $item) : 
                $item_class = 'obx-what-we-do-item';
                if (!empty($item['isReversed'])) {
                    $item_class .= ' obx-what-we-do-item--reversed';
                }
                if ($index % 2 !== 0) {
                    $item_class .= ' obx-what-we-do-item--odd';
                }
                
                $image = $item['image'] ?? null;
                $has_image = $image && isset($image['url']);
            ?>
                <div class="<?php echo esc_attr($item_class); ?>">
                    <?php if ($has_image) : ?>
                        <div class="obx-what-we-do-item__image">
                            <img 
                                src="<?php echo esc_url($image['url']); ?>" 
                                alt="<?php echo esc_attr($image['alt'] ?? $item['title']); ?>"
                            />
                        </div>
                    <?php endif; ?>

                    <div class="obx-what-we-do-item__content">
                        <?php if (!empty($item['title'])) : ?>
                            <h3 class="obx-what-we-do-item__title"><?php echo esc_html($item['title']); ?></h3>
                        <?php endif; ?>
                        
                        <div class="obx-what-we-do-item__line"></div>
                        
                        <?php if (!empty($item['text'])) : ?>
                            <div class="obx-what-we-do-item__text"><?php echo wp_kses_post($item['text']); ?></div>
                        <?php endif; ?>
                    </div>
                    
                    <?php if (!empty($item['title'])) : ?>
                        <h4 class="obx-what-we-do-item__styled-bg"><?php echo esc_html($item['title']); ?></h4>
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</div>