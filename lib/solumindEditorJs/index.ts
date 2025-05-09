/**
 * SolumindEditorJs Main Entry Point
 */

// Export React component
export { default as SolumindEditor } from './react/SolumindEditor';

// Export core editor for direct usage
export { createEditor } from './core/editor';

// Export core editor as default for convenience
export { createEditor as default } from './core/editor';

// Export types
export * from './types';

// Export managers
export * from './managers/componentManager';
export * from './managers/styleManager';
export * from './managers/codeManager';
export * from './managers/dragDropManager';
export * from './managers/panelsManager';
export * from './managers/historyManager';

// Export Lightweight Editor integration
export * from './light-editor';

// Export blocks
export * from './blocks';

// Export utility functions
export * from './utils/dom';
export * from './utils/css';
