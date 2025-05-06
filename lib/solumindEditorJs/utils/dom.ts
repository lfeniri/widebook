/**
 * Utility functions for SolumindEditor
 */

/**
 * Generate a unique ID
 */
export function generateId(prefix: string = 'solumind'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Check if an element is in the viewport
 */
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Get element position relative to parent
 */
export function getRelativePosition(element: HTMLElement, parent: HTMLElement): { x: number, y: number } {
  const parentRect = parent.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  
  return {
    x: elementRect.left - parentRect.left,
    y: elementRect.top - parentRect.top
  };
}

/**
 * Debounce function execution
 */
export function debounce<F extends (...args: any[]) => any>(
  func: F, 
  wait: number
): (...args: Parameters<F>) => void {
  let timeout: number | null = null;
  
  return function(...args: Parameters<F>): void {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Format HTML code for better readability
 */
export function formatHtml(html: string): string {
  let formatted = '';
  let indent = 0;
  
  // Helper function to get indentation string
  const getIndent = (count: number): string => '  '.repeat(count);
  
  // Split HTML by tags
  const parts = html.split(/(<\/?[^>]+>)/);
  
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].trim();
    if (!part) continue;
    
    if (part.startsWith('</')) {
      // Closing tag
      indent--;
      formatted += getIndent(indent) + part + '\n';
    } else if (part.startsWith('<') && !part.startsWith('<!') && !part.endsWith('/>')) {
      // Opening tag
      formatted += getIndent(indent) + part + '\n';
      indent++;
    } else if (part.startsWith('<') || part.endsWith('/>') || part.startsWith('<!')) {
      // Self-closing tag or comment
      formatted += getIndent(indent) + part + '\n';
    } else {
      // Text content
      formatted += getIndent(indent) + part + '\n';
    }
  }
  
  return formatted;
}

/**
 * Format CSS code for better readability
 */
export function formatCss(css: string): string {
  // Remove extra spaces and newlines
  css = css.replace(/\s+/g, ' ').trim();
  
  // Add newline after closing bracket
  css = css.replace(/}/g, '}\n');
  
  // Add newline after semicolon in media queries
  css = css.replace(/;(?=[^}]*{)/g, ';\n  ');
  
  // Format each rule
  const rules = css.split('\n');
  let formatted = '';
  let indent = 0;
  
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i].trim();
    if (!rule) continue;
    
    if (rule.includes('{')) {
      // Opening block
      const selector = rule.split('{')[0].trim();
      const rest = rule.split('{').slice(1).join('{').trim();
      
      formatted += '  '.repeat(indent) + selector + ' {\n';
      indent++;
      
      // Format properties
      if (rest) {
        const props = rest.replace('}', '').split(';');
        for (let prop of props) {
          prop = prop.trim();
          if (prop) {
            formatted += '  '.repeat(indent) + prop + ';\n';
          }
        }
      }
    }
    
    if (rule.includes('}')) {
      // Closing block
      indent = Math.max(0, indent - 1);
      formatted += '  '.repeat(indent) + '}\n';
    }
  }
  
  return formatted;
}

/**
 * Format JavaScript code for better readability
 * (simplistic version - for real formatting, consider using a library)
 */
export function formatJs(js: string): string {
  // Remove extra spaces and newlines
  js = js.trim();
  
  // Simple indentation based on braces
  let formatted = '';
  let indent = 0;
  let inString = '';  // Keeps track of string delimiters
  
  for (let i = 0; i < js.length; i++) {
    const char = js[i];
    const nextChar = js[i + 1] || '';
    
    // Handle strings to avoid formatting their contents
    if ((char === "'" || char === '"' || char === '`') && 
        (i === 0 || js[i - 1] !== '\\')) {
      if (!inString) {
        inString = char;
      } else if (inString === char) {
        inString = '';
      }
    }
    
    // Only apply formatting when not inside a string
    if (!inString) {
      if (char === '{' || char === '[') {
        formatted += char;
        
        // Don't add newline after { in object property shorthand
        if (!(char === '{' && 
             (js.substring(i - 3, i).includes('${') || 
              js.substring(i - 2, i).includes('${')))) {
          formatted += '\n' + '  '.repeat(++indent);
        }
        continue;
      }
      
      if (char === '}' || char === ']') {
        formatted += '\n' + '  '.repeat(--indent) + char;
        continue;
      }
      
      if (char === ';') {
        formatted += char;
        if (nextChar !== '}' && nextChar !== ']') {
          formatted += '\n' + '  '.repeat(indent);
        }
        continue;
      }
      
      if (char === '\n') {
        formatted += '\n' + '  '.repeat(indent);
        continue;
      }
    }
    
    formatted += char;
  }
  
  return formatted;
}

/**
 * Escape HTML to prevent XSS
 */
export function escapeHtml(html: string): string {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Parse HTML string into DOM elements
 */
export function parseHtml(html: string): DocumentFragment {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content;
}

/**
 * Create an HTML element with attributes and children
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  attributes: Record<string, string> = {},
  children?: (string | Node)[]
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tagName);
  
  // Set attributes
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  
  // Append children
  if (children) {
    children.forEach(child => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });
  }
  
  return element;
}

/**
 * Add event listener with automatic cleanup
 */
export function addEventListenerWithCleanup(
  element: HTMLElement | Window | Document,
  eventType: string,
  handler: EventListenerOrEventListenerObject,
  options?: AddEventListenerOptions
): () => void {
  element.addEventListener(eventType, handler, options);
  
  return () => {
    element.removeEventListener(eventType, handler, options);
  };
}

/**
 * Compute the z-index of an element
 */
export function getZIndex(element: HTMLElement): number {
  const zIndex = window.getComputedStyle(element).zIndex;
  return zIndex === 'auto' ? 0 : parseInt(zIndex, 10);
}

/**
 * Convert RGB to HEX color
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b]
    .map(x => Math.max(0, Math.min(255, Math.round(x)))
    .toString(16)
    .padStart(2, '0'))
    .join('');
}

/**
 * Convert HEX to RGB color
 */
export function hexToRgb(hex: string): { r: number, g: number, b: number } | null {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
