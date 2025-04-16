<?php
/**
 * The template for displaying category pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package OBX_Theme
 */

get_header();
?>

<main id="primary" class="site-main">
    <?php get_template_part('template-parts/part-categories', 'search'); ?>

    <div class="category-header">
        <h1 class="page-title">
            <?php single_cat_title(); ?>
        </h1>
        <?php
        $category_description = category_description();
        if (!empty($category_description)) {
            echo '<div class="category-description">' . $category_description . '</div>';
        }
        ?>
    </div>

    <div class="category-posts-container">
        <?php if (have_posts()) : ?>
            <div class="post-card-grid" id="ajax-posts">
                <?php
                /* Start the Loop */
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
            <div class="no-results">
                <h2><?php esc_html_e('Nothing Found', 'obx-theme'); ?></h2>
                <p><?php esc_html_e('Sorry, but no posts were found in this category.', 'obx-theme'); ?></p>
            </div>
        <?php endif; ?>
    </div>
</main><!-- #primary -->

<?php
get_footer(); 