<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package OBX_Theme
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<?php

		if ( 'post' === get_post_type() ) :
			?>
			<div class="entry-meta">
				<span class="author-info">
					<span class="author-avatar-wrapper">
						<img width="32" height="32" src="<?php echo esc_url( get_avatar_url( get_the_author_meta( 'ID' ) ) ); ?>" alt="<?php echo esc_attr( get_the_author() ); ?>" class="author-avatar">
					</span>
					<a href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>" title="Post by <?php echo esc_attr( get_the_author() ); ?>" class="author-name"><?php echo esc_html( get_the_author_meta('display_name') ); ?></a>
				</span>
				<?php
				$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
				if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
					$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
				}
				$posted_on = get_the_date('M j');?>
				<span class="posted-on"><?php echo $posted_on; ?></span>
				<span class="reading-time"><?php echo esc_html( get_reading_time() ); ?></span>
			</div><!-- .entry-meta -->
		<?php endif; ?>

		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
	</header><!-- .entry-header -->

	<div class="entry-content">
		<?php
		if ( is_singular() ) :
			the_content(
				sprintf(
					wp_kses(
						/* translators: %s: Name of current post. Only visible to screen readers */
						__( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'obx-theme' ),
						array(
							'span' => array(
								'class' => array(),
							),
						)
					),
					wp_kses_post( get_the_title() )
				)
			);

			wp_link_pages(
				array(
					'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'obx-theme' ),
					'after'  => '</div>',
				)
			);
		else :
			the_excerpt();
			?>
			<p><a href="<?php the_permalink(); ?>" class="btn"><?php esc_html_e( 'Read More', 'obx-theme' ); ?></a></p>
		<?php endif; ?>
	</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php if ( 'post' === get_post_type() && is_singular() ) : ?>
			<div class="entry-categories">
				<?php
				/* translators: used between list items, there is a space after the comma */
				$categories_list = get_the_category_list( esc_html__( ', ', 'obx-theme' ) );
				if ( $categories_list ) {
					/* translators: 1: list of categories. */
					printf( '<span class="cat-links">' . esc_html__( 'Posted in %1$s', 'obx-theme' ) . '</span>', $categories_list ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				}

				/* translators: used between list items, there is a space after the comma */
				$tags_list = get_the_tag_list( '', esc_html_x( ', ', 'list item separator', 'obx-theme' ) );
				if ( $tags_list ) {
					/* translators: 1: list of tags. */
					printf( '<span class="tags-links">' . esc_html__( 'Tagged %1$s', 'obx-theme' ) . '</span>', $tags_list ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				}
				?>
			</div><!-- .entry-categories -->
			
			<div class="post-stats">
				<span class="views-count">
					<svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
						<circle cx="12" cy="12" r="3"></circle>
					</svg>
					<?php echo esc_html( get_views_count() ); ?>
				</span>
				<span class="likes-count">
					<svg class="icon like-button <?php echo has_user_liked_post() ? 'liked' : ''; ?>" 
					     data-post-id="<?php the_ID(); ?>" 
					     width="16" height="16" 
					     viewBox="0 0 24 24" 
					     fill="<?php echo has_user_liked_post() ? '#ff4757' : 'none'; ?>" 
					     stroke="#ff4757" 
					     stroke-width="2" 
					     stroke-linecap="round" 
					     stroke-linejoin="round">
						<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
					</svg>
					<span class="count"><?php echo esc_html( get_likes_count() ); ?></span>
				</span>
			</div>
		<?php endif; ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-<?php the_ID(); ?> -->

<?php if ( is_singular() ) : ?>
	<section class="related-posts">
		<h2><?php esc_html_e( 'Related Posts', 'obx-theme' ); ?></h2>
		<div class="related-posts-grid">
			<?php
			$related_posts = get_related_posts();
			foreach ( $related_posts as $post ) :
				setup_postdata( $post );
				?>
				<article class="related-post">
					<a href="<?php the_permalink(); ?>">
						<?php if ( has_post_thumbnail() ) : ?>
							<?php the_post_thumbnail( 'medium' ); ?>
						<?php endif; ?>
						<h3><?php the_title(); ?></h3>
					</a>
				</article>
			<?php
			endforeach;
			wp_reset_postdata();
			?>
		</div>
	</section>
<?php endif; ?>