<?php
/**
 * The template for displaying the blog posts index
 * Includes auto-loading pagination for posts
 *
 * @package OBX_Theme
 */

get_header();
?>

<main id="primary" class="site-main">
    <?php get_template_part('template-parts/part-categories', 'search'); ?>

    <div class="category-header">
        <h1 class="page-title">
            <?php echo get_the_title(get_option('page_for_posts')); ?>
        </h1>
        <?php
        // Get the blog page content to use as description
        $blog_page = get_post(get_option('page_for_posts'));
        if (!empty($blog_page) && !empty($blog_page->post_content)) {
            echo '<div class="category-description">';
            echo apply_filters('the_content', $blog_page->post_content);
            echo '</div>';
        }
        ?>
    </div>

    <div class="category-posts-container">
        <div class="post-card-grid" id="ajax-posts">
            <?php
            if (have_posts()) :
                /* Start the Loop */
                while (have_posts()) :
                    the_post();
                    
                    get_template_part('template-parts/content', 'post-card');
                    
                endwhile;
            else : ?>
                <div class="no-results">
                    <h2><?php esc_html_e('Nothing Found', 'obx-theme'); ?></h2>
                    <p><?php esc_html_e('Sorry, but no posts were found.', 'obx-theme'); ?></p>
                </div>
            <?php endif; ?>
        </div>

        <?php obx_pagination(); ?>
    </div>
</main><!-- #primary -->

<?php
get_footer(); 