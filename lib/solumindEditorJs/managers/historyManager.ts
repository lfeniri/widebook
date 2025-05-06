/**
 * History Manager for SolumindEditor
 * Handles undo/redo functionality
 */

import { SolumindEditor } from '../types';

interface HistoryItem {
  html: string;
  css: string;
  js: string;
  timestamp: number;
}

export function setupHistoryManager(editor: SolumindEditor): void {
  // History stack
  const undoStack: HistoryItem[] = [];
  const redoStack: HistoryItem[] = [];
  
  // Maximum history items to store
  const maxHistory = 50;
  
  // Flag to prevent recording history during undo/redo operations
  let isUndoRedoOperation = false;
  
  // Debounce timeout
  let debounceTimeout: number | null = null;
  const debounceTime = 500; // ms
  
  // Save current state to history
  function saveState(): void {
    // Don't record if we're in the middle of an undo/redo operation
    if (isUndoRedoOperation) return;
    
    // Clear any pending debounce
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    
    // Debounce to avoid saving too many states in rapid succession
    debounceTimeout = setTimeout(() => {
      const currentState: HistoryItem = {
        html: editor.getHtml(),
        css: editor.getCss(),
        js: editor.getJs(),
        timestamp: Date.now(),
      };
      
      // Add to undo stack
      undoStack.push(currentState);
      
      // Clear redo stack when a new action is performed
      redoStack.length = 0;
      
      // Limit stack size
      while (undoStack.length > maxHistory) {
        undoStack.shift();
      }
      
      // Trigger history update event
      editor.trigger('history:update', { 
        canUndo: undoStack.length > 0,
        canRedo: redoStack.length > 0
      });
    }, debounceTime);
  }
  
  // Perform undo operation
  function undo(): void {
    if (undoStack.length === 0) return;
    
    // Mark that we're performing an undo/redo operation
    isUndoRedoOperation = true;
    
    // Get current state before undoing
    const currentState: HistoryItem = {
      html: editor.getHtml(),
      css: editor.getCss(),
      js: editor.getJs(),
      timestamp: Date.now(),
    };
    
    // Save current state to redo stack
    redoStack.push(currentState);
    
    // Get previous state
    const previousState = undoStack.pop();
    
    if (previousState) {
      // Restore previous state
      editor.setComponents(previousState.html);
      editor.setStyle(previousState.css);
      if (editor.setJs) {
        editor.setJs(previousState.js);
      }
    }
    
    // End undo/redo operation
    setTimeout(() => {
      isUndoRedoOperation = false;
      
      // Trigger history update event
      editor.trigger('history:update', { 
        canUndo: undoStack.length > 0,
        canRedo: redoStack.length > 0
      });
    }, 0);
  }
  
  // Perform redo operation
  function redo(): void {
    if (redoStack.length === 0) return;
    
    // Mark that we're performing an undo/redo operation
    isUndoRedoOperation = true;
    
    // Get current state before redoing
    const currentState: HistoryItem = {
      html: editor.getHtml(),
      css: editor.getCss(),
      js: editor.getJs(),
      timestamp: Date.now(),
    };
    
    // Save current state to undo stack
    undoStack.push(currentState);
    
    // Get next state
    const nextState = redoStack.pop();
    
    if (nextState) {
      // Restore next state
      editor.setComponents(nextState.html);
      editor.setStyle(nextState.css);
      if (editor.setJs) {
        editor.setJs(nextState.js);
      }
    }
    
    // End undo/redo operation
    setTimeout(() => {
      isUndoRedoOperation = false;
      
      // Trigger history update event
      editor.trigger('history:update', { 
        canUndo: undoStack.length > 0,
        canRedo: redoStack.length > 0
      });
    }, 0);
  }
  
  // Clear history
  function clearHistory(): void {
    undoStack.length = 0;
    redoStack.length = 0;
    
    editor.trigger('history:update', { 
      canUndo: false,
      canRedo: false
    });
  }
  
  // Listen to editor updates
  editor.on('update', saveState);
  
  // Listen for component add events
  editor.on('component:add', saveState);
  
  // Listen for component remove events
  editor.on('component:remove', saveState);
  
  // Listen for style update events
  editor.on('style:update', saveState);
  
  // Add keyboard shortcuts for undo/redo
  function setupKeyboardShortcuts(): void {
    const handleKeyDown = (e: KeyboardEvent): void => {
      // Check if Ctrl/Cmd key is pressed
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      
      // Undo: Ctrl/Cmd + Z
      if (isCtrlOrCmd && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      
      // Redo: Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y
      if ((isCtrlOrCmd && e.key === 'z' && e.shiftKey) || 
          (isCtrlOrCmd && e.key === 'y')) {
        e.preventDefault();
        redo();
      }
    };
    
    // Add event listener
    document.addEventListener('keydown', handleKeyDown);
    
    // Clean up on editor destroy
    editor.on('destroy', () => {
      document.removeEventListener('keydown', handleKeyDown);
    });
  }
  
  // Setup keyboard shortcuts
  setupKeyboardShortcuts();
  
  // Expose API to editor instance
  editor.undo = undo;
  editor.redo = redo;
  editor.clearHistory = clearHistory;
  
  // Take initial snapshot
  saveState();
}
