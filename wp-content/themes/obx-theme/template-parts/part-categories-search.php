<div class="post-categories-search">
    <div class="post-categories-search__categories">
        <?php
        // Get the blog page URL
        $blog_page_url = get_permalink(get_option('page_for_posts'));
        
        $categories = get_categories(array(
            'orderby' => 'name',
            'order'   => 'ASC'
        ));
        
        if ($categories) {
            echo '<ul class="categories-list">';
            
            // Add "All posts" as the first item
            $current_class = is_home() ? ' class="current-cat"' : '';
            echo '<li' . $current_class . '><a href="' . esc_url($blog_page_url) . '">' . esc_html__('All posts', 'obx-theme') . '</a></li>';
            
            // Add categories
            foreach ($categories as $category) {
                $current_class = is_category($category->term_id) ? ' class="current-cat"' : '';
                echo '<li' . $current_class . '><a href="' . esc_url(get_category_link($category->term_id)) . '">' . esc_html($category->name) . '</a></li>';
            }
            
            echo '</ul>';
        }
        ?>
    </div>
    <div class="post-categories-search__search">
        <button class="search-toggle" aria-expanded="false" aria-label="<?php esc_attr_e('Toggle search', 'obx-theme'); ?>">
            <svg class="icon search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
        </button>
        <div class="search-form-container">
            <form role="search" method="get" class="search-form" action="<?php echo esc_url(home_url('/')); ?>">
                <span class="screen-reader-text"><?php echo _x('Search for:', 'label', 'obx-theme'); ?></span>
                <input type="search" class="search-field" placeholder="<?php echo esc_attr_x('Search articles...', 'placeholder', 'obx-theme'); ?>" value="<?php echo get_search_query(); ?>" name="s" />
                <input type="hidden" name="post_type" value="post" />
                <button type="submit" class="search-submit">
                    <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
            </form>
        </div>
    </div>
</div>