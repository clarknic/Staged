<?php
/**
 * Template part for displaying posts in search results
 *
 * @package OBX_Theme
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('search-result-item'); ?>>
    <div class="search-result-item__image">
        <?php if (has_post_thumbnail()) : ?>
            <a href="<?php the_permalink(); ?>" class="post-thumbnail">
                <?php the_post_thumbnail('medium'); ?>
            </a>
        <?php else : ?>
            <a href="<?php the_permalink(); ?>" class="post-thumbnail no-image">
                <div class="placeholder-image">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                </div>
            </a>
        <?php endif; ?>
        
        <div class="post-stats">
            <span class="views-count">
                <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <?php echo esc_html(get_views_count()); ?>
            </span>
            <span class="likes-count">
                <svg class="icon like-button <?php echo has_user_liked_post() ? 'liked' : ''; ?>" 
                     data-post-id="<?php the_ID(); ?>" 
                     width="16" height="16" 
                     viewBox="0 0 24 24" 
                     fill="<?php echo has_user_liked_post() ? '#c4a468' : 'none'; ?>" 
                     stroke="#c4a468" 
                     stroke-width="2" 
                     stroke-linecap="round" 
                     stroke-linejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span class="count"><?php echo esc_html(get_likes_count()); ?></span>
            </span>
        </div>
    </div>
    
    <div class="search-result-item__content">
        <div class="post-meta">
            <div class="author-meta">
                <div class="author-avatar">
                    <?php echo get_avatar(get_the_author_meta('ID'), 40); ?>
                </div>
                <div class="author-details">
                    <div class="author-name">
                        <?php the_author_posts_link(); ?>
                    </div>
                    <div class="post-details">
                        <span class="post-date"><?php echo get_the_date(); ?></span>
                        <span class="reading-time-divider">·</span>
                        <span class="reading-time"><?php echo get_reading_time(); ?></span>
                    </div>
                </div>
            </div>
        </div>
        
        <h2 class="entry-title">
            <a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a>
        </h2>
        
        <div class="entry-summary">
            <?php the_excerpt(); ?>
        </div>
    </div>
</article> 