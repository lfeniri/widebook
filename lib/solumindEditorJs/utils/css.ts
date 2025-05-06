/**
 * CSS Utility Functions for SolumindEditor
 */

/**
 * CSS units for measurements
 */
export const cssUnits = ['px', 'em', 'rem', '%', 'vh', 'vw', 'pt', 'cm', 'mm', 'in', 'pc', 'ch', 'ex', 'vmin', 'vmax'];

/**
 * CSS color names
 */
export const cssColorNames = [
  'transparent', 'currentcolor',
  'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure',
  'beige', 'bisque', 'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood',
  'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan',
  'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey', 'darkkhaki', 'darkmagenta',
  'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue',
  'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray',
  'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite',
  'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'grey', 'honeydew', 'hotpink', 'indianred', 'indigo',
  'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral',
  'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey', 'lightpink', 'lightsalmon',
  'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow',
  'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid',
  'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred',
  'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab',
  'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip',
  'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'rebeccapurple', 'red', 'rosybrown', 'royalblue',
  'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue',
  'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise',
  'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen'
];

/**
 * Parse a CSS value with unit
 */
export function parseCssValue(value: string): { value: number; unit: string } {
  // Handle unitless values
  if (!isNaN(parseFloat(value))) {
    return {
      value: parseFloat(value),
      unit: ''
    };
  }

  const regex = /^([-+]?[0-9]*\.?[0-9]+)([a-z%]*)$/i;
  const matches = value.match(regex);
  
  if (matches && matches.length >= 3) {
    return {
      value: parseFloat(matches[1]),
      unit: matches[2]
    };
  }
  
  return { value: 0, unit: 'px' };
}

/**
 * Format a CSS value with its unit
 */
export function formatCssValue(value: number, unit: string = 'px'): string {
  return `${value}${unit}`;
}

/**
 * Check if a value is a valid CSS color
 */
export function isValidColor(color: string): boolean {
  // Check if it's a named color
  if (cssColorNames.includes(color.toLowerCase())) {
    return true;
  }
  
  // Check for hex color
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(color)) {
    return true;
  }
  
  // Check for rgb/rgba color
  if (/^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/.test(color) ||
      /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(0|1|0?\.\d+)\s*\)$/.test(color)) {
    return true;
  }
  
  // Check for hsl/hsla color
  if (/^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/.test(color) ||
      /^hsla\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*,\s*(0|1|0?\.\d+)\s*\)$/.test(color)) {
    return true;
  }
  
  return false;
}

/**
 * Get CSS property default value
 */
export function getCssPropertyDefault(property: string): string {
  // Create a temporary element
  const el = document.createElement('div');
  document.body.appendChild(el);
  
  // Get the computed style
  const styles = window.getComputedStyle(el);
  const value = styles.getPropertyValue(property);
  
  // Clean up
  document.body.removeChild(el);
  
  return value;
}

/**
 * Parse CSS shorthand properties
 */
export function parseShorthand(value: string, property: 'margin' | 'padding' | 'border-width' | 'border-radius'): Record<string, string> {
  const values = value.trim().split(/\s+/);
  const result: Record<string, string> = {};
  
  let top, right, bottom, left;
  
  switch (values.length) {
    case 1:
      top = right = bottom = left = values[0];
      break;
    case 2:
      top = bottom = values[0];
      right = left = values[1];
      break;
    case 3:
      top = values[0];
      right = left = values[1];
      bottom = values[2];
      break;
    case 4:
      top = values[0];
      right = values[1];
      bottom = values[2];
      left = values[3];
      break;
    default:
      top = right = bottom = left = '0';
  }
  
  switch (property) {
    case 'margin':
      result['margin-top'] = top;
      result['margin-right'] = right;
      result['margin-bottom'] = bottom;
      result['margin-left'] = left;
      break;
    case 'padding':
      result['padding-top'] = top;
      result['padding-right'] = right;
      result['padding-bottom'] = bottom;
      result['padding-left'] = left;
      break;
    case 'border-width':
      result['border-top-width'] = top;
      result['border-right-width'] = right;
      result['border-bottom-width'] = bottom;
      result['border-left-width'] = left;
      break;
    case 'border-radius':
      result['border-top-left-radius'] = top;
      result['border-top-right-radius'] = right;
      result['border-bottom-right-radius'] = bottom;
      result['border-bottom-left-radius'] = left;
      break;
  }
  
  return result;
}

