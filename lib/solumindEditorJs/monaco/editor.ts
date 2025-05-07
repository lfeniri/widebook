/**
 * Monaco Editor integration for SolumindEditor
 */

import { loadMonaco, isMonacoEditorLoaded } from './loader';

// Define types for window Monaco
interface WindowWithMonaco extends Window {
  monaco: any;
  require: any;
}

// Type for Monaco editor instance
export interface MonacoEditorInstance {
  editor: any;
  getValue: () => string;
  setValue: (value: string) => void;
  onDidChangeModelContent: (callback: (e: any) => void) => void;
}

// Supported languages in Monaco
export type MonacoLanguage = 'html' | 'css' | 'javascript';

/**
 * Create a Monaco editor instance
 */
export function createMonacoEditor(
  container: HTMLElement,
  language: string,
  initialValue: string,
  onChange?: (value: string) => void
): Promise<MonacoEditorInstance> {
  return new Promise((resolve) => {
    // Use our unified Monaco loader
    loadMonaco(() => {
      const instance = createMonacoInstance(container, language, initialValue, onChange);
      if (instance) {
        resolve(instance);
      }
    });
  });
}

/**
 * Create Monaco editor instance
 */
function createMonacoInstance(
  container: HTMLElement,
  language: string,
  initialValue: string,
  onChange?: (value: string) => void
): MonacoEditorInstance | null {
  const win = window as unknown as WindowWithMonaco;
  
  if (!win.monaco) return null;
  
  const languageMap: Record<string, string> = {
    'html': 'html',
    'css': 'css',
    'js': 'javascript',
    'javascript': 'javascript'
  };
  
  const editor = win.monaco.editor.create(container, {
    value: initialValue,
    language: languageMap[language] || language,
    theme: 'vs-dark',
    automaticLayout: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 14,
    tabSize: 2,
    wordWrap: 'on',
    contextmenu: true,
    lineNumbers: 'on',
    folding: true,
    renderIndentGuides: true,
  });

  // Add change listener if provided
  if (onChange) {
    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
    });
  }
  
  // Return a simplified interface
  return {
    editor,
    getValue: () => editor.getValue(),
    setValue: (value: string) => editor.setValue(value),
    onDidChangeModelContent: (callback: (e: any) => void) => editor.onDidChangeModelContent(callback)
  };
}
