// WordPress dependencies
const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { 
  InspectorControls, 
  PanelColorSettings 
} = wp.blockEditor;
const { 
  PanelBody, 
  PanelRow, 
  ToggleControl, 
  TextControl 
} = wp.components;
const { registerBlockStyle } = wp.blocks;

// Initialize editor customizations
document.addEventListener('DOMContentLoaded', function() {
  console.log('OBX Theme: Editor scripts initialized');
});

// Register custom block styles
document.addEventListener('DOMContentLoaded', function() {
  if (wp && wp.blocks && wp.blocks.registerBlockStyle) {
    // Register custom paragraph style
    registerBlockStyle('core/paragraph', {
      name: 'highlight',
      label: 'Highlight'
    });
    
    // Register custom button style
    registerBlockStyle('core/button', {
      name: 'outline',
      label: 'Outline'
    });
  }
});

/**
 * Add custom attributes to core/heading block
 */
function addHeadingAttributes(settings, name) {
  // Only add attributes to core/heading block
  if (name !== 'core/heading') {
    return settings;
  }

  // Add custom attributes
  return {
    ...settings,
    attributes: {
      ...settings.attributes,
      showInToc: {
        type: 'boolean',
        default: true,
      },
      titleInToc: {
        type: 'string',
        default: '',
      },
    },
  };
}

// Add the custom attributes to core/heading
addFilter(
  'blocks.registerBlockType',
  'obx-theme/heading-attributes',
  addHeadingAttributes
);

/**
 * Add custom controls to the Inspector Controls panel
 */
const withTocControls = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    // Only add controls to core/heading block
    if (props.name !== 'core/heading') {
      return <BlockEdit {...props} />;
    }

    const { attributes, setAttributes } = props;
    const { showInToc, titleInToc, anchor, content } = attributes;

    // Make sure heading has an anchor if it's shown in TOC
    const ensureAnchor = () => {
      if (content) {
        // Generate slug from content
        const slug = content
          .toString()
          .toLowerCase()
          .replace(/[^a-z0-9 -]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-');
        
        // Set the anchor attribute if it doesn't exist or if we should update it
        if (!anchor || (shouldUpdateAnchor && anchor !== slug)) {
          setAttributes({ anchor: slug });
        }
      }
    };
    
    // Track if we should auto-update the anchor
    // This is true when no anchor exists or when the anchor was auto-generated
    const [shouldUpdateAnchor, setShouldUpdateAnchor] = wp.element.useState(!anchor || (anchor && content && anchor === content.toString().toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')));
    
    // When content changes, update anchor if appropriate
    wp.element.useEffect(() => {
      if (showInToc && shouldUpdateAnchor) {
        ensureAnchor();
      }
    }, [content]);
    
    // When the component mounts or updates, ensure anchor if needed
    if (showInToc && content && !anchor) {
      ensureAnchor();
    }

    return (
      <Fragment>
        <BlockEdit {...props} />
        <InspectorControls>
          <PanelBody
            title={__('Table of Contents Settings', 'obx-theme')}
            initialOpen={false}
          >
            <PanelRow>
              <ToggleControl
                label={__('Show in Table of Contents', 'obx-theme')}
                checked={showInToc}
                onChange={(value) => {
                  setAttributes({ showInToc: value });
                  // If turning on TOC visibility, ensure anchor exists
                  if (value) {
                    ensureAnchor();
                  }
                }}
                help={
                  showInToc
                    ? __('This heading will appear in the Table of Contents.', 'obx-theme')
                    : __('This heading will not appear in the Table of Contents.', 'obx-theme')
                }
              />
            </PanelRow>
            {showInToc && (
              <>
                <PanelRow>
                  <TextControl
                    label={__('Alternative TOC Title', 'obx-theme')}
                    value={titleInToc}
                    onChange={(value) => setAttributes({ titleInToc: value })}
                    help={__('Custom text to display in the Table of Contents. Leave empty to use the heading text.', 'obx-theme')}
                  />
                </PanelRow>
                <PanelRow>
                  <ToggleControl
                    label={__('Auto-update anchor', 'obx-theme')}
                    checked={shouldUpdateAnchor}
                    onChange={(value) => setShouldUpdateAnchor(value)}
                    help={
                      shouldUpdateAnchor
                        ? __('Anchor will update automatically when heading changes.', 'obx-theme')
                        : __('Anchor will remain fixed when heading changes.', 'obx-theme')
                    }
                  />
                </PanelRow>
              </>
            )}
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  };
}, 'withTocControls');

// Add the custom controls to the editor
addFilter(
  'editor.BlockEdit',
  'obx-theme/with-toc-controls',
  withTocControls
);

/**
 * Save the custom attributes
 */
const saveHeadingAttributes = (extraProps, blockType, attributes) => {
  // Only add props to core/heading block
  if (blockType.name !== 'core/heading') {
    return extraProps;
  }

  const { showInToc, titleInToc } = attributes;

  // Add custom attributes as data attributes
  // Use string values for data attributes to ensure they're properly set in HTML
  extraProps['data-show-in-toc'] = showInToc === false ? 'false' : 'true';
  
  if (titleInToc) {
    extraProps['data-title-in-toc'] = titleInToc;
  }

  // Ensure anchors are reflected in the HTML id attribute
  if (attributes.anchor && !extraProps.id) {
    extraProps.id = attributes.anchor;
  }

  return extraProps;
};

// Add custom attributes to saved block
addFilter(
  'blocks.getSaveContent.extraProps',
  'obx-theme/save-heading-attributes',
  saveHeadingAttributes
);