/**
 * Create shorthand CSS property from individual values
 */
export function createShorthand(values: Record<string, string>, property: 'margin' | 'padding' | 'border-width' | 'border-radius'): string {
  let top, right, bottom, left;
  
  switch (property) {
    case 'margin':
      top = values['margin-top'] || '0';
      right = values['margin-right'] || '0';
      bottom = values['margin-bottom'] || '0';
      left = values['margin-left'] || '0';
      break;
    case 'padding':
      top = values['padding-top'] || '0';
      right = values['padding-right'] || '0';
      bottom = values['padding-bottom'] || '0';
      left = values['padding-left'] || '0';
      break;
    case 'border-width':
      top = values['border-top-width'] || '0';
      right = values['border-right-width'] || '0';
      bottom = values['border-bottom-width'] || '0';
      left = values['border-left-width'] || '0';
      break;
    case 'border-radius':
      top = values['border-top-left-radius'] || '0';
      right = values['border-top-right-radius'] || '0';
      bottom = values['border-bottom-right-radius'] || '0';
      left = values['border-bottom-left-radius'] || '0';
      break;
    default:
      return '';
  }
  
  // Simplify the output when possible
  if (top === right && right === bottom && bottom === left) {
    return top; // All sides are equal
  }
  
  if (top === bottom && right === left) {
    return `${top} ${right}`; // Vertical/horizontal pairs are equal
  }
  
  if (right === left) {
    return `${top} ${right} ${bottom}`; // Left and right are equal
  }
  
  return `${top} ${right} ${bottom} ${left}`;
}

/**
 * Check if a property is inheritable
 */
export function isInheritedProperty(property: string): boolean {
  const inheritedProperties = [
    'color', 'font', 'font-family', 'font-size', 'font-style', 'font-variant', 'font-weight',
    'font-size-adjust', 'font-stretch', 'letter-spacing', 'line-height', 'text-align',
    'text-indent', 'text-transform', 'white-space', 'word-spacing', 'cursor', 'direction',
    'visibility', 'border-collapse', 'border-spacing', 'caption-side', 'empty-cells',
    'list-style', 'list-style-image', 'list-style-position', 'list-style-type',
    'quotes', 'orphans', 'page-break-inside', 'page-break-after', 'page-break-before',
    'widows', 'text-decoration-color', 'text-shadow'
  ];
  
  return inheritedProperties.includes(property) || 
         property.startsWith('font-') || 
         property.startsWith('text-');
}

/**
 * Parse a CSS string into a stylesheet object
 */
export function parseCss(css: string): Record<string, Record<string, string>> {
  const result: Record<string, Record<string, string>> = {};
  
  // Remove comments
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');
  
  // Split into rules
  const rules = css.match(/[^{]*\{[^}]*\}/g) || [];
  
  rules.forEach(rule => {
    // Split selector and declaration block
    const [selectorPart, declarationPart] = rule.split('{');
    const selector = selectorPart.trim();
    
    if (selector && declarationPart) {
      // Remove closing brace and split declarations
      const declarations = declarationPart.replace('}', '').trim().split(';');
      
      result[selector] = {};
      
      declarations.forEach(declaration => {
        const [property, value] = declaration.split(':');
        if (property && value) {
          result[selector][property.trim()] = value.trim();
        }
      });
    }
  });
  
  return result;
}

/**
 * Generate CSS string from stylesheet object
 */
export function generateCss(stylesheet: Record<string, Record<string, string>>): string {
  let result = '';
  
  Object.entries(stylesheet).forEach(([selector, declarations]) => {
    if (Object.keys(declarations).length > 0) {
      result += `${selector} {\n`;
      
      Object.entries(declarations).forEach(([property, value]) => {
        result += `  ${property}: ${value};\n`;
      });
      
      result += '}\n\n';
    }
  });
  
  return result;
}

/**
 * Generate TailwindCSS classes from CSS properties
 */
