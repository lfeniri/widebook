/**
 * SolumindEditor core implementation
 */

import { 
  SolumindEditorConfig, 
  SolumindEditor, 
  EditorOutput, 
  CustomBlock, 
  CustomComponent,
  EDITOR_EVENTS
} from '../types';

import { setupDragAndDrop } from '../managers/dragDropManager';
import { registerBaseBlocks } from '../blocks';
import { setupPanels } from '../managers/panelsManager';
import { setupStyleManager } from '../managers/styleManager';
import { setupCodeEditor } from '../managers/codeManager';
import { setupComponentManager } from '../managers/componentManager';

import '../styles/editor.css';

/**
 * Creates a new SolumindEditor instance
 */
export function createEditor(config: SolumindEditorConfig): SolumindEditor {
  // State variables
  let container: HTMLElement;
  let editorContainer: HTMLElement;
  let componentsContainer: HTMLElement;
  let blocksContainer: HTMLElement;
  let stylesPanel: HTMLElement;
  let toolbarPanel: HTMLElement;
  let codeEditorPanel: HTMLElement;
  let previewMode = false;
  
  // Data state
  let htmlContent = config.components || '';
  let cssContent = config.style || '';
  let jsContent = config.script || ''; // Utiliser le script fourni dans la configuration
  let customBlocks: CustomBlock[] = config.customBlocks || [];
  let customComponents: CustomComponent[] = config.customComponents || [];
  
  // Event listeners registry
  const eventListeners: Record<string, ((...args: any[]) => void)[]> = {};
  
  // Get the HTML content
  function getHtml(): string {
    return htmlContent;
  }
  
  // Get the CSS content
  function getCss(): string {
    return cssContent;
  }
  
  // Get the JS content
  function getJs(): string {
    return jsContent;
  }
  
  // Set the components (HTML)
  function setComponents(html: string): void {
    htmlContent = html;
    
    // Update the canvas
    const canvasFrame = editorContainer.querySelector('.solumind-canvas-frame') as HTMLIFrameElement;
    if (canvasFrame && canvasFrame.contentWindow && canvasFrame.contentWindow.document.body) {
      canvasFrame.contentWindow.document.body.innerHTML = html;
    }
    
    // Trigger update event
    trigger(EDITOR_EVENTS.UPDATE, getState());
  }
  
  // Set the style (CSS)
  function setStyle(css: string): void {
    cssContent = css;
    
    // Update the canvas
    const canvasFrame = editorContainer.querySelector('.solumind-canvas-frame') as HTMLIFrameElement;
    if (canvasFrame && canvasFrame.contentWindow) {
      const customCssElement = canvasFrame.contentWindow.document.getElementById('solumind-custom-css');
      if (customCssElement) {
        customCssElement.textContent = css;
      }
    }
    
    // Trigger update event
    trigger(EDITOR_EVENTS.UPDATE, getState());
  }
  
  // Set the JavaScript
  function setJs(js: string): void {
    jsContent = js;
    
    // Update the canvas
    const frame = editorContainer.querySelector('.solumind-canvas-frame') as HTMLIFrameElement;
    if (frame && frame.contentWindow) {
      // Remove existing script if it exists
      const existingScript = frame.contentWindow.document.getElementById('solumind-custom-js');
      if (existingScript) {
        existingScript.remove();
      }
      
      // Create and add the new script
      const scriptElement = frame.contentWindow.document.createElement('script');
      scriptElement.id = 'solumind-custom-js';
      scriptElement.textContent = js;
      frame.contentWindow.document.body.appendChild(scriptElement);
    }
    
    // Trigger update event
    trigger(EDITOR_EVENTS.UPDATE, getState());
  }
  
  // Get the wrapper (main canvas body)
  function getWrapper(): HTMLElement | null {
    const frame = editorContainer.querySelector('.solumind-canvas-frame') as HTMLIFrameElement;
    if (frame && frame.contentWindow && frame.contentWindow.document) {
      return frame.contentWindow.document.body;
    }
    return null;
  }
  
  // Get the container
  function getContainer(): HTMLElement {
    return container;
  }
  
  // Register event listener
  function on(event: string, callback: (...args: any[]) => void): void {
    if (!eventListeners[event]) {
      eventListeners[event] = [];
    }
    
    eventListeners[event].push(callback);
  }
  
  // Unregister event listener
  function off(event: string, callback: (...args: any[]) => void): void {
    if (eventListeners[event]) {
      eventListeners[event] = eventListeners[event].filter(cb => cb !== callback);
    }
  }
  
  // Trigger event
  function trigger(event: string, ...args: any[]): void {
    if (eventListeners[event]) {
      eventListeners[event].forEach(callback => callback(...args));
    }
  }
  
  // Get editor state
  function getState(): EditorOutput {
    return {
      html: htmlContent,
      css: cssContent,
      js: jsContent,
    };
  }
  
  // Load editor state
  function loadState(state: EditorOutput): void {
    if (state.html !== undefined) {
      setComponents(state.html);
    }
    
    if (state.css !== undefined) {
      setStyle(state.css);
    }
    
    if (state.js !== undefined) {
      jsContent = state.js;
      // Apply JS changes using setJs
      setJs(state.js);
    }
    
    trigger(EDITOR_EVENTS.UPDATE, getState());
  }  // Function to switch between panels
  function switchPanel(panelType: 'components' | 'styles' | 'none'): void {
    // Get all panels
    const componentsPanel = editorContainer.querySelector('[data-panel-type="components"]') as HTMLElement;
    const stylesPanel = editorContainer.querySelector('[data-panel-type="styles"]') as HTMLElement;
    const leftSidebar = editorContainer.querySelector('.solumind-editor-sidebar.left') as HTMLElement;
    const navButtons = editorContainer.querySelectorAll('.solumind-panel-nav-btn');
    const canvas = editorContainer.querySelector('.solumind-editor-canvas') as HTMLElement;
    
    // Reset all buttons
    navButtons.forEach(btn => btn.classList.remove('active'));
    
    // Handle panel visibility
    switch (panelType) {
      case 'components':
        if (componentsPanel) componentsPanel.style.display = 'block';
        if (stylesPanel) stylesPanel.style.display = 'none';
        if (leftSidebar) leftSidebar.classList.remove('hidden');
        if (canvas) canvas.style.marginLeft = '0';
        navButtons[0].classList.add('active');
        break;
      case 'styles':
        if (componentsPanel) componentsPanel.style.display = 'none';
        if (stylesPanel) stylesPanel.style.display = 'block';
        if (leftSidebar) leftSidebar.classList.remove('hidden');
        if (canvas) canvas.style.marginLeft = '0';
        navButtons[1].classList.add('active');
        break;
      case 'none':
        if (leftSidebar) leftSidebar.classList.add('hidden');
        if (canvas) {
          canvas.style.marginLeft = '0';
          canvas.style.transition = 'margin-left 0.3s ease';
        }
        navButtons[2].classList.add('active');
        break;
    }
    
    // Si on est dans le mode "none", désactivons aussi le mode prévisualisation si actif
    if (panelType === 'none' && previewMode) {
      previewMode = false;
      editorContainer.classList.remove('solumind-preview-mode');
    }
    
    // Trigger event when panel changes
    trigger(EDITOR_EVENTS.PANEL_SWITCHED, panelType);
  }
    // Toggle preview mode
  function togglePreview(): void {
    previewMode = !previewMode;
    
    if (previewMode) {
      editorContainer.classList.add('solumind-preview-mode');
      // Hide all panels
      const leftSidebar = editorContainer.querySelector('.solumind-editor-sidebar.left');
      const topBar = editorContainer.querySelector('.solumind-editor-topbar');
      const navButtons = editorContainer.querySelectorAll('.solumind-panel-nav-btn');
      
      if (leftSidebar) leftSidebar.classList.add('hidden');
      if (topBar) topBar.classList.add('preview-mode');
      
      // Mettre à jour l'état des boutons de navigation
      navButtons.forEach(btn => btn.classList.remove('active'));
      // Activer le bouton de visualisation
      navButtons[2]?.classList.add('active');
    } else {
      editorContainer.classList.remove('solumind-preview-mode');
      
      // Restaurer l'état précédent des panels
      const componentsPanel = editorContainer.querySelector('[data-panel-type="components"]') as HTMLElement;
      const stylesPanel = editorContainer.querySelector('[data-panel-type="styles"]') as HTMLElement;
      const leftSidebar = editorContainer.querySelector('.solumind-editor-sidebar.left');
      const topBar = editorContainer.querySelector('.solumind-editor-topbar');
      const navButtons = editorContainer.querySelectorAll('.solumind-panel-nav-btn');
      
      // Revenons au panel de composants par défaut
      if (componentsPanel) componentsPanel.style.display = 'block';
      if (stylesPanel) stylesPanel.style.display = 'none'; 
      if (leftSidebar) leftSidebar.classList.remove('hidden');
      if (topBar) topBar.classList.remove('preview-mode');
      
      // Mettre à jour l'état des boutons de navigation
      navButtons.forEach(btn => btn.classList.remove('active'));
      // Activer le bouton de composants par défaut
      navButtons[0]?.classList.add('active');
    }
    
    trigger(EDITOR_EVENTS.PREVIEW_TOGGLED, previewMode);
  }
  
  // Check if in preview mode
  function isInPreviewMode(): boolean {
    return previewMode;
  }
  
  // Register a custom block
  function registerCustomBlock(block: CustomBlock): void {
    customBlocks.push(block);
    
    // Create block element in the blocks panel
    const blockElement = document.createElement('div');
    blockElement.className = 'solumind-block';
    blockElement.setAttribute('draggable', 'true');
    blockElement.setAttribute('data-block-id', block.id);
    
    // Add block content
    if (block.media) {
      const mediaElem = document.createElement('div');
      mediaElem.className = 'solumind-block-media';
      mediaElem.innerHTML = block.media;
      blockElement.appendChild(mediaElem);
    }
    
    const labelElem = document.createElement('div');
    labelElem.className = 'solumind-block-label';
    labelElem.textContent = block.label;
    blockElement.appendChild(labelElem);
    
    // Append to blocks container
    blocksContainer.appendChild(blockElement);
    
    // Trigger event
    trigger(EDITOR_EVENTS.BLOCK_ADDED, block);
  }
  
  // Register a custom component
  function registerCustomComponent(component: CustomComponent): void {
    customComponents.push(component);
    
    // Create component element in the components panel
    const componentElement = document.createElement('div');
    componentElement.className = 'solumind-component-item';
    componentElement.setAttribute('draggable', 'true');
    componentElement.setAttribute('data-component-id', component.id);
    componentElement.textContent = component.label;
    
    // Add special badge for NextJS components
    if (component.isNextJs) {
      const badge = document.createElement('span');
      badge.className = 'solumind-component-badge nextjs';
      badge.textContent = 'Next';
      componentElement.appendChild(badge);
    }
    
    // Append to components container
    componentsContainer.appendChild(componentElement);
  }
  
  // Open code editor
  function openCodeEditor(): void {
    const codeEditor = editorContainer.querySelector('.solumind-code-editor');
    if (codeEditor) {
      codeEditor.classList.add('active');
      
      // Create code editor UI if it doesn't exist
      if (!codeEditor.innerHTML) {
        const codeEditorContent = document.createElement('div');
        codeEditorContent.className = 'solumind-code-editor-content';
        
        const tabs = document.createElement('div');
        tabs.className = 'solumind-code-editor-tabs';
        
        const htmlTab = document.createElement('button');
        htmlTab.className = 'solumind-tab active';
        htmlTab.textContent = 'HTML';
        htmlTab.onclick = () => switchCodeEditorTab('html');
        
        const cssTab = document.createElement('button');
        cssTab.className = 'solumind-tab';
        cssTab.textContent = 'CSS';
        cssTab.onclick = () => switchCodeEditorTab('css');
        
        const jsTab = document.createElement('button');
        jsTab.className = 'solumind-tab';
        jsTab.textContent = 'JS';
        jsTab.onclick = () => switchCodeEditorTab('js');
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'solumind-code-editor-close';
        closeBtn.textContent = '×';
        closeBtn.onclick = closeCodeEditor;
        
        tabs.appendChild(htmlTab);
        tabs.appendChild(cssTab);
        tabs.appendChild(jsTab);
        tabs.appendChild(closeBtn);
        
        const htmlEditor = document.createElement('textarea');
        htmlEditor.className = 'solumind-code-editor-textarea active';
        htmlEditor.setAttribute('data-mode', 'html');
        htmlEditor.value = htmlContent;
        
        const cssEditor = document.createElement('textarea');
        cssEditor.className = 'solumind-code-editor-textarea';
        cssEditor.setAttribute('data-mode', 'css');
        cssEditor.value = cssContent;
        
        const jsEditor = document.createElement('textarea');
        jsEditor.className = 'solumind-code-editor-textarea';
        jsEditor.setAttribute('data-mode', 'js');
        jsEditor.value = jsContent;
        
        const applyBtn = document.createElement('button');
        applyBtn.className = 'solumind-code-editor-apply';
        applyBtn.textContent = 'Apply Changes';
        applyBtn.onclick = applyCodeEditorChanges;
        
        codeEditorContent.appendChild(tabs);
        codeEditorContent.appendChild(htmlEditor);
        codeEditorContent.appendChild(cssEditor);
        codeEditorContent.appendChild(jsEditor);
        codeEditorContent.appendChild(applyBtn);
        
        codeEditor.appendChild(codeEditorContent);
      }
    }
    
    trigger(EDITOR_EVENTS.CODE_EDITOR_OPENED);
  }
  
  // Switch code editor tab
  function switchCodeEditorTab(mode: 'html' | 'css' | 'js'): void {
    const tabs = editorContainer.querySelectorAll('.solumind-code-editor-tabs .solumind-tab');
    const editors = editorContainer.querySelectorAll('.solumind-code-editor-textarea');
    
    // Deactivate all tabs and editors
    tabs.forEach(tab => tab.classList.remove('active'));
    editors.forEach(editor => editor.classList.remove('active'));
    
    // Activate the selected tab and editor
    const activeTab = Array.from(tabs).find(tab => tab.textContent?.toLowerCase() === mode);
    const activeEditor = Array.from(editors).find(editor => editor.getAttribute('data-mode') === mode);
    
    if (activeTab) activeTab.classList.add('active');
    if (activeEditor) activeEditor.classList.add('active');
  }
  
  // Apply code editor changes
  function applyCodeEditorChanges(): void {
    const htmlEditor = editorContainer.querySelector('.solumind-code-editor-textarea[data-mode="html"]') as HTMLTextAreaElement;
    const cssEditor = editorContainer.querySelector('.solumind-code-editor-textarea[data-mode="css"]') as HTMLTextAreaElement;
    const jsEditor = editorContainer.querySelector('.solumind-code-editor-textarea[data-mode="js"]') as HTMLTextAreaElement;
    
    if (htmlEditor) {
      setComponents(htmlEditor.value);
    }
    
    if (cssEditor) {
      setStyle(cssEditor.value);
    }
    
    if (jsEditor) {
      setJs(jsEditor.value);
    }
    
    trigger(EDITOR_EVENTS.UPDATE, getState());
  }
  
  // Close code editor
  function closeCodeEditor(): void {
    const codeEditor = editorContainer.querySelector('.solumind-code-editor');
    if (codeEditor) {
      codeEditor.classList.remove('active');
    }
    
    trigger(EDITOR_EVENTS.CODE_EDITOR_CLOSED);
  }
  
  // Destroy the editor
  function destroy(): void {
    // Remove all event listeners
    for (const event in eventListeners) {
      eventListeners[event] = [];
    }
    
    // Remove DOM elements
    if (container && editorContainer) {
      container.removeChild(editorContainer);
    }
  }
  
  // Render the editor
  function render(): void {
    // Refresh the canvas
    const canvasFrame = editorContainer.querySelector('.solumind-canvas-frame') as HTMLIFrameElement;
    if (canvasFrame && canvasFrame.contentWindow && canvasFrame.contentWindow.document.body) {
      canvasFrame.contentWindow.document.body.innerHTML = htmlContent;
    }
    
    // Refresh the CSS
    const canvasFrame2 = editorContainer.querySelector('.solumind-canvas-frame') as HTMLIFrameElement;
    if (canvasFrame2 && canvasFrame2.contentWindow) {
      const customCssElement = canvasFrame2.contentWindow.document.getElementById('solumind-custom-css');
      if (customCssElement) {
        customCssElement.textContent = cssContent;
      }
    }
  }
  
  // Create the DOM structure for the editor
  function createEditorDOM() {
    // Create main editor container
    editorContainer = document.createElement('div');
    editorContainer.className = 'solumind-editor';
    editorContainer.style.height = config.height || '600px';
    editorContainer.style.width = config.width || 'auto';
      // Create main layout
    const topBar = document.createElement('div');
    topBar.className = 'solumind-editor-topbar';
    
    const mainContent = document.createElement('div');
    mainContent.className = 'solumind-editor-content';
    
    const leftSidebar = document.createElement('div');
    leftSidebar.className = 'solumind-editor-sidebar left';
    
    const canvas = document.createElement('div');
    canvas.className = 'solumind-editor-canvas';
    
    // Create panels
    blocksContainer = document.createElement('div');
    blocksContainer.className = 'solumind-blocks-container';
    blocksContainer.setAttribute('data-panel-type', 'components');
    
    componentsContainer = document.createElement('div');
    componentsContainer.className = 'solumind-components-container';
    
    stylesPanel = document.createElement('div');
    stylesPanel.className = 'solumind-styles-panel';
    stylesPanel.setAttribute('data-panel-type', 'styles');
    stylesPanel.style.display = 'none'; // Caché par défaut
    
    toolbarPanel = document.createElement('div');
    toolbarPanel.className = 'solumind-toolbar-panel';
    
    // Créer la barre de navigation des panels
    const panelsNav = document.createElement('div');
    panelsNav.className = 'solumind-panels-nav';
    
    // Bouton pour le panel de composants
    const componentsBtn = document.createElement('button');
    componentsBtn.className = 'solumind-panel-nav-btn active';
    componentsBtn.innerHTML = '<i class="fas fa-th-large"></i> Composants';
    componentsBtn.onclick = () => switchPanel('components');
    
    // Bouton pour le panel de styles
    const stylesBtn = document.createElement('button');
    stylesBtn.className = 'solumind-panel-nav-btn';
    stylesBtn.innerHTML = '<i class="fas fa-paint-brush"></i> Styles';
    stylesBtn.onclick = () => switchPanel('styles');
    
    // Bouton pour fermer les panels
    const hideBtn = document.createElement('button');
    hideBtn.className = 'solumind-panel-nav-btn';
    hideBtn.innerHTML = '<i class="fas fa-eye"></i> Visualisation';
    hideBtn.onclick = () => switchPanel('none');
    
    // Ajouter les boutons à la barre de navigation
    panelsNav.appendChild(componentsBtn);
    panelsNav.appendChild(stylesBtn);
    panelsNav.appendChild(hideBtn);
    
    codeEditorPanel = document.createElement('div');
    codeEditorPanel.className = 'solumind-code-editor';
    codeEditorPanel.style.display = 'none';
      // Create canvas iframe for component rendering
    const canvasFrame = document.createElement('iframe');
    canvasFrame.className = 'solumind-canvas-frame';
    canvasFrame.setAttribute('seamless', 'seamless');
    canvasFrame.setAttribute('allow', 'clipboard-write');
    // Set allow-same-origin and allow-scripts to enable drag and drop
    canvasFrame.setAttribute('sandbox', 'allow-same-origin allow-scripts');
    
    // Append elements to their containers
    leftSidebar.appendChild(blocksContainer);
    leftSidebar.appendChild(stylesPanel);
    
    canvas.appendChild(canvasFrame);
    
    topBar.appendChild(toolbarPanel);
    topBar.appendChild(panelsNav);
    
    mainContent.appendChild(leftSidebar);
    mainContent.appendChild(canvas);
      editorContainer.appendChild(topBar);
    editorContainer.appendChild(mainContent);
    editorContainer.appendChild(codeEditorPanel);
    
    // Add editor to the container
    container.appendChild(editorContainer);
      
    // Setup canvas iframe with required styles
    const canvasFrameElement = canvasFrame as HTMLIFrameElement;
    if (canvasFrameElement.contentWindow) {
      const iframe = canvasFrameElement.contentWindow.document;
      iframe.open();
      iframe.write(        `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
            body {
              margin: 0;
              padding: 20px;
              box-sizing: border-box;
              min-height: 100vh;
            }            /* Component placeholder styles */
            .solumind-component-selected {
              outline: 2px solid #4e9bff;
            }
            .solumind-element-added {
              animation: highlight-element 1s ease-in-out;
            }
            .solumind-custom-component {
              padding: 10px;
              border: 2px dotted #e5e7eb;
              margin: 10px 0;
              min-height: 60px;
            }
            .solumind-drop-placeholder {
              margin: 10px 0;
              height: 20px;
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              animation: pulse 1.5s infinite ease-in-out;
            }
            
            .solumind-drop-indicator {
              background-color: #0ea5e9;
              height: 3px;
              width: 100%;
              position: relative;
              border-radius: 1.5px;
            }
            
            .solumind-drop-indicator::before,
            .solumind-drop-indicator::after {
              content: "";
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background-color: #0ea5e9;
              position: absolute;
              top: -2.5px;
            }
            
            @keyframes pulse {
              0% { opacity: 0.6; }
              50% { opacity: 1; }
              100% { opacity: 0.6; }
            }
            
            .solumind-drop-indicator::before {
              left: 0;
            }
            
            .solumind-drop-indicator::after {
              right: 0;
            }
            
            @keyframes highlight-element {
              0% { box-shadow: 0 0 0 2px rgba(14, 165, 233, 0); }
              30% { box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.6); }
              100% { box-shadow: 0 0 0 2px rgba(14, 165, 233, 0); }
            }
            /* Base CSS reset */
            * {
              box-sizing: border-box;
            }
          </style>
          ${config.canvas?.styles?.map(style => `<link rel="stylesheet" href="${style}" />`).join('') || ''}
          <style id="solumind-custom-css"></style>
          ${config.canvas?.scripts?.map(script => `<script src="${script}"></script>`).join('') || ''}
        </head>        <body id="solumind-canvas-body"></body>
        <script>
          // Enable drag and drop on the body with better event handling
          document.body.addEventListener('dragover', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.dataTransfer.dropEffect = 'copy';
            
            // Notifier le parent pour la position du curseur
            const rect = document.body.getBoundingClientRect();
            const data = {
              type: 'dragover',
              x: e.clientX,
              y: e.clientY,
              bodyWidth: rect.width,
              bodyHeight: rect.height
            };
            window.parent.postMessage(data, '*');
            return false;
          });
          
          document.body.addEventListener('drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Notifier le parent avec les données complètes
            const data = {
              type: 'drop',
              x: e.clientX,
              y: e.clientY,
              componentId: e.dataTransfer.getData('text/plain'),
              componentData: e.dataTransfer.getData('application/json') || null
            };
            window.parent.postMessage(data, '*');
            return false;
          });
          
          // Également gérer les événements de dragleave
          document.body.addEventListener('dragleave', function(e) {
            e.preventDefault();
            const rect = document.body.getBoundingClientRect();
            const x = e.clientX;
            const y = e.clientY;
            
            // Vérifier si le curseur a vraiment quitté l'iframe
            if (x <= rect.left || x >= rect.right || y <= rect.top || y >= rect.bottom) {
              window.parent.postMessage({type: 'dragleave'}, '*');
            }
            return false;
          });
          
          // Ajouter une fonction pour créer facilement des éléments à partir du parent
          window.createElementFromHTML = function(html) {
            const div = document.createElement('div');
            div.innerHTML = html.trim();
            return div.firstChild;
          };
          
          // Ajouter écouteur pour les messages venant du parent
          window.addEventListener('message', function(e) {
            if (e.data && e.data.action === 'insertElement') {
              try {
                const element = window.createElementFromHTML(e.data.html);
                if (element && e.data.targetId) {
                  const target = document.getElementById(e.data.targetId);
                  if (target) {
                    target.appendChild(element);
                  } else {
                    document.body.appendChild(element);
                  }
                } else {
                  document.body.appendChild(element);
                }
                // Confirmer l'insertion
                window.parent.postMessage({
                  type: 'elementInserted',
                  success: true,
                  id: element.id
                }, '*');
              } catch (err) {
                window.parent.postMessage({
                  type: 'elementInserted',
                  success: false,
                  error: err.message
                }, '*');
              }
            }
          });
        </script>
      </html>
    `);
      iframe.close();
    }
  }
  
  // Initialize the editor
  function init(): SolumindEditor {
    // Find or create container
    if (typeof config.container === 'string') {
      container = document.querySelector(config.container) as HTMLElement;
      if (!container) {
        throw new Error(`Container ${config.container} not found`);
      }
    } else {
      container = config.container;
    }
    
    // Create editor structure
    createEditorDOM();
    
    // Create editor instance
    const editorInstance: SolumindEditor = {
      getHtml,
      getCss,
      getJs,
      setComponents,
      setStyle,
      setJs,
      getWrapper,
      getContainer,
      addPanel: () => {}, // Will be implemented in panelsManager
      addBlock: () => {}, // Will be implemented by extending registerCustomBlock
      addComponent: () => {}, // Will be implemented by extending registerCustomComponent
      on,
      off,
      trigger,
      destroy,
      render,
      getState,
      loadState,
      togglePreview,
      isInPreviewMode,
      openCodeEditor,
      closeCodeEditor,
      registerCustomBlock,
      registerCustomComponent,
    };
    
    // Setup managers
    setupDragAndDrop(editorContainer, componentsContainer);
    setupPanels(toolbarPanel, editorInstance);
    setupStyleManager(stylesPanel, editorInstance);
    setupCodeEditor(codeEditorPanel, editorInstance);
    setupComponentManager(componentsContainer, editorInstance);
    
    // Register default blocks
    registerBaseBlocks(editorInstance);
    
    // Register custom blocks
    if (customBlocks.length) {
      customBlocks.forEach(block => {
        registerCustomBlock(block);
      });
    }
    
    // Register custom components
    if (customComponents.length) {
      customComponents.forEach(component => {
        registerCustomComponent(component);
      });
    }
    
    // If there's initial content, set it
    if (htmlContent) {
      setComponents(htmlContent);
    }
    
    if (cssContent) {
      setStyle(cssContent);
    }
    
    if (jsContent) {
      setJs(jsContent);
    }
    
    // Add update event listener if provided in config
    if (config.onUpdate) {
      on(EDITOR_EVENTS.UPDATE, config.onUpdate);
    }
    
    return editorInstance;
  }
  
  // Initialize and return the editor instance
  return init();
}