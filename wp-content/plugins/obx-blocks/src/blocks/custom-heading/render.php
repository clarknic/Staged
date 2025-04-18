<?php
/**
 * Server-side rendering of the `obx-blocks/custom-heading` block.
 *
 * @package OBX_Blocks
 */

$title = $attributes['title'] ?? '';
$backgroundColor = $attributes['backgroundColor'] ?? '#F5EEE1';
$backgroundImage = $attributes['backgroundImage'] ?? null;
$imageAfter = $attributes['imageAfter'] ?? null;

$style = sprintf(
    'background-color: %s;',
    esc_attr($backgroundColor)
);
if ($backgroundImage && isset($backgroundImage['url'])) {
    $style .= sprintf(
        ' background-image: url(%s);',
        esc_url($backgroundImage['url'])
    );
}

$imageAfterStyle = '';
if ($imageAfter && isset($imageAfter['url'])) {
    $imageAfterStyle = sprintf(
        'background-image: url(%s);',
        esc_url($imageAfter['url'])
    );
}
?>

<div class="custom-heading-wrapper">
    <div class="wp-block-obx-blocks-custom-heading" style="<?php echo esc_attr($style); ?>">
        <div class="custom-heading-content">
            <?php if ($title) : ?>
                <p><?php echo esc_html($title); ?></p>
            <?php endif; ?>
            <div class="custom-heading-line"></div>
        </div>
    </div>
    <?php if ($imageAfter && isset($imageAfter['url'])) : ?>
        <div class="custom-heading-image-section" style="<?php echo esc_attr($imageAfterStyle); ?>"></div>
    <?php endif; ?>
</div> 