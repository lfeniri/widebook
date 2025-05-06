/**
 * Code Editor Manager for SolumindEditor
 */

import { SolumindEditor } from '../types';

export function setupCodeEditor(
  codeEditorContainer: HTMLElement,
  editor: SolumindEditor,
): void {
  // Keep track of the active tab
  let activeTab = 'html';

  // Initialize the code editor
  function initCodeEditor(): void {
    // Create code editor elements if they don't exist
    if (!codeEditorContainer.innerHTML) {
      createCodeEditorUI();
    }

    // Add event listeners
    setupEventListeners();
  }

  // Create the code editor UI
  function createCodeEditorUI(): void {
    // Create code editor content wrapper
    const codeEditorContent = document.createElement('div');
    codeEditorContent.className = 'solumind-code-editor-content';

    // Create tabs
    const tabs = document.createElement('div');
    tabs.className = 'solumind-code-editor-tabs';

    const htmlTab = document.createElement('button');
    htmlTab.className = 'solumind-tab active';
    htmlTab.textContent = 'HTML';
    htmlTab.setAttribute('data-tab', 'html');

    const cssTab = document.createElement('button');
    cssTab.className = 'solumind-tab';
    cssTab.textContent = 'CSS';
    cssTab.setAttribute('data-tab', 'css');

    const jsTab = document.createElement('button');
    jsTab.className = 'solumind-tab';
    jsTab.textContent = 'JS';
    jsTab.setAttribute('data-tab', 'js');

    const closeBtn = document.createElement('button');
    closeBtn.className = 'solumind-code-editor-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('title', 'Close');

    tabs.appendChild(htmlTab);
    tabs.appendChild(cssTab);
    tabs.appendChild(jsTab);
    tabs.appendChild(closeBtn);

    // Create editor areas
    const htmlEditor = createMonacoEditor('html');
    const cssEditor = createMonacoEditor('css');
    const jsEditor = createMonacoEditor('js');

    // Initially show HTML editor
    cssEditor.style.display = 'none';
    jsEditor.style.display = 'none';

    // Create apply button
    const applyBtn = document.createElement('button');
    applyBtn.className = 'solumind-code-editor-apply';
    applyBtn.textContent = 'Apply Changes';

    // Create bottom controls
    const bottomControls = document.createElement('div');
    bottomControls.className = 'solumind-code-editor-controls';
    bottomControls.appendChild(applyBtn);

    // Add format button if Monaco is used
    const formatBtn = document.createElement('button');
    formatBtn.className = 'solumind-code-editor-format';
    formatBtn.textContent = 'Format Code';
    bottomControls.appendChild(formatBtn);

    // Assemble code editor
    codeEditorContent.appendChild(tabs);
    codeEditorContent.appendChild(htmlEditor);
    codeEditorContent.appendChild(cssEditor);
    codeEditorContent.appendChild(jsEditor);
    codeEditorContent.appendChild(bottomControls);

    // Add to container
    codeEditorContainer.appendChild(codeEditorContent);
  }

  // Create a Monaco editor (or fallback to textarea)
  function createMonacoEditor(mode: 'html' | 'css' | 'js'): HTMLElement {
    // Try to load Monaco if available
    if (typeof window !== 'undefined' && window.monaco) {
      // Create container for Monaco
      const container = document.createElement('div');
      container.className = `solumind-monaco-editor ${mode}-editor`;
      container.setAttribute('data-mode', mode);

      // Create Monaco editor instance
      try {
        // This will be called later after Monaco is loaded
        setTimeout(() => {
          createMonacoInstance(container, mode);
        }, 0);
        return container;
      } catch (e) {
        console.error('Failed to create Monaco editor:', e);
        // Fall back to textarea
        return createTextareaEditor(mode);
      }
    } else {
      // Load Monaco script if it doesn't exist
      loadMonaco();
      // Fall back to textarea while loading
      return createTextareaEditor(mode);
    }
  }

  // Create a Monaco editor instance
  function createMonacoInstance(container: HTMLElement, mode: 'html' | 'css' | 'js'): void {
    if (!window.monaco) return;

    // Map mode to Monaco language
    const languageMap = {
      html: 'html',
      css: 'css',
      js: 'javascript',
    };

    // Get initial content
    let content = '';
    switch (mode) {
      case 'html':
        content = editor.getHtml();
        break;
      case 'css':
        content = editor.getCss();
        break;
      case 'js':
        content = editor.getJs();
        break;
    }

    // Create editor
    const monacoEditor = window.monaco.editor.create(container, {
      value: content,
      language: languageMap[mode],
      theme: 'vs-dark',
      automaticLayout: true,
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      fontSize: 14,
      tabSize: 2,
      wordWrap: 'on',
      contextmenu: true,
      lineNumbers: 'on',
      folding: true,
      renderIndentGuides: true,
    });

    // Store the editor instance on the container
    (container as any).monacoEditor = monacoEditor;
  }

  // Create a textarea editor as fallback
  function createTextareaEditor(mode: 'html' | 'css' | 'js'): HTMLElement {
    const textarea = document.createElement('textarea');
    textarea.className = `solumind-code-editor-textarea ${mode}-editor`;
    textarea.setAttribute('data-mode', mode);
    textarea.spellcheck = false;
    textarea.wrap = 'off';

    // Get initial content
    switch (mode) {
      case 'html':
        textarea.value = editor.getHtml();
        break;
      case 'css':
        textarea.value = editor.getCss();
        break;
      case 'js':
        textarea.value = editor.getJs();
        break;
    }

    return textarea;
  }

  // Load Monaco editor dynamically
  function loadMonaco(): void {
    if (typeof window === 'undefined' || document.getElementById('monaco-loader')) return;

    // Add loader script
    const script = document.createElement('script');
    script.id = 'monaco-loader';
    script.src = 'https://unpkg.com/monaco-editor@latest/min/vs/loader.js';
    script.async = true;

    script.onload = () => {
      // Configure require
      (window as any).require.config({
        paths: {
          vs: 'https://unpkg.com/monaco-editor@latest/min/vs',
        },
      });

      // Load Monaco
      (window as any).require(['vs/editor/editor.main'], () => {
        // Replace textareas with Monaco editors
        const textareas = codeEditorContainer.querySelectorAll('.solumind-code-editor-textarea');
        textareas.forEach((textarea) => {
          const mode = textarea.getAttribute('data-mode') as 'html' | 'css' | 'js';
          const content = (textarea as HTMLTextAreaElement).value;

          // Create container
          const container = document.createElement('div');
          container.className = `solumind-monaco-editor ${mode}-editor`;
          container.setAttribute('data-mode', mode);

          // Replace textarea with container
          textarea.parentNode!.insertBefore(container, textarea);
          textarea.parentNode!.removeChild(textarea);

          // Create Monaco editor
          createMonacoInstance(container, mode);
        });
      });
    };

    document.head.appendChild(script);
  }

  // Set up event listeners
  function setupEventListeners(): void {
    // Tab switching
    const tabs = codeEditorContainer.querySelectorAll('.solumind-tab');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const tabMode = tab.getAttribute('data-tab') as 'html' | 'css' | 'js';
        switchTab(tabMode);
      });
    });

    // Close button
    const closeBtn = codeEditorContainer.querySelector('.solumind-code-editor-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        editor.closeCodeEditor();
      });
    }

    // Apply button
    const applyBtn = codeEditorContainer.querySelector('.solumind-code-editor-apply');
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        applyChanges();
      });
    }

    // Format button
    const formatBtn = codeEditorContainer.querySelector('.solumind-code-editor-format');
    if (formatBtn) {
      formatBtn.addEventListener('click', () => {
        formatCode();
      });
    }
  }

  // Switch between tabs
  function switchTab(mode: 'html' | 'css' | 'js'): void {
    activeTab = mode;

    // Update tab buttons
    const tabs = codeEditorContainer.querySelectorAll('.solumind-tab');
    tabs.forEach((tab) => {
      if (tab.getAttribute('data-tab') === mode) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Update visible editor
    const editors = codeEditorContainer.querySelectorAll('.solumind-monaco-editor, .solumind-code-editor-textarea');
    editors.forEach((editorElement) => {
      if (editorElement.classList.contains(`${mode}-editor`)) {
        editorElement.style.display = 'block';
      } else {
        editorElement.style.display = 'none';
      }
    });
  }

  // Apply code changes
  function applyChanges(): void {
    // Get editor content
    let htmlContent = getEditorContent('html');
    let cssContent = getEditorContent('css');
    let jsContent = getEditorContent('js');

    // Update editor with new content
    editor.setComponents(htmlContent);
    editor.setStyle(cssContent);

    // Show success notification
    showNotification('Changes applied successfully!', 'success');
  }

  // Get content from editor (Monaco or textarea)
  function getEditorContent(mode: 'html' | 'css' | 'js'): string {
    // Try Monaco first
    const monacoEditorContainer = codeEditorContainer.querySelector(`.solumind-monaco-editor.${mode}-editor`);
    if (monacoEditorContainer && (monacoEditorContainer as any).monacoEditor) {
      return (monacoEditorContainer as any).monacoEditor.getValue();
    }

    // Fall back to textarea
    const textarea = codeEditorContainer.querySelector(`.solumind-code-editor-textarea.${mode}-editor`) as HTMLTextAreaElement;
    if (textarea) {
      return textarea.value;
    }

    // Default to empty string
    return '';
  }

  // Format code using Monaco's formatter
  function formatCode(): void {
    // Check if Monaco is available
    const monacoEditorContainer = codeEditorContainer.querySelector(`.solumind-monaco-editor.${activeTab}-editor`);
    if (monacoEditorContainer && (monacoEditorContainer as any).monacoEditor && window.monaco) {
      const monacoEditor = (monacoEditorContainer as any).monacoEditor;
      
      // Format using Monaco
      monacoEditor.getAction('editor.action.formatDocument').run().then(() => {
        showNotification('Code formatted', 'success');
      });
    } else {
      showNotification('Code formatting is only available with Monaco editor', 'warning');
    }
  }

  // Show notification
  function showNotification(message: string, type: 'success' | 'warning' | 'error'): void {
    const notification = document.createElement('div');
    notification.className = `solumind-notification solumind-notification-${type}`;
    notification.textContent = message;

    // Add to body
    document.body.appendChild(notification);

    // Remove after delay
    setTimeout(() => {
      notification.classList.add('solumind-notification-hide');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Update code editor when content changes
  function updateCodeEditorContent(): void {
    // Update HTML content
    updateEditorContent('html', editor.getHtml());
    
    // Update CSS content
    updateEditorContent('css', editor.getCss());
    
    // Update JS content
    updateEditorContent('js', editor.getJs());
  }

  // Update specific editor content
  function updateEditorContent(mode: 'html' | 'css' | 'js', content: string): void {
    // Try Monaco first
    const monacoEditorContainer = codeEditorContainer.querySelector(`.solumind-monaco-editor.${mode}-editor`);
    if (monacoEditorContainer && (monacoEditorContainer as any).monacoEditor) {
      (monacoEditorContainer as any).monacoEditor.setValue(content);
      return;
    }

    // Fall back to textarea
    const textarea = codeEditorContainer.querySelector(`.solumind-code-editor-textarea.${mode}-editor`) as HTMLTextAreaElement;
    if (textarea) {
      textarea.value = content;
    }
  }

  // Listen for content updates
  editor.on('update', () => {
    updateCodeEditorContent();
  });

  // Listen for code editor open events
  editor.on('code:editor:opened', () => {
    // Make sure the code editor is visible
    codeEditorContainer.style.display = 'block';
    
    // Update content
    updateCodeEditorContent();
  });

  // Listen for code editor close events
  editor.on('code:editor:closed', () => {
    codeEditorContainer.style.display = 'none';
  });

  // Initialize the code editor
  initCodeEditor();
}

// Add Monaco type for TypeScript
declare global {
  interface Window {
    monaco?: any;
    require?: any;
  }
}
