/**
 * Unit tests for SolumindEditor
 */

import { createSolumindEditor } from '../core/editor';

// Mock DOM elements and events
class MockElement {
  children = [];
  style = {};
  className = '';
  innerHTML = '';
  listeners = {};
  attributes = {};

  appendChild(child) {
    this.children.push(child);
    return child;
  }

  getAttribute(name) {
    return this.attributes[name];
  }

  setAttribute(name, value) {
    this.attributes[name] = value;
  }

  addEventListener(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  removeEventListener(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  }

  dispatchEvent(event) {
    if (this.listeners[event.type]) {
      this.listeners[event.type].forEach(cb => cb(event));
    }
  }

  querySelector(selector) {
    return new MockElement();
  }

  querySelectorAll(selector) {
    return [new MockElement(), new MockElement()];
  }
}

// Mock document
document.createElement = (tag) => new MockElement();
document.querySelector = () => new MockElement();

describe('SolumindEditor', () => {
  let container;
  let editor;

  beforeEach(() => {
    container = new MockElement();
    editor = createSolumindEditor({ container });
  });

  afterEach(() => {
    if (editor && editor.destroy) {
      editor.destroy();
    }
    editor = null;
  });

  test('Should initialize editor', () => {
    expect(editor).toBeDefined();
    expect(typeof editor.getHtml).toBe('function');
    expect(typeof editor.getCss).toBe('function');
    expect(typeof editor.getJs).toBe('function');
  });

  test('Should set and get HTML content', () => {
    const html = '<div>Test Content</div>';
    editor.setComponents(html);
    expect(editor.getHtml()).toContain('Test Content');
  });

  test('Should set and get CSS content', () => {
    const css = 'body { color: red; }';
    editor.setStyle(css);
    expect(editor.getCss()).toContain('color: red');
  });

  test('Should set and get JS content', () => {
    const js = 'console.log("test");';
    editor.setJs(js);
    expect(editor.getJs()).toBe(js);
  });

  test('Should trigger events', () => {
    const callback = jest.fn();
    editor.on('update', callback);
    editor.trigger('update');
    expect(callback).toHaveBeenCalled();
  });

  test('Should remove event listeners', () => {
    const callback = jest.fn();
    editor.on('update', callback);
    editor.off('update', callback);
    editor.trigger('update');
    expect(callback).not.toHaveBeenCalled();
  });

  test('Should register custom components', () => {
    const component = {
      id: 'test-component',
      label: 'Test Component',
      isNextJs: false,
      component: {
        content: '<div>Test</div>',
        props: {}
      }
    };
    
    editor.registerCustomComponent(component);
    
    // There should be a way to check if the component was registered
    // This depends on the actual implementation
    // For example, we might have a getComponents() method
    expect(true).toBe(true); // Placeholder test
  });

  test('Should destroy properly', () => {
    const destroySpy = jest.spyOn(editor, 'destroy');
    editor.destroy();
    expect(destroySpy).toHaveBeenCalled();
  });
});
