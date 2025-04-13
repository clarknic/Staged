<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package OBX_Theme
 */

get_header();
?>
	
	<main id="primary" class="site-main">
		<?php get_template_part( 'template-parts/part-categories-search' ); ?>

		<?php
		while ( have_posts() ) :
			the_post();

			get_template_part( 'template-parts/content', get_post_type() );


		endwhile; // End of the loop.
		?>

	</main><!-- #primary -->

<?php
get_footer(); 