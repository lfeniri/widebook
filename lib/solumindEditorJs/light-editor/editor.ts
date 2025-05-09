/**
 * CodeMirror Editor for SolumindEditor
 * A lightweight alternative to Monaco Editor
 */

import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { html as htmlLanguage } from '@codemirror/lang-html';
import { css as cssLanguage } from '@codemirror/lang-css';
import { javascript as javascriptLanguage } from '@codemirror/lang-javascript';
import { indentWithTab } from '@codemirror/commands';
import { keymap } from '@codemirror/view';
import { basicSetup } from 'codemirror';

export type CodeEditorLanguage = 'html' | 'css' | 'js';

export interface LightCodeEditorInstance {
  getValue: () => string;
  setValue: (content: string) => void;
  formatCode?: () => void;
  setJs: (content: string) => void; // Required method for JavaScript code consistency
  destroy: () => void;
}

// Map language to CodeMirror language support
function getLanguageSupport(language: CodeEditorLanguage) {
  switch (language) {
    case 'html':
      return htmlLanguage();
    case 'css':
      return cssLanguage();
    case 'js':
      return javascriptLanguage();
    default:
      return htmlLanguage();
  }
}

/**
 * Create a new CodeMirror editor
 */
export function createLightCodeEditor(
  container: HTMLElement,
  options: {
    value?: string;
    language?: CodeEditorLanguage;
    theme?: string;
    readOnly?: boolean;
    onChange?: (content: string) => void;
  } = {}
): LightCodeEditorInstance {
  const {
    value = '',
    language = 'html',
    readOnly = false,
    onChange,
  } = options;

  // Create editor state
  const state = EditorState.create({
    doc: value,
    extensions: [
      basicSetup,
      getLanguageSupport(language),
      keymap.of([indentWithTab]),
      EditorView.editable.of(!readOnly),
      EditorView.updateListener.of((update) => {
        if (update.docChanged && onChange) {
          onChange(update.state.doc.toString());
        }
      }),
    ],
  });
  // Create editor view
  const view = new EditorView({
    state,
    parent: container,
  });
  
  // Return editor instance interface
  return {
    getValue: () => view.state.doc.toString(),
    setValue: (content: string) => {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: content },
      });
    },
    formatCode: () => {
      const content = view.state.doc.toString();
      let formattedContent = content;
      
      // Use our pretty printers depending on the language
      switch (language) {
        case 'html':
          formattedContent = prettyPrinters.html(content);
          break;
        case 'css':
          formattedContent = prettyPrinters.css(content);
          break;
        case 'js':
          formattedContent = prettyPrinters.js(content);
          break;
      }
      
      // Update the editor with formatted content
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: formattedContent },
      });
    },
    // Implement setJs method for all editor instances for consistency with SolumindEditor interface
    setJs: (content: string) => {
      // Only update content if this is a JS editor
      if (language === 'js') {
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: content },
        });
      }
    },
    destroy: () => view.destroy(),
  };
}

/**
 * Pretty print functions for different languages
 */
export const prettyPrinters = {
  html: (code: string): string => {
    // Simple HTML beautifier
    let formatted = '';
    let indent = 0;
    
    // Split on tags
    const tags = code.split(/(<\/?[^>]+>)/g);
    
    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i].trim();
      if (!tag) continue;
      
      // Check if closing tag
      if (tag.indexOf('</') === 0) {
        indent--;
      }
      
      // Add line with proper indentation
      formatted += '\n' + ' '.repeat(indent * 2) + tag;
      
      // Check if opening tag (but not self-closing)
      if (tag.indexOf('<') === 0 && 
          tag.indexOf('/>') === -1 && 
          tag.indexOf('</') !== 0 && 
          tag.indexOf('<br') !== 0 && 
          tag.indexOf('<img') !== 0 && 
          tag.indexOf('<input') !== 0 && 
          tag.indexOf('<hr') !== 0 && 
          tag.indexOf('<meta') !== 0) {
        indent++;
      }
    }
    
    return formatted.trim();
  },
  
  css: (code: string): string => {
    // Simple CSS beautifier
    let css = code;
    // Remove all whitespace
    css = css.replace(/\s+/g, ' ').trim();
    
    // Add newline after each rule
    css = css.replace(/}/g, '}\n');
    
    // Add newline and indent after opening brace
    css = css.replace(/{/g, '{\n  ');
    
    // Add newline before closing brace and indent property lines
    css = css.replace(/;/g, ';\n  ');
    
    // Fix closing brace indentation
    css = css.replace(/\n  }/g, '\n}');
    
    // Ensure good spacing for selectors
    css = css.replace(/}\n/g, '}\n\n');
    
    return css.trim();
  },
  
  js: (code: string): string => {
    // Simple JS beautifier
    let formatted = '';
    let indent = 0;
    let inString = false;
    let stringChar = '';
    
    for (let i = 0; i < code.length; i++) {
      const char = code[i];
      
      // Handle strings
      if ((char === '"' || char === "'" || char === '`') && code[i-1] !== '\\') {
        if (inString && char === stringChar) {
          inString = false;
          stringChar = '';
        } else if (!inString) {
          inString = true;
          stringChar = char;
        }
      }
      
      // Skip formatting inside strings
      if (inString) {
        formatted += char;
        continue;
      }
      
      if (char === '{' || char === '[') {
        formatted += char;
        indent++;
        formatted += '\n' + ' '.repeat(indent * 2);
      } else if (char === '}' || char === ']') {
        indent--;
        formatted += '\n' + ' '.repeat(indent * 2) + char;
      } else if (char === ';') {
        formatted += char;
        formatted += '\n' + ' '.repeat(indent * 2);
      } else if (char === '\n') {
        formatted += '\n' + ' '.repeat(indent * 2);
      } else {
        formatted += char;
      }
    }
    
    return formatted.replace(/\n\s*\n/g, '\n').trim();
  }
};
