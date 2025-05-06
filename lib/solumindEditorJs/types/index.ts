/**
 * Main types for solumindEditorJs library
 */

// Editor Config Interface
export interface SolumindEditorConfig {
  container: HTMLElement | string;
  height?: string;
  width?: string;
  components?: string;
  style?: string;
  plugins?: string[];
  pluginsOpts?: Record<string, any>;
  blockManager?: BlockManagerConfig;
  panels?: PanelsConfig;
  canvas?: CanvasConfig;
  storageManager?: StorageManagerConfig | false;
  customBlocks?: CustomBlock[];
  customComponents?: CustomComponent[];
  customStyleManager?: CustomStyleManagerConfig;
  onUpdate?: (data: EditorOutput) => void;
}

// Editor Output Interface
export interface EditorOutput {
  html: string;
  css: string;
  js?: string;
  components?: Record<string, any>; // Raw components data for editor state
}

// Canvas Config Interface
export interface CanvasConfig {
  styles?: string[];
  scripts?: string[];
}

// Storage Manager Config Interface
export interface StorageManagerConfig {
  id?: string;
  autosave?: boolean;
  autoload?: boolean;
  type?: 'local' | 'remote';
  stepsBeforeSave?: number;
}

// Block Manager Config Interface
export interface BlockManagerConfig {
  appendTo?: HTMLElement | string;
  blocks?: Block[];
}

// Block Interface
export interface Block {
  id: string;
  label: string;
  category?: string;
  content: string;
  attributes?: Record<string, any>;
  media?: string;
}

// Custom Block Interface
export interface CustomBlock extends Block {
  render?: () => HTMLElement;
  onDragStart?: (event: DragEvent) => void;
  onDragEnd?: (event: DragEvent) => void;
}

// Custom Component Interface
export interface CustomComponent {
  id: string;
  label: string;
  component: any; // React component or other framework component
  props?: Record<string, any>;
  isNextJs?: boolean;
  edit?: (props: Record<string, any>) => void;
}

// Panels Config Interface
export interface PanelsConfig {
  defaults?: Panel[];
}

// Panel Interface
export interface Panel {
  id: string;
  buttons?: PanelButton[];
}

// Panel Button Interface
export interface PanelButton {
  id: string;
  className?: string;
  command?: string | ((editor: any) => void);
  attributes?: Record<string, any>;
  active?: boolean;
}

// Custom Style Manager Config Interface
export interface CustomStyleManagerConfig {
  sectors?: StyleSector[];
}

// Style Sector Interface
export interface StyleSector {
  id: string;
  name: string;
  open?: boolean;
  properties?: StyleProperty[];
}

// Style Property Interface
export interface StyleProperty {
  id: string;
  name: string;
  type: 'number' | 'color' | 'select' | 'slider' | 'text' | 'radio' | 'checkbox' | 'composite';
  units?: string[];
  defaults?: string | number | boolean;
  options?: { id: string; label: string }[];
}

// Editor Instance Interface
export interface SolumindEditor {
  getHtml: () => string;
  getCss: () => string;
  getJs: () => string;
  setComponents: (components: string) => void;
  setStyle: (style: string) => void;
  getWrapper: () => any;
  getContainer: () => HTMLElement;
  addPanel: (panel: Panel) => any;
  addBlock: (block: Block | CustomBlock) => any;
  addComponent: (component: CustomComponent) => any;
  on: (event: string, callback: (...args: any[]) => void) => void;
  off: (event: string, callback: (...args: any[]) => void) => void;
  trigger: (event: string, ...args: any[]) => void;
  destroy: () => void;
  render: () => void;
  getState: () => EditorOutput;
  loadState: (state: EditorOutput) => void;
  togglePreview: () => void;
  isInPreviewMode: () => boolean;
  openCodeEditor: () => void;
  closeCodeEditor: () => void;
  registerCustomBlock: (block: CustomBlock) => void;
  registerCustomComponent: (component: CustomComponent) => void;
}

// Events
export const EDITOR_EVENTS = {
  UPDATE: 'update',
  COMPONENT_SELECTED: 'component:selected',
  COMPONENT_ADDED: 'component:added',
  COMPONENT_REMOVED: 'component:removed',
  BLOCK_ADDED: 'block:added',
  BLOCK_REMOVED: 'block:removed',
  STYLE_CHANGED: 'style:changed',
  PREVIEW_TOGGLED: 'preview:toggled',
  CODE_EDITOR_OPENED: 'code:editor:opened',
  CODE_EDITOR_CLOSED: 'code:editor:closed',
  UNDO: 'undo',
  REDO: 'redo',
};
