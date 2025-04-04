<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package OBX_Theme
 */

?>
		</div><!-- .container -->
	</div><!-- #content -->

	<footer id="colophon" class="site-footer">
		<div class="site-footer__container">
			<div class="site-footer__content">
				
				<a href="#top" class="site-footer__scroll-top" aria-label="<?php esc_attr_e('Scroll to top', 'obx-theme'); ?>">
				<svg preserveAspectRatio="none" data-bbox="19.999 58 160.001 84" viewBox="19.999 58 160.001 84" height="200" width="200" xmlns="http://www.w3.org/2000/svg" data-type="shape" role="presentation" aria-hidden="true">
					<g>
						<path d="M172.5 142a7.485 7.485 0 0 1-5.185-2.073L100 75.808l-67.315 64.12c-2.998 2.846-7.74 2.744-10.606-.234a7.454 7.454 0 0 1 .235-10.565l72.5-69.057a7.524 7.524 0 0 1 10.371 0l72.5 69.057a7.455 7.455 0 0 1 .235 10.565A7.503 7.503 0 0 1 172.5 142z"></path>
					</g>
				</svg>
				</a>
				
				<div class="site-footer__logo">
					<?php 
					$footer_logo_id = get_theme_mod('footer_logo');
					if ($footer_logo_id) {
						$footer_logo_attr = array(
							'class' => 'footer-logo',
							'alt'   => get_bloginfo('name') . ' ' . __('Footer Logo', 'obx-theme')
						);
						echo wp_get_attachment_image($footer_logo_id, 'full', false, $footer_logo_attr);
					} elseif (has_custom_logo()) {
						the_custom_logo();
					}
					?>
				</div>

				<div class="site-footer__services">
					<?php echo esc_html(get_theme_mod('footer_services', 'Home Staging | Design | Organization | Photography')); ?>
				</div>

				<div class="site-footer__location">
					<?php echo esc_html(get_theme_mod('footer_location', 'Virginia Beach, Norfolk & Hampton Roads')); ?>
				</div>

				<div class="site-footer__email">
					<a href="mailto:<?php echo esc_attr(get_theme_mod('footer_email', 'info@stagedllc.com')); ?>">
						<?php echo esc_html(get_theme_mod('footer_email', 'info@stagedllc.com')); ?>
					</a>
				</div>

				<div class="site-footer__cta">
					<a href="<?php echo esc_url(get_theme_mod('footer_cta_url', '#')); ?>" class="button">
						<?php echo esc_html(get_theme_mod('footer_cta_text', 'BOOK A CALL')); ?>
					</a>
				</div>

				<div class="site-footer__copyright">
					©<?php echo esc_html(date('Y')); ?> <?php echo esc_html(get_theme_mod('footer_company_name', 'Staged, LLC')); ?>
				</div>
			</div>
		</div>
	</footer>
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html> 