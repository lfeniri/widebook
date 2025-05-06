/**
 * SolumindEditor core implementation
 */

export function createSolumindEditor(config: any) {
  const container = typeof config.container === 'string' 
    ? document.querySelector(config.container) 
    : config.container;
  
  if (!container) {
    throw new Error('Container element not found');
  }

  // Initialize with provided content or empty strings
  let content = {
    html: config.components || '',
    css: config.style || '',
    js: config.script || ''
  };

  // Track event listeners
  const eventListeners: Record<string, Function[]> = {};

  // Create editor structure
  container.innerHTML = '';
  container.classList.add('solumind-editor');
  
  // Create main layout
  const createLayout = () => {
    // Create top bar
    const topBar = document.createElement('div');
    topBar.className = 'solumind-editor-topbar';
    
    // Create tabs
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'solumind-tabs';
    
    const createTab = (name: string, isActive: boolean = false) => {
      const tab = document.createElement('button');
      tab.className = `solumind-tab ${isActive ? 'active' : ''}`;
      tab.textContent = name;
      tab.dataset.tab = name.toLowerCase();
      return tab;
    };
    
    const htmlTab = createTab('HTML', true);
    const cssTab = createTab('CSS');
    const jsTab = createTab('JS');
    const previewTab = createTab('Preview');
    
    tabsContainer.appendChild(htmlTab);
    tabsContainer.appendChild(cssTab);
    tabsContainer.appendChild(jsTab);
    tabsContainer.appendChild(previewTab);
    
    // Create actions toolbar
    const actions = document.createElement('div');
    actions.className = 'solumind-actions';
    
    const runBtn = document.createElement('button');
    runBtn.className = 'solumind-button primary';
    runBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg> Run';
    runBtn.title = 'Execute the code and update preview';
    runBtn.id = 'solumind-run-button';
    
    const fullscreenBtn = document.createElement('button');
    fullscreenBtn.className = 'solumind-button';
    fullscreenBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/></svg>';
    fullscreenBtn.title = 'Toggle fullscreen mode';
    fullscreenBtn.id = 'solumind-fullscreen-button';
    
    actions.appendChild(runBtn);
    actions.appendChild(fullscreenBtn);
    
    topBar.appendChild(tabsContainer);
    topBar.appendChild(actions);
    
    // Create editor content
    const editorContent = document.createElement('div');
    editorContent.className = 'solumind-editor-content';
    
    // Create panels
    const createPanel = (type: string, isActive: boolean = false) => {
      const panel = document.createElement('div');
      panel.className = `solumind-panel ${isActive ? 'active' : ''}`;
      panel.dataset.panel = type;
      
      if (type !== 'preview') {
        const editor = document.createElement('textarea');
        editor.className = 'solumind-code-editor';
        editor.value = content[type as keyof typeof content] || '';
        editor.id = `solumind-${type}-editor`;
        editor.placeholder = `Enter ${type.toUpperCase()} code here`;
        editor.spellcheck = false;
        
        panel.appendChild(editor);
      } else {
        const previewContainer = document.createElement('div');
        previewContainer.className = 'solumind-preview-container';
        
        const previewIframe = document.createElement('iframe');
        previewIframe.className = 'solumind-preview-iframe';
        previewIframe.id = 'solumind-preview-iframe';
        previewIframe.title = 'Preview';
        
        previewContainer.appendChild(previewIframe);
        panel.appendChild(previewContainer);
      }
      
      return panel;
    };
    
    const htmlPanel = createPanel('html', true);
    const cssPanel = createPanel('css');
    const jsPanel = createPanel('js');
    const previewPanel = createPanel('preview');
    
    editorContent.appendChild(htmlPanel);
    editorContent.appendChild(cssPanel);
    editorContent.appendChild(jsPanel);
    editorContent.appendChild(previewPanel);
    
    // Add components to container
    container.appendChild(topBar);
    container.appendChild(editorContent);
  };
  
  // Create the layout
  createLayout();
  
  // Setup event handlers
  const setupEventHandlers = () => {
    // Get elements
    const tabs = container.querySelectorAll('.solumind-tab');
    const panels = container.querySelectorAll('.solumind-panel');
    const htmlEditor = document.getElementById('solumind-html-editor') as HTMLTextAreaElement;
    const cssEditor = document.getElementById('solumind-css-editor') as HTMLTextAreaElement;
    const jsEditor = document.getElementById('solumind-js-editor') as HTMLTextAreaElement;
    const runButton = document.getElementById('solumind-run-button');
    const fullscreenButton = document.getElementById('solumind-fullscreen-button');
    const previewIframe = document.getElementById('solumind-preview-iframe') as HTMLIFrameElement;
    
    // Tab switching logic
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabId = (tab as HTMLElement).dataset.tab;
        
        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show corresponding panel
        panels.forEach(panel => {
          if ((panel as HTMLElement).dataset.panel === tabId) {
            panel.classList.add('active');
          } else {
            panel.classList.remove('active');
          }
        });
        
        // If switching to preview tab, update the preview
        if (tabId === 'preview') {
          updatePreview();
        }
      });
    });
    
    // Initialize editor functionality
    let autoUpdate = true;
    
    // Add input event listeners to textareas
    htmlEditor.addEventListener('input', () => {
      content.html = htmlEditor.value;
      if (autoUpdate) {
        debounceUpdate();
      }
    });
    
    cssEditor.addEventListener('input', () => {
      content.css = cssEditor.value;
      if (autoUpdate) {
        debounceUpdate();
      }
    });
    
    jsEditor.addEventListener('input', () => {
      content.js = jsEditor.value;
      if (autoUpdate) {
        debounceUpdate();
      }
    });
    
    // Run button functionality
    if (runButton) {
      runButton.addEventListener('click', () => {
        updatePreview();
        triggerEvent('update');
      });
    }
    
    // Fullscreen functionality
    let isFullscreen = false;
    if (fullscreenButton) {
      fullscreenButton.addEventListener('click', () => {
        isFullscreen = !isFullscreen;
        container.classList.toggle('solumind-fullscreen', isFullscreen);
        triggerEvent('fullscreen', isFullscreen);
      });
    }
    
    // Add resize handlers to textareas
    const resizeObserver = new ResizeObserver(() => {
      if (htmlEditor) htmlEditor.style.height = 'auto';
      if (cssEditor) cssEditor.style.height = 'auto';
      if (jsEditor) jsEditor.style.height = 'auto';
      
      if (htmlEditor) htmlEditor.style.height = htmlEditor.scrollHeight + 'px';
      if (cssEditor) cssEditor.style.height = cssEditor.scrollHeight + 'px';
      if (jsEditor) jsEditor.style.height = jsEditor.scrollHeight + 'px';
    });
    
    if (htmlEditor) resizeObserver.observe(htmlEditor);
    if (cssEditor) resizeObserver.observe(cssEditor);
    if (jsEditor) resizeObserver.observe(jsEditor);
  };
  
  // Setup handlers
  setupEventHandlers();
  
  // Debounce updates
  let updateTimeout: any = null;
  const debounceUpdate = () => {
    if (updateTimeout) clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => {
      updatePreview();
      triggerEvent('update');
    }, 500); // 500ms debounce
  };
  
  // Update preview content
  const updatePreview = () => {
    const previewIframe = document.getElementById('solumind-preview-iframe') as HTMLIFrameElement;
    
    if (previewIframe && previewIframe.contentWindow) {
      const doc = previewIframe.contentWindow.document;
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>${content.css}</style>
            ${config.canvas?.styles?.map((style: string) => `<link rel="stylesheet" href="${style}">`).join('') || ''}
          </head>
          <body>
            ${content.html}
            <script>${content.js}</script>
          </body>
        </html>
      `);
      doc.close();
    }
  };

  // Initialize preview on load
  setTimeout(updatePreview, 0);
  
  // Event management
  function triggerEvent(event: string, ...args: any[]) {
    if (eventListeners[event]) {
      eventListeners[event].forEach(callback => callback(...args));
    }
  }

  // Public API
  return {
    getHtml: () => content.html,
    getCss: () => content.css,
    getJs: () => content.js,
    setComponents: (html: string) => {
      content.html = html;
      const htmlEditor = document.getElementById('solumind-html-editor') as HTMLTextAreaElement;
      if (htmlEditor) htmlEditor.value = html;
      updatePreview();
      triggerEvent('update');
    },
    setStyle: (css: string) => {
      content.css = css;
      const cssEditor = document.getElementById('solumind-css-editor') as HTMLTextAreaElement;
      if (cssEditor) cssEditor.value = css;
      updatePreview();
      triggerEvent('update');
    },
    setJs: (js: string) => {
      content.js = js;
      const jsEditor = document.getElementById('solumind-js-editor') as HTMLTextAreaElement;
      if (jsEditor) jsEditor.value = js;
      updatePreview();
      triggerEvent('update');
    },
    getContainer: () => container,
    getWrapper: () => ({ toHTML: () => content.html }),
    on: (event: string, callback: Function) => {
      if (!eventListeners[event]) {
        eventListeners[event] = [];
      }
      eventListeners[event].push(callback);
    },
    off: (event: string, callback: Function) => {
      if (eventListeners[event]) {
        eventListeners[event] = eventListeners[event].filter(cb => cb !== callback);
      }
    },
    trigger: triggerEvent,
    destroy: () => {
      // Clean up
      container.innerHTML = '';
      container.classList.remove('solumind-editor');
      for (const key in eventListeners) {
        delete eventListeners[key];
      }
    },
    render: updatePreview
  };
}
