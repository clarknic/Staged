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

	<?php 
	// Check if TOC is enabled for this post (default is yes)
	$enable_toc = get_post_meta(get_the_ID(), 'obx-enable-toc', true);
	if ($enable_toc !== 'no' && is_singular()) {
		echo do_shortcode('[obx_toc]');
	}
	?>

	<div class="entry-content">
		<?php
		if ( is_singular() ) :
			the_content();
		else :
			the_excerpt();
			?>
			<p><a href="<?php the_permalink(); ?>" class="btn"><?php esc_html_e( 'Read More', 'obx-theme' ); ?></a></p>
		<?php endif; ?>
	</div><!-- .entry-content -->

	<footer class="entry-footer">


			
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

		<?php if ( 'post' === get_post_type() && is_singular() ) : ?>
			<div class="social-sharing">
				<a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo urlencode(get_permalink()); ?>" target="_blank" rel="noopener noreferrer" class="social-sharing-link" aria-label="<?php esc_attr_e('Share on Facebook', 'obx-theme'); ?>">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
				</a>
				<a href="https://twitter.com/intent/tweet?text=<?php echo urlencode(get_the_title()); ?>&url=<?php echo urlencode(get_permalink()); ?>" target="_blank" rel="noopener noreferrer" class="social-sharing-link" aria-label="<?php esc_attr_e('Share on X (formerly Twitter)', 'obx-theme'); ?>">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
				</a>
				<a href="https://www.linkedin.com/shareArticle?mini=true&url=<?php echo urlencode(get_permalink()); ?>&title=<?php echo urlencode(get_the_title()); ?>" target="_blank" rel="noopener noreferrer" class="social-sharing-link" aria-label="<?php esc_attr_e('Share on LinkedIn', 'obx-theme'); ?>">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 19 19" fill="currentColor" stroke="none"><path d="M17,17 L13.89343,17 L13.89343,12.1275733 C13.89343,10.9651251 13.87218,9.47069458 12.2781416,9.47069458 C10.660379,9.47069458 10.4126568,10.7365137 10.4126568,12.0434478 L10.4126568,17 L7.30623235,17 L7.30623235,6.98060885 L10.2883591,6.98060885 L10.2883591,8.3495072 L10.3296946,8.3495072 C10.7445056,7.56190587 11.7585364,6.7312941 13.2709225,6.7312941 C16.418828,6.7312941 17,8.80643844 17,11.5041407 L17,17 Z M3.80289931,5.61098151 C2.80647978,5.61098151 2,4.80165627 2,3.80498046 C2,2.80903365 2.80647978,2 3.80289931,2 C4.79669898,2 5.60434314,2.80903365 5.60434314,3.80498046 C5.60434314,4.80165627 4.79669898,5.61098151 3.80289931,5.61098151 Z M2.24786773,17 L2.24786773,6.98060885 L5.35662096,6.98060885 L5.35662096,17 L2.24786773,17 Z"></path></svg>
				</a>
				<a href="#" class="social-sharing-link copy-link" data-clipboard-text="<?php echo esc_url(get_permalink()); ?>" aria-label="<?php esc_attr_e('Copy link to clipboard', 'obx-theme'); ?>">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 19 19" aria-hidden="true" fill="currentColor"><path d="M10.6000004,11.7622375 L14.2108923,11.7622375 C15.4561791,11.7622375 16.4656836,10.7527331 16.4656836,9.50744629 L16.4656836,9.50744629 L16.4656836,9.50744629 C16.4656836,8.26215946 15.4561791,7.25265503 14.2108923,7.25265503 L10.6000004,7.25265503 L10.6000004,5.84470702 L10.6000004,5.84470702 C10.6000004,5.73425007 10.6895434,5.64470702 10.8000004,5.64470702 L14.3209766,5.64470702 C16.4501961,5.64470702 18.1762695,7.37078048 18.1762695,9.5 C18.1762695,11.6292195 16.4501961,13.355293 14.3209766,13.355293 L10.8000004,13.355293 L10.8000004,13.355293 C10.6895434,13.355293 10.6000004,13.2657499 10.6000004,13.155293 L10.6000004,11.7622375 Z M8.39999962,7.25265503 L4.82047474,7.25265503 C3.57518792,7.25265503 2.56568348,8.26215946 2.56568348,9.50744629 L2.56568348,9.50744629 L2.56568348,9.50744629 C2.56568348,10.7527331 3.57518792,11.7622375 4.82047474,11.7622375 L8.39999962,11.7622375 L8.39999962,13.1578418 C8.39999962,13.2682987 8.31045657,13.3578418 8.19999962,13.3578418 L4.60784179,13.3578418 C2.4772146,13.3578418 0.75,11.6306272 0.75,9.5 C0.75,7.36937281 2.4772146,5.64215821 4.60784179,5.64215821 L8.19999962,5.64215821 L8.19999962,5.64215821 C8.31045657,5.64215821 8.39999962,5.73170126 8.39999962,5.84215821 L8.39999962,7.25265503 Z M6.66568358,8.69999981 L12.2656836,8.69999981 C12.3761405,8.69999981 12.4656836,8.78954286 12.4656836,8.89999981 L12.4656836,10.1499998 C12.4656836,10.2604567 12.3761405,10.3499998 12.2656836,10.3499998 L6.66568358,10.3499998 C6.55522663,10.3499998 6.46568358,10.2604567 6.46568358,10.1499998 L6.46568358,8.89999981 C6.46568358,8.78954286 6.55522663,8.69999981 6.66568358,8.69999981 Z" transform="rotate(-45 9.463 9.5)"></path></svg>
				</a>
			</div>
			
			<div class="post-stats">
				<span class="views-count">
					<svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
						<circle cx="12" cy="12" r="3"></circle>
					</svg>
					<?php echo esc_html( get_views_count() ); ?> views
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
		<div class="related-posts-header">
			<h2><?php esc_html_e( 'Related Posts', 'obx-theme' ); ?></h2>
			<a href="<?php echo esc_url( get_permalink( get_option( 'page_for_posts' ) ) ); ?>" class="see-all-link"><?php esc_html_e( 'See All', 'obx-theme' ); ?></a>
		</div>
		<div class="related-posts-grid">
			<?php
			$related_posts = get_related_posts();
			foreach ( $related_posts as $post ) :
				setup_postdata( $post );
				$post_id = get_the_ID();
				$permalink = get_permalink();
				$thumbnail = get_the_post_thumbnail_url($post_id, 'medium_large');
				?>
				<article class="related-post">
					<div class="related-post__image-container">
						<div class="related-post__stats">
							<span class="related-post__views">
								<svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
									<circle cx="12" cy="12" r="3"></circle>
								</svg>
								<?php echo esc_html(get_views_count()); ?>
							</span>
							<span class="related-post__likes">
								<svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="<?php echo has_user_liked_post() ? '#ff4757' : 'none'; ?>" stroke="#ff4757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
								</svg>
								<?php echo esc_html(get_likes_count()); ?>
							</span>
						</div>
						<?php if ($thumbnail) : ?>
							<img src="<?php echo esc_url($thumbnail); ?>" alt="<?php the_title_attribute(); ?>" class="related-post__image">
						<?php else : ?>
							<div class="related-post__image-placeholder"></div>
						<?php endif; ?>
					</div>
					<div class="related-post__content">
						<h3 class="related-post__title">
							<a href="<?php echo esc_url($permalink); ?>"><?php the_title(); ?></a>
						</h3>
						<a href="<?php echo esc_url($permalink); ?>" class="related-post__read-more">Read More</a>
					</div>
				</article>
			<?php
			endforeach;
			wp_reset_postdata();
			?>
		</div>
	</section>
<?php endif; ?>