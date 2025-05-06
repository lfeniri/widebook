/**
 * Panels Manager for SolumindEditor
 */

import { SolumindEditor, Panel } from '../types';

export function setupPanels(
  toolbarContainer: HTMLElement,
  editor: SolumindEditor,
): void {
  // Default panel buttons configuration
  const defaultButtons = [
    {
      id: 'preview',
      label: 'Preview',
      icon: 'fas fa-eye',
      command: editor.togglePreview,
      tooltip: 'Toggle preview mode',
    },
    {
      id: 'undo',
      label: 'Undo',
      icon: 'fas fa-undo',
      command: () => {
        // Implement undo functionality
        editor.trigger('undo');
      },
      tooltip: 'Undo last action',
    },
    {
      id: 'redo',
      label: 'Redo',
      icon: 'fas fa-redo',
      command: () => {
        // Implement redo functionality
        editor.trigger('redo');
      },
      tooltip: 'Redo last action',
    },
    {
      id: 'code',
      label: 'Code Editor',
      icon: 'fas fa-code',
      command: editor.openCodeEditor,
      tooltip: 'Open code editor',
    },
    {
      id: 'desktop',
      label: 'Desktop',
      icon: 'fas fa-desktop',
      command: () => {
        // Switch to desktop view
        setDeviceView('desktop');
      },
      tooltip: 'Desktop view',
      active: true,
    },
    {
      id: 'tablet',
      label: 'Tablet',
      icon: 'fas fa-tablet-alt',
      command: () => {
        // Switch to tablet view
        setDeviceView('tablet');
      },
      tooltip: 'Tablet view',
    },
    {
      id: 'mobile',
      label: 'Mobile',
      icon: 'fas fa-mobile-alt',
      command: () => {
        // Switch to mobile view
        setDeviceView('mobile');
      },
      tooltip: 'Mobile view',
    },
    {
      id: 'clear',
      label: 'Clear Canvas',
      icon: 'fas fa-trash',
      command: () => {
        if (confirm('Are you sure you want to clear the canvas? This cannot be undone.')) {
          editor.setComponents('');
          editor.setStyle('');
        }
      },
      tooltip: 'Clear canvas',
    },
  ];

  // Set the device view
  function setDeviceView(device: 'desktop' | 'tablet' | 'mobile'): void {
    const canvas = editor.getContainer().querySelector('.solumind-canvas-frame') as HTMLIFrameElement;
    if (!canvas) return;
    
    // Remove current device classes
    canvas.classList.remove('device-desktop', 'device-tablet', 'device-mobile');
    
    // Add new device class
    canvas.classList.add(`device-${device}`);
    
    // Set width based on device
    switch (device) {
      case 'desktop':
        canvas.style.width = '100%';
        canvas.style.maxWidth = '100%';
        break;
      case 'tablet':
        canvas.style.width = '768px';
        canvas.style.maxWidth = '100%';
        break;
      case 'mobile':
        canvas.style.width = '375px';
        canvas.style.maxWidth = '100%';
        break;
    }
    
    // Update active state in device buttons
    const deviceButtons = toolbarContainer.querySelectorAll('.solumind-toolbar-button');
    deviceButtons.forEach(button => {
      if (button.id === `solumind-button-${device}`) {
        button.classList.add('active');
      } else if (['solumind-button-desktop', 'solumind-button-tablet', 'solumind-button-mobile'].includes(button.id)) {
        button.classList.remove('active');
      }
    });
  }

  // Initialize the toolbar buttons
  function initToolbar(): void {
    // Clear existing content
    toolbarContainer.innerHTML = '';
    
    // Create toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'solumind-toolbar';
    
    // Add buttons to toolbar
    defaultButtons.forEach(button => {
      const buttonElement = document.createElement('button');
      buttonElement.id = `solumind-button-${button.id}`;
      buttonElement.className = `solumind-toolbar-button ${button.active ? 'active' : ''}`;
      buttonElement.setAttribute('title', button.tooltip || button.label);
      buttonElement.innerHTML = `<i class="${button.icon}"></i>`;
      buttonElement.addEventListener('click', () => {
        if (typeof button.command === 'function') {
          button.command();
        }
      });
      
      toolbar.appendChild(buttonElement);
    });
    
    // Append toolbar to container
    toolbarContainer.appendChild(toolbar);
  }

  // Add a new panel to the editor
  function addPanel(panel: Panel): void {
    const panelContainer = document.createElement('div');
    panelContainer.className = `solumind-panel solumind-panel-${panel.id}`;
    
    // Add panel buttons if available
    if (panel.buttons && panel.buttons.length > 0) {
      const buttonsContainer = document.createElement('div');
      buttonsContainer.className = 'solumind-panel-buttons';
      
      panel.buttons.forEach(button => {
        const buttonElement = document.createElement('button');
        buttonElement.id = `solumind-panel-button-${button.id}`;
        buttonElement.className = `solumind-panel-button ${button.active ? 'active' : ''}`;
        
        if (button.attributes) {
          Object.entries(button.attributes).forEach(([key, value]) => {
            buttonElement.setAttribute(key, value);
          });
        }
        
        if (button.className) {
          buttonElement.classList.add(button.className);
        }
        
        buttonElement.addEventListener('click', () => {
          if (typeof button.command === 'function') {
            button.command(editor);
          } else if (typeof button.command === 'string') {
            // Handle string commands if needed
            console.log(`String command: ${button.command}`);
          }
        });
        
        buttonsContainer.appendChild(buttonElement);
      });
      
      panelContainer.appendChild(buttonsContainer);
    }
    
    // Add panel to editor
    editor.getContainer().querySelector('.solumind-editor-topbar')?.appendChild(panelContainer);
  }

  // Initialize panels
  function init(): void {
    // Add Font Awesome for icons (if not already loaded)
    if (!document.querySelector('link[href*="font-awesome"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
      document.head.appendChild(link);
    }
    
    // Initialize toolbar
    initToolbar();
    
    // Extend editor.addPanel to use our implementation
    editor.addPanel = addPanel;
  }

  // Initialize panels
  init();
}