export function cssToTailwind(cssProperties: Record<string, string>): string[] {
  const classes: string[] = [];
  
  Object.entries(cssProperties).forEach(([property, value]) => {
    switch (property) {
      case 'display':
        classes.push(value);
        break;
      case 'margin':
        classes.push(`m-${value.replace('px', '')}`);
        break;
      case 'margin-top':
        classes.push(`mt-${value.replace('px', '')}`);
        break;
      case 'margin-right':
        classes.push(`mr-${value.replace('px', '')}`);
        break;
      case 'margin-bottom':
        classes.push(`mb-${value.replace('px', '')}`);
        break;
      case 'margin-left':
        classes.push(`ml-${value.replace('px', '')}`);
        break;
      case 'padding':
        classes.push(`p-${value.replace('px', '')}`);
        break;
      case 'padding-top':
        classes.push(`pt-${value.replace('px', '')}`);
        break;
      case 'padding-right':
        classes.push(`pr-${value.replace('px', '')}`);
        break;
      case 'padding-bottom':
        classes.push(`pb-${value.replace('px', '')}`);
        break;
      case 'padding-left':
        classes.push(`pl-${value.replace('px', '')}`);
        break;
      case 'font-weight':
        switch (value) {
          case 'normal': classes.push('font-normal'); break;
          case 'bold': classes.push('font-bold'); break;
          case '100': classes.push('font-thin'); break;
          case '200': classes.push('font-extralight'); break;
          case '300': classes.push('font-light'); break;
          case '400': classes.push('font-normal'); break;
          case '500': classes.push('font-medium'); break;
          case '600': classes.push('font-semibold'); break;
          case '700': classes.push('font-bold'); break;
          case '800': classes.push('font-extrabold'); break;
          case '900': classes.push('font-black'); break;
        }
        break;
      case 'font-size':
        if (value === '12px') classes.push('text-xs');
        else if (value === '14px') classes.push('text-sm');
        else if (value === '16px') classes.push('text-base');
        else if (value === '18px') classes.push('text-lg');
        else if (value === '20px') classes.push('text-xl');
        else if (value === '24px') classes.push('text-2xl');
        else if (value === '30px') classes.push('text-3xl');
        else if (value === '36px') classes.push('text-4xl');
        else if (value === '48px') classes.push('text-5xl');
        else if (value === '60px') classes.push('text-6xl');
        else if (value === '72px') classes.push('text-7xl');
        else if (value === '96px') classes.push('text-8xl');
        else if (value === '128px') classes.push('text-9xl');
        break;
      case 'text-align':
        classes.push(`text-${value}`);
        break;
      case 'color':
        if (value === '#ffffff') classes.push('text-white');
        else if (value === '#000000') classes.push('text-black');
        else classes.push(`text-[${value}]`);
        break;
      case 'background-color':
        if (value === '#ffffff') classes.push('bg-white');
        else if (value === '#000000') classes.push('bg-black');
        else classes.push(`bg-[${value}]`);
        break;
      case 'border':
        classes.push('border');
        break;
      case 'border-width':
        classes.push(`border-${value.replace('px', '')}`);
        break;
      case 'border-radius':
        if (value === '0px') classes.push('rounded-none');
        else if (value === '4px') classes.push('rounded');
        else if (value === '8px') classes.push('rounded-md');
        else if (value === '12px') classes.push('rounded-lg');
        else if (value === '16px') classes.push('rounded-xl');
        else if (value === '24px') classes.push('rounded-2xl');
        else if (value === '9999px') classes.push('rounded-full');
        else classes.push(`rounded-[${value}]`);
        break;
      case 'width':
        if (value === '100%') classes.push('w-full');
        else if (value === 'auto') classes.push('w-auto');
        else classes.push(`w-[${value}]`);
        break;
      case 'height':
        if (value === '100%') classes.push('h-full');
        else if (value === 'auto') classes.push('h-auto');
        else classes.push(`h-[${value}]`);
        break;
      case 'flex-direction':
        if (value === 'row') classes.push('flex-row');
        else if (value === 'column') classes.push('flex-col');
        break;
      case 'justify-content':
        if (value === 'flex-start') classes.push('justify-start');
        else if (value === 'flex-end') classes.push('justify-end');
        else if (value === 'center') classes.push('justify-center');
        else if (value === 'space-between') classes.push('justify-between');
        else if (value === 'space-around') classes.push('justify-around');
        else if (value === 'space-evenly') classes.push('justify-evenly');
        break;
      case 'align-items':
        if (value === 'flex-start') classes.push('items-start');
        else if (value === 'flex-end') classes.push('items-end');
        else if (value === 'center') classes.push('items-center');
        else if (value === 'stretch') classes.push('items-stretch');
        else if (value === 'baseline') classes.push('items-baseline');
        break;
    }
  });
  
  return classes;
}
