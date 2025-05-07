/**
 * SolumindEditor core implementation adapter
 * This file provides a compatible API while delegating to the solumindEditorJs library
 */

// Import the editor from the library
import { createSolumindEditor as libCreateSolumindEditor } from '../../lib/solumindEditorJs';

/**
 * Create a Solumind Editor instance with the provided configuration
 */
export function createSolumindEditor(config: any) {
  // Simply delegate to the library implementation
  return libCreateSolumindEditor(config);
}