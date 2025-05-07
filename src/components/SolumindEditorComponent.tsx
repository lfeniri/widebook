"use client";
import React, { useEffect, useRef } from "react";
// Import directly from the library
import { createSolumindEditor } from "../../lib/solumindEditorJs";
import "../../lib/solumindEditorJs/styles/editor.css";
import "../../lib/solumindEditorJs/monaco/monaco-editor.css";

// Define types for the editor
interface SolumindEditor {
  getHtml: () => string;
  getCss: () => string;
  getJs: () => string;
  setComponents: (components: string) => void;
  setStyle: (style: string) => void;
  setJs?: (js: string) => void;
  getWrapper: () => any;
  getContainer: () => HTMLElement;
  on: (event: string, callback: (...args: any[]) => void) => void;
  off: (event: string, callback: (...args: any[]) => void) => void;
  trigger: (event: string, ...args: any[]) => void;
  destroy: () => void;
}

interface SolumindEditorProps {
  value?: { html: string; css: string; js: string };
  onChange?: (data: { html: string; css: string; js: string }) => void;
  height?: string;
  config?: any;
}

const SolumindEditorComponent: React.FC<SolumindEditorProps> = ({ 
  value, 
  onChange, 
  height = "600px",
  config = {}
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstance = useRef<SolumindEditor | null>(null);
  
  useEffect(() => {
    // Only initialize once
    if (editorRef.current && !editorInstance.current) {
      const defaultConfig = {
        container: editorRef.current,
        height: height,
        width: "auto",
        components: value?.html || '',
        style: value?.css || '',
        script: value?.js || '',
        canvas: {
          styles: [
            'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css'
          ]
        },
        // Merge with user config
        ...config
      };

      // Initialize the editor
      editorInstance.current = createSolumindEditor(defaultConfig);

      // Setup onChange event handler
      if (onChange) {
        editorInstance.current.on('update', () => {
          const html = editorInstance.current?.getHtml() || '';
          const css = editorInstance.current?.getCss() || '';
          const js = editorInstance.current?.getJs() || '';
          
          onChange({ html, css, js });
        });
      }
    }

    // Cleanup on unmount
    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, []);
  
  // Handle external value changes
  useEffect(() => {
    if (editorInstance.current && value !== undefined) {
      // Get current values
      const currentHtml = editorInstance.current.getHtml();
      const currentCss = editorInstance.current.getCss();
      const currentJs = editorInstance.current.getJs();
      
      // Only update if values have changed to avoid loops
      if (value.html !== currentHtml || value.css !== currentCss || value.js !== currentJs) {
        // Update components
        if (value.html !== currentHtml) {
          editorInstance.current?.setComponents(value.html || '');
        }
        
        // Update styles
        if (value.css !== currentCss) {
          editorInstance.current?.setStyle(value.css || '');
        }
        
        // Update scripts
        if (value.js !== currentJs && editorInstance.current?.setJs) {
          editorInstance.current?.setJs(value.js || '');
        }
        
        // Show notification when content is updated externally
        if (currentHtml && currentCss) {
          showNotification('Content updated', 'success');
        }
      }
    }
  }, [value]);

  const showNotification = (message: string, type: 'success' | 'warning' | 'error') => {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `solumind-notification solumind-notification-${type}`;
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    
    // Add classes for different notification types
    if (type === 'success') {
      notification.style.backgroundColor = '#4CAF50';
      notification.style.color = 'white';
    } else if (type === 'warning') {
      notification.style.backgroundColor = '#FF9800';
      notification.style.color = 'white';
    } else if (type === 'error') {
      notification.style.backgroundColor = '#F44336';
      notification.style.color = 'white';
    }
    
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '5px';
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after delay
    setTimeout(() => {
      notification.classList.add('solumind-notification-hide');
      notification.style.opacity = '0';
      notification.style.transition = 'opacity 300ms ease-out';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  return (
    <div 
      ref={editorRef} 
      style={{ 
        height, 
        border: "1px solid #e5e7eb", 
        borderRadius: 8, 
        background: "#fff",
        position: "relative",
        overflow: "hidden"
      }} 
      className="solumind-editor-container"
    />
  );
};

export default SolumindEditorComponent;
