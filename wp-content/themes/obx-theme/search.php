<?php
/**
 * The template for displaying search results pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package OBX_Theme
 */

get_header();

// Modify query to only show posts
global $wp_query;
if (!isset($_GET['post_type'])) {
    // Store original search query for AJAX pagination
    $search_query = get_search_query();
    
    $wp_query = new WP_Query(array(
        's' => $search_query,
        'post_type' => 'post'
    ));
}
?>

<main id="primary" class="site-main">
    <?php get_template_part('template-parts/part-categories', 'search'); ?>

    <div class="category-header">
        <h1 class="page-title">
            <?php
            /* translators: %s: search query. */
            printf(esc_html__('Search Results for: %s', 'obx-theme'), '<span>' . get_search_query() . '</span>');
            ?>
        </h1>
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
                <p><?php esc_html_e('Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'obx-theme'); ?></p>
                
                <div class="search-again">
                    <?php get_search_form(); ?>
                </div>
            </div>
        <?php endif; ?>
    </div>
</main><!-- #primary -->

<?php
get_footer(); 