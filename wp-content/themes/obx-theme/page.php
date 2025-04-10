<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package OBX_Theme
 */

get_header();

$page_thumbnail = get_the_post_thumbnail_url(get_the_ID(), 'full');
if (!empty($page_thumbnail)) {
    $page_thumbnail = 'style="background-image: url(' . $page_thumbnail . ');"';
}

?>
	<main id="primary" class="site-main">
		<header class="page-header">
			<div class="page-header-underlay" <?php echo $page_thumbnail; ?>></div>
			<h1 class="page-title"><?php the_title(); ?></h1>
		</header>
		<div class="page-content">
			<?php the_content(); ?>
		</div>
	</main><!-- #primary -->

<?php
get_footer(); 