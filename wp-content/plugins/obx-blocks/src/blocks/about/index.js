/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import metadata from './block.json';
import './style.scss';

/**
 * Register block
 */
registerBlockType(metadata.name, {
    ...metadata,
    edit: Edit,
    save: () => null, // Server-side rendered
}); 