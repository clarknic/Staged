<?php
/**
 * Template part for displaying posts in a grid
 *
 * @package OBX_Theme
 */

$post_id = get_the_ID();
$thumbnail = get_the_post_thumbnail_url($post_id, 'medium_large');
$categories = get_the_category();
$permalink = get_permalink();
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('post-card'); ?>>
    <div class="post-card__image-container">
        <div class="post-card__stats">
            <span class="post-card__views">
                <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <?php echo esc_html(get_views_count()); ?>
            </span>
            <span class="post-card__likes">
                <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="<?php echo has_user_liked_post() ? '#ff4757' : 'none'; ?>" stroke="#ff4757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <?php echo esc_html(get_likes_count()); ?>
            </span>
        </div>
        
        <?php if ($thumbnail) : ?>
            <img src="<?php echo esc_url($thumbnail); ?>" alt="<?php the_title_attribute(); ?>" class="post-card__image">
        <?php else : ?>
            <div class="post-card__image post-card__image--placeholder"></div>
        <?php endif; ?>
        
        <?php if (!empty($categories)) : ?>
            <div class="post-card__categories">
                <?php foreach ($categories as $category) : ?>
                    <span class="post-card__category"><?php echo esc_html($category->name); ?></span>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
    
    <div class="post-card__content">
        <h2 class="post-card__title">
            <a href="<?php echo esc_url($permalink); ?>"><?php the_title(); ?></a>
        </h2>
        <div class="post-card__meta">
            <span class="author-info">
                <span class="author-avatar-wrapper">
                    <img width="32" height="32" src="<?php echo esc_url(get_avatar_url(get_the_author_meta('ID'))); ?>" alt="<?php echo esc_attr(get_the_author()); ?>" class="author-avatar">
                </span>
                <a href="<?php echo esc_url(get_author_posts_url(get_the_author_meta('ID'))); ?>" title="Post by <?php echo esc_attr(get_the_author()); ?>" class="author-name"><?php echo esc_html(get_the_author_meta('display_name')); ?></a>
            </span>
            <?php
            $posted_on = get_the_date('M j'); ?>
            <span class="posted-on"><?php echo $posted_on; ?></span>
            <span class="reading-time"><?php echo esc_html(get_reading_time()); ?></span>
        </div>
        <div class="post-card__excerpt">
            <?php echo wp_trim_words(get_the_excerpt(), 20, '...'); ?>
        </div>
        <a href="<?php echo esc_url($permalink); ?>" class="post-card__read-more">Read More</a>
    </div>
</article> 