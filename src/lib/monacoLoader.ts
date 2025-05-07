/**
 * Monaco Editor Loader Utility
 * 
 * This utility ensures Monaco Editor is loaded only once in the application
 * and eliminates the "_amdLoaderGlobal has already been declared" error
 */

// Track Monaco loading state
let isLoading = false;
let isLoaded = false;
const callbacks: Array<() => void> = [];

// Create a global Monaco loader ID to track loading state
const MONACO_LOADER_ID = 'monaco-loader-script';
const MONACO_LOADED_EVENT = 'monaco-editor-loaded';

/**
 * Safely loads Monaco editor once and ensures callbacks are executed
 * when Monaco is ready to use
 */
export function loadMonaco(callback: () => void): void {
  // If Monaco is already loaded, execute callback immediately
  if (typeof window !== 'undefined' && (window as any).monaco) {
    isLoaded = true;
    callback();
    return;
  }

  // Add callback to queue
  callbacks.push(callback);

  // If we're already in the process of loading Monaco, just wait
  if (isLoading) {
    return;
  }
  
  // Mark that we've started loading
  isLoading = true;

  // Add an event listener for our custom event
  document.addEventListener(MONACO_LOADED_EVENT, function monacoLoadHandler() {
    isLoaded = true;
    callbacks.forEach(cb => cb());
    callbacks.length = 0;
    document.removeEventListener(MONACO_LOADED_EVENT, monacoLoadHandler);
  });

  // Check if script is already in the DOM
  if (document.getElementById(MONACO_LOADER_ID)) {
    return; // Script tag already exists, just wait for it to load
  }

  // Create script element for Monaco loader
  const script = document.createElement('script');
  script.id = MONACO_LOADER_ID;
  script.src = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs/loader.js';
  script.async = true;
  
  script.onload = () => {
    // Check if require is available
    if ((window as any).require) {
      // Configure loader
      (window as any).require.config({
        paths: { 
          vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs' 
        }
      });
      
      // Load Monaco editor
      (window as any).require(['vs/editor/editor.main'], () => {
        // Dispatch our custom event when Monaco is loaded
        document.dispatchEvent(new CustomEvent(MONACO_LOADED_EVENT));
      });
    }
  };
  
  // Add script to document
  document.head.appendChild(script);
}

/**
 * Check if Monaco editor has been loaded
 */
export function isMonacoEditorLoaded(): boolean {
  return isLoaded;
}