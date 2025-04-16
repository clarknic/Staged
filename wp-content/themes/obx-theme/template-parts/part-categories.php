<?php
/**
 * Template part for displaying the category header and container
 *
 * @package OBX_Theme
 */

$category = get_queried_object();
?>

<div class="category-header">
    <h1 class="page-title"><?php echo esc_html(single_cat_title('', false)); ?></h1>
    <?php if (!empty($category->description)) : ?>
        <div class="category-description"><?php echo wp_kses_post($category->description); ?></div>
    <?php endif; ?>
</div>

<div class="category-posts-container">
    <?php if (have_posts()) : ?>
        <div class="post-card-grid" id="ajax-posts">
            <?php
            // Start the Loop
            while (have_posts()) :
                the_post();
                get_template_part('template-parts/content', 'post-card');
            endwhile;
            ?>
        </div>

        <?php
        obx_pagination();
        ?>

    <?php else : ?>
        <p><?php esc_html_e('No posts found in this category.', 'obx-theme'); ?></p>
    <?php endif; ?>
</div> 