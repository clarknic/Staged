<?php
/**
 * The template for displaying search results pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package OBX_Theme
 */

get_header();
?>

<main id="primary" class="site-main">
    <?php get_template_part('template-parts/part-categories', 'search'); ?>

    <div class="search-results-header">
        <h1 class="page-title">
            <?php
            /* translators: %s: search query. */
            printf(esc_html__('Search Results for: %s', 'obx-theme'), '<span>' . get_search_query() . '</span>');
            ?>
        </h1>
    </div>

    <div class="search-results-container">
        <?php if (have_posts()) : ?>
            <div class="search-results-grid">
                <?php
                /* Start the Loop */
                while (have_posts()) :
                    the_post();
                    
                    get_template_part('template-parts/content', 'search');
                    
                endwhile;
                ?>
            </div>

            <?php
            the_posts_pagination(array(
                'prev_text' => '<span class="screen-reader-text">' . __('Previous page', 'obx-theme') . '</span>',
                'next_text' => '<span class="screen-reader-text">' . __('Next page', 'obx-theme') . '</span>',
                'before_page_number' => '<span class="meta-nav screen-reader-text">' . __('Page', 'obx-theme') . ' </span>',
            ));
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