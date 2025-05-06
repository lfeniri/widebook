/**
 * Style Manager for SolumindEditor
 */

import { SolumindEditor, StyleProperty, StyleSector } from '../types';

export function setupStyleManager(
  stylesContainer: HTMLElement,
  editor: SolumindEditor,
): void {
  // Default style sectors and properties
  const defaultSectors: StyleSector[] = [
    {
      id: 'dimension',
      name: 'Dimension',
      open: true,
      properties: [
        {
          id: 'width',
          name: 'Width',
          type: 'text',
          units: ['px', '%', 'vw', 'em', 'rem', 'auto'],
        },
        {
          id: 'height',
          name: 'Height',
          type: 'text',
          units: ['px', '%', 'vh', 'em', 'rem', 'auto'],
        },
        {
          id: 'max-width',
          name: 'Max Width',
          type: 'text',
          units: ['px', '%', 'vw', 'em', 'rem', 'none'],
        },
        {
          id: 'max-height',
          name: 'Max Height',
          type: 'text',
          units: ['px', '%', 'vh', 'em', 'rem', 'none'],
        },
        {
          id: 'min-width',
          name: 'Min Width',
          type: 'text',
          units: ['px', '%', 'vw', 'em', 'rem'],
        },
        {
          id: 'min-height',
          name: 'Min Height',
          type: 'text',
          units: ['px', '%', 'vh', 'em', 'rem'],
        },
      ],
    },
    {
      id: 'position',
      name: 'Position',
      properties: [
        {
          id: 'position',
          name: 'Position',
          type: 'select',
          options: [
            { id: 'static', label: 'Static' },
            { id: 'relative', label: 'Relative' },
            { id: 'absolute', label: 'Absolute' },
            { id: 'fixed', label: 'Fixed' },
            { id: 'sticky', label: 'Sticky' },
          ],
        },
        {
          id: 'top',
          name: 'Top',
          type: 'text',
          units: ['px', '%', 'em', 'rem', 'auto'],
        },
        {
          id: 'right',
          name: 'Right',
          type: 'text',
          units: ['px', '%', 'em', 'rem', 'auto'],
        },
        {
          id: 'bottom',
          name: 'Bottom',
          type: 'text',
          units: ['px', '%', 'em', 'rem', 'auto'],
        },
        {
          id: 'left',
          name: 'Left',
          type: 'text',
          units: ['px', '%', 'em', 'rem', 'auto'],
        },
        {
          id: 'z-index',
          name: 'Z-index',
          type: 'number',
        },
      ],
    },
    {
      id: 'typography',
      name: 'Typography',
      properties: [
        {
          id: 'font-family',
          name: 'Font',
          type: 'select',
          options: [
            { id: 'Arial, sans-serif', label: 'Arial' },
            { id: 'Helvetica, sans-serif', label: 'Helvetica' },
            { id: 'Georgia, serif', label: 'Georgia' },
            { id: 'Times New Roman, serif', label: 'Times New Roman' },
            { id: 'Courier New, monospace', label: 'Courier New' },
            { id: 'Verdana, sans-serif', label: 'Verdana' },
            { id: 'system-ui, sans-serif', label: 'System UI' },
          ],
        },
        {
          id: 'font-size',
          name: 'Size',
          type: 'text',
          units: ['px', 'em', 'rem', '%'],
        },
        {
          id: 'font-weight',
          name: 'Weight',
          type: 'select',
          options: [
            { id: '100', label: '100 (Thin)' },
            { id: '200', label: '200 (Extra Light)' },
            { id: '300', label: '300 (Light)' },
            { id: '400', label: '400 (Normal)' },
            { id: '500', label: '500 (Medium)' },
            { id: '600', label: '600 (Semi Bold)' },
            { id: '700', label: '700 (Bold)' },
            { id: '800', label: '800 (Extra Bold)' },
            { id: '900', label: '900 (Black)' },
          ],
        },
        {
          id: 'text-align',
          name: 'Alignment',
          type: 'radio',
          options: [
            { id: 'left', label: 'Left' },
            { id: 'center', label: 'Center' },
            { id: 'right', label: 'Right' },
            { id: 'justify', label: 'Justify' },
          ],
        },
        {
          id: 'line-height',
          name: 'Line Height',
          type: 'text',
          units: ['', 'px', 'em', 'rem'],
        },
        {
          id: 'letter-spacing',
          name: 'Letter Spacing',
          type: 'text',
          units: ['px', 'em', 'rem'],
        },
        {
          id: 'text-decoration',
          name: 'Decoration',
          type: 'select',
          options: [
            { id: 'none', label: 'None' },
            { id: 'underline', label: 'Underline' },
            { id: 'overline', label: 'Overline' },
            { id: 'line-through', label: 'Line Through' },
          ],
        },
        {
          id: 'text-transform',
          name: 'Transform',
          type: 'select',
          options: [
            { id: 'none', label: 'None' },
            { id: 'capitalize', label: 'Capitalize' },
            { id: 'uppercase', label: 'Uppercase' },
            { id: 'lowercase', label: 'Lowercase' },
          ],
        },
        {
          id: 'font-style',
          name: 'Style',
          type: 'select',
          options: [
            { id: 'normal', label: 'Normal' },
            { id: 'italic', label: 'Italic' },
            { id: 'oblique', label: 'Oblique' },
          ],
        },
      ],
    },
    {
      id: 'decoration',
      name: 'Decoration',
      properties: [
        {
          id: 'background-color',
          name: 'Background Color',
          type: 'color',
        },
        {
          id: 'color',
          name: 'Text Color',
          type: 'color',
        },
        {
          id: 'border-style',
          name: 'Border Style',
          type: 'select',
          options: [
            { id: 'none', label: 'None' },
            { id: 'solid', label: 'Solid' },
            { id: 'dotted', label: 'Dotted' },
            { id: 'dashed', label: 'Dashed' },
            { id: 'double', label: 'Double' },
            { id: 'groove', label: 'Groove' },
            { id: 'ridge', label: 'Ridge' },
            { id: 'inset', label: 'Inset' },
            { id: 'outset', label: 'Outset' },
          ],
        },
        {
          id: 'border-width',
          name: 'Border Width',
          type: 'text',
          units: ['px', 'em', 'rem'],
        },
        {
          id: 'border-color',
          name: 'Border Color',
          type: 'color',
        },
        {
          id: 'border-radius',
          name: 'Border Radius',
          type: 'text',
          units: ['px', 'em', 'rem', '%'],
        },
        {
          id: 'box-shadow',
          name: 'Box Shadow',
          type: 'composite',
        },
        {
          id: 'opacity',
          name: 'Opacity',
          type: 'slider',
        },
      ],
    },
    {
      id: 'spacing',
      name: 'Spacing',
      properties: [
        {
          id: 'margin-top',
          name: 'Margin Top',
          type: 'text',
          units: ['px', 'em', 'rem', '%'],
        },
        {
          id: 'margin-right',
          name: 'Margin Right',
          type: 'text',
          units: ['px', 'em', 'rem', '%'],
        },
        {
          id: 'margin-bottom',
          name: 'Margin Bottom',
          type: 'text',
          units: ['px', 'em', 'rem', '%'],
        },
        {
          id: 'margin-left',
          name: 'Margin Left',
          type: 'text',
          units: ['px', 'em', 'rem', '%'],
        },
        {
          id: 'padding-top',
          name: 'Padding Top',
          type: 'text',
          units: ['px', 'em', 'rem', '%'],
        },
        {
          id: 'padding-right',
          name: 'Padding Right',
          type: 'text',
          units: ['px', 'em', 'rem', '%'],
        },
        {
          id: 'padding-bottom',
          name: 'Padding Bottom',
          type: 'text',
          units: ['px', 'em', 'rem', '%'],
        },
        {
          id: 'padding-left',
          name: 'Padding Left',
          type: 'text',
          units: ['px', 'em', 'rem', '%'],
        },
      ],
    },
    {
      id: 'flex',
      name: 'Flex',
      properties: [
        {
          id: 'display',
          name: 'Display',
          type: 'select',
          options: [
            { id: 'block', label: 'Block' },
            { id: 'inline', label: 'Inline' },
            { id: 'inline-block', label: 'Inline Block' },
            { id: 'flex', label: 'Flex' },
            { id: 'inline-flex', label: 'Inline Flex' },
            { id: 'grid', label: 'Grid' },
            { id: 'none', label: 'None' },
          ],
        },
        {
          id: 'flex-direction',
          name: 'Direction',
          type: 'select',
          options: [
            { id: 'row', label: 'Row' },
            { id: 'row-reverse', label: 'Row Reverse' },
            { id: 'column', label: 'Column' },
            { id: 'column-reverse', label: 'Column Reverse' },
          ],
        },
        {
          id: 'flex-wrap',
          name: 'Wrap',
          type: 'select',
          options: [
            { id: 'nowrap', label: 'No Wrap' },
            { id: 'wrap', label: 'Wrap' },
            { id: 'wrap-reverse', label: 'Wrap Reverse' },
          ],
        },
        {
          id: 'justify-content',
          name: 'Justify Content',
          type: 'select',
          options: [
            { id: 'flex-start', label: 'Start' },
            { id: 'flex-end', label: 'End' },
            { id: 'center', label: 'Center' },
            { id: 'space-between', label: 'Space Between' },
            { id: 'space-around', label: 'Space Around' },
            { id: 'space-evenly', label: 'Space Evenly' },
          ],
        },
        {
          id: 'align-items',
          name: 'Align Items',
          type: 'select',
          options: [
            { id: 'flex-start', label: 'Start' },
            { id: 'flex-end', label: 'End' },
            { id: 'center', label: 'Center' },
            { id: 'baseline', label: 'Baseline' },
            { id: 'stretch', label: 'Stretch' },
          ],
        },
        {
          id: 'align-content',
          name: 'Align Content',
          type: 'select',
          options: [
            { id: 'flex-start', label: 'Start' },
            { id: 'flex-end', label: 'End' },
            { id: 'center', label: 'Center' },
            { id: 'space-between', label: 'Space Between' },
            { id: 'space-around', label: 'Space Around' },
            { id: 'stretch', label: 'Stretch' },
          ],
        },
        {
          id: 'flex-grow',
          name: 'Grow',
          type: 'number',
        },
        {
          id: 'flex-shrink',
          name: 'Shrink',
          type: 'number',
        },
        {
          id: 'flex-basis',
          name: 'Basis',
          type: 'text',
          units: ['px', '%', 'em', 'rem', 'auto'],
        },
        {
          id: 'align-self',
          name: 'Align Self',
          type: 'select',
          options: [
            { id: 'auto', label: 'Auto' },
            { id: 'flex-start', label: 'Start' },
            { id: 'flex-end', label: 'End' },
            { id: 'center', label: 'Center' },
            { id: 'baseline', label: 'Baseline' },
            { id: 'stretch', label: 'Stretch' },
          ],
        },
        {
          id: 'order',
          name: 'Order',
          type: 'number',
        },
      ],
    },
    {
      id: 'grid',
      name: 'Grid',
      properties: [
        {
          id: 'grid-template-columns',
          name: 'Template Columns',
          type: 'text',
        },
        {
          id: 'grid-template-rows',
          name: 'Template Rows',
          type: 'text',
        },
        {
          id: 'grid-template-areas',
          name: 'Template Areas',
          type: 'text',
        },
        {
          id: 'grid-gap',
          name: 'Gap',
          type: 'text',
          units: ['px', 'em', 'rem', '%'],
        },
        {
          id: 'grid-column-gap',
          name: 'Column Gap',
          type: 'text',
          units: ['px', 'em', 'rem', '%'],
        },
        {
          id: 'grid-row-gap',
          name: 'Row Gap',
          type: 'text',
          units: ['px', 'em', 'rem', '%'],
        },
      ],
    },
    {
      id: 'transition',
      name: 'Transition',
      properties: [
        {
          id: 'transition-property',
          name: 'Property',
          type: 'text',
        },
        {
          id: 'transition-duration',
          name: 'Duration',
          type: 'text',
          units: ['s', 'ms'],
        },
        {
          id: 'transition-timing-function',
          name: 'Timing',
          type: 'select',
          options: [
            { id: 'ease', label: 'Ease' },
            { id: 'linear', label: 'Linear' },
            { id: 'ease-in', label: 'Ease In' },
            { id: 'ease-out', label: 'Ease Out' },
            { id: 'ease-in-out', label: 'Ease In Out' },
          ],
        },
        {
          id: 'transition-delay',
          name: 'Delay',
          type: 'text',
          units: ['s', 'ms'],
        },
      ],
    },
    {
      id: 'transform',
      name: 'Transform',
      properties: [
        {
          id: 'transform',
          name: 'Transform Functions',
          type: 'text',
        },
        {
          id: 'transform-origin',
          name: 'Origin',
          type: 'text',
        },
      ],
    },
  ];

  // Current selected element
  let selectedElement: HTMLElement | null = null;
  
  // Initialize the style manager
  function initStyleManager(): void {
    // Create style manager container
    const styleManager = document.createElement('div');
    styleManager.className = 'solumind-style-manager';
    
    // Create style manager header
    const header = document.createElement('div');
    header.className = 'solumind-style-manager-header';
    header.innerHTML = `<h3>Styles</h3>`;
    
    // Create style sectors container
    const sectorsContainer = document.createElement('div');
    sectorsContainer.className = 'solumind-style-sectors';
    
    // Create empty selection message
    const emptyMessage = document.createElement('div');
    emptyMessage.className = 'solumind-style-empty-message';
    emptyMessage.textContent = 'Select an element to edit its styles';
    
    // Append elements to style manager
    styleManager.appendChild(header);
    styleManager.appendChild(emptyMessage);
    styleManager.appendChild(sectorsContainer);
    
    // Append style manager to container
    stylesContainer.appendChild(styleManager);
    
    // Create sectors
    createStyleSectors(sectorsContainer);
    
    // Hide sectors initially (until an element is selected)
    sectorsContainer.style.display = 'none';
  }
  
  // Create style sectors
  function createStyleSectors(container: HTMLElement): void {
    defaultSectors.forEach(sector => {
      const sectorElement = createSector(sector);
      container.appendChild(sectorElement);
    });
  }
  
  // Create a single sector with its properties
  function createSector(sector: StyleSector): HTMLElement {
    const sectorElement = document.createElement('div');
    sectorElement.className = `solumind-style-sector ${sector.open ? 'open' : ''}`;
    sectorElement.setAttribute('data-sector-id', sector.id);
    
    // Create sector header
    const sectorHeader = document.createElement('div');
    sectorHeader.className = 'solumind-style-sector-header';
    sectorHeader.innerHTML = `
      <h4>${sector.name}</h4>
      <span class="solumind-style-sector-toggle">${sector.open ? '▼' : '►'}</span>
    `;
    
    // Create sector content
    const sectorContent = document.createElement('div');
    sectorContent.className = 'solumind-style-sector-content';
    
    // Toggle sector content on header click
    sectorHeader.addEventListener('click', () => {
      sectorElement.classList.toggle('open');
      const toggle = sectorHeader.querySelector('.solumind-style-sector-toggle');
      if (toggle) {
        toggle.textContent = sectorElement.classList.contains('open') ? '▼' : '►';
      }
    });
    
    // Create properties
    if (sector.properties && sector.properties.length) {
      sector.properties.forEach(property => {
        const propertyElement = createProperty(property);
        sectorContent.appendChild(propertyElement);
      });
    }
    
    // Append elements to sector
    sectorElement.appendChild(sectorHeader);
    sectorElement.appendChild(sectorContent);
    
    return sectorElement;
  }
  
  // Create a single property input
  function createProperty(property: StyleProperty): HTMLElement {
    const propertyElement = document.createElement('div');
    propertyElement.className = 'solumind-style-property';
    propertyElement.setAttribute('data-property-id', property.id);
    
    // Create property label
    const label = document.createElement('label');
    label.className = 'solumind-style-property-label';
    label.textContent = property.name;
    
    // Create property input
    const inputContainer = document.createElement('div');
    inputContainer.className = 'solumind-style-property-input';
    
    let input: HTMLElement;
    
    // Create input based on property type
    switch (property.type) {
      case 'text':
        input = createTextInput(property);
        break;
      case 'number':
        input = createNumberInput(property);
        break;
      case 'color':
        input = createColorInput(property);
        break;
      case 'select':
        input = createSelectInput(property);
        break;
      case 'radio':
        input = createRadioInput(property);
        break;
      case 'checkbox':
        input = createCheckboxInput(property);
        break;
      case 'slider':
        input = createSliderInput(property);
        break;
      case 'composite':
        input = createCompositeInput(property);
        break;
      default:
        input = createTextInput(property);
    }
    
    // Add input to container
    inputContainer.appendChild(input);
    
    // Append elements to property
    propertyElement.appendChild(label);
    propertyElement.appendChild(inputContainer);
    
    return propertyElement;
  }
  
  // Create a text input with units
  function createTextInput(property: StyleProperty): HTMLElement {
    const container = document.createElement('div');
    container.className = 'solumind-input-group';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'solumind-input solumind-text-input';
    input.setAttribute('data-property', property.id);
    
    // Add change handler to update styles
    input.addEventListener('input', () => {
      if (selectedElement) {
        // Get selected unit if available
        const unitSelect = container.querySelector('.solumind-unit-select') as HTMLSelectElement;
        const unit = unitSelect ? unitSelect.value : '';
        
        updateElementStyle(property.id, input.value + unit);
      }
    });
    
    container.appendChild(input);
    
    // Add unit select if units are available
    if (property.units && property.units.length) {
      const select = document.createElement('select');
      select.className = 'solumind-unit-select';
      
      property.units.forEach(unit => {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = unit || 'none';
        select.appendChild(option);
      });
      
      // Add change handler to update styles when unit changes
      select.addEventListener('change', () => {
        if (selectedElement && input.value) {
          updateElementStyle(property.id, input.value + select.value);
        }
      });
      
      container.appendChild(select);
    }
    
    return container;
  }
  
  // Create a number input
  function createNumberInput(property: StyleProperty): HTMLElement {
    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'solumind-input solumind-number-input';
    input.setAttribute('data-property', property.id);
    
    // Set default value if available
    if (property.defaults !== undefined) {
      input.value = property.defaults.toString();
    }
    
    // Add change handler to update styles
    input.addEventListener('input', () => {
      if (selectedElement) {
        updateElementStyle(property.id, input.value);
      }
    });
    
    return input;
  }
  
  // Create a color input
  function createColorInput(property: StyleProperty): HTMLElement {
    const container = document.createElement('div');
    container.className = 'solumind-color-picker-container';
    
    const input = document.createElement('input');
    input.type = 'color';
    input.className = 'solumind-input solumind-color-input';
    input.setAttribute('data-property', property.id);
    
    // Set default value if available
    if (property.defaults !== undefined) {
      input.value = property.defaults.toString();
    }
    
    // Add change handler to update styles
    input.addEventListener('input', () => {
      if (selectedElement) {
        updateElementStyle(property.id, input.value);
        colorText.value = input.value;
      }
    });
    
    // Add text input for color code
    const colorText = document.createElement('input');
    colorText.type = 'text';
    colorText.className = 'solumind-input solumind-color-text-input';
    colorText.placeholder = '#RRGGBB';
    
    // Sync text input with color picker
    colorText.addEventListener('input', () => {
      if (isValidColor(colorText.value)) {
        input.value = colorText.value;
        if (selectedElement) {
          updateElementStyle(property.id, colorText.value);
        }
      }
    });
    
    container.appendChild(input);
    container.appendChild(colorText);
    
    return container;
  }
  
  // Check if a string is a valid color
  function isValidColor(color: string): boolean {
    const style = new Option().style;
    style.color = color;
    return style.color !== '';
  }
  
  // Create a select input
  function createSelectInput(property: StyleProperty): HTMLElement {
    const select = document.createElement('select');
    select.className = 'solumind-input solumind-select-input';
    select.setAttribute('data-property', property.id);
    
    // Add empty option
    const emptyOption = document.createElement('option');
    emptyOption.value = '';
    emptyOption.textContent = '-- Select --';
    select.appendChild(emptyOption);
    
    // Add options
    if (property.options && property.options.length) {
      property.options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.id;
        optionElement.textContent = option.label;
        
        // Set default value if available
        if (property.defaults !== undefined && option.id === property.defaults) {
          optionElement.selected = true;
        }
        
        select.appendChild(optionElement);
      });
    }
    
    // Add change handler to update styles
    select.addEventListener('change', () => {
      if (selectedElement) {
        updateElementStyle(property.id, select.value);
      }
    });
    
    return select;
  }
  
  // Create radio input group
  function createRadioInput(property: StyleProperty): HTMLElement {
    const container = document.createElement('div');
    container.className = 'solumind-radio-group';
    
    // Add options
    if (property.options && property.options.length) {
      property.options.forEach(option => {
        const label = document.createElement('label');
        label.className = 'solumind-radio-label';
        
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `radio-${property.id}`;
        input.value = option.id;
        input.className = 'solumind-radio-input';
        
        // Set default value if available
        if (property.defaults !== undefined && option.id === property.defaults) {
          input.checked = true;
        }
        
        // Add change handler to update styles
        input.addEventListener('change', () => {
          if (selectedElement && input.checked) {
            updateElementStyle(property.id, option.id);
          }
        });
        
        label.appendChild(input);
        label.appendChild(document.createTextNode(option.label));
        container.appendChild(label);
      });
    }
    
    return container;
  }
  
  // Create checkbox input
  function createCheckboxInput(property: StyleProperty): HTMLElement {
    const container = document.createElement('div');
    container.className = 'solumind-checkbox-container';
    
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'solumind-input solumind-checkbox-input';
    input.setAttribute('data-property', property.id);
    
    // Set default value if available
    if (property.defaults !== undefined) {
      input.checked = Boolean(property.defaults);
    }
    
    // Add change handler to update styles
    input.addEventListener('change', () => {
      if (selectedElement) {
        updateElementStyle(property.id, input.checked.toString());
      }
    });
    
    container.appendChild(input);
    
    return container;
  }
  
  // Create slider input
  function createSliderInput(property: StyleProperty): HTMLElement {
    const container = document.createElement('div');
    container.className = 'solumind-slider-container';
    
    const input = document.createElement('input');
    input.type = 'range';
    input.className = 'solumind-input solumind-slider-input';
    input.setAttribute('data-property', property.id);
    input.min = '0';
    input.max = '1';
    input.step = '0.01';
    
    // Set default value if available
    if (property.defaults !== undefined) {
      input.value = property.defaults.toString();
    } else {
      input.value = '1';
    }
    
    // Add value display
    const valueDisplay = document.createElement('span');
    valueDisplay.className = 'solumind-slider-value';
    valueDisplay.textContent = input.value;
    
    // Add change handler to update styles and value display
    input.addEventListener('input', () => {
      if (selectedElement) {
        updateElementStyle(property.id, input.value);
        valueDisplay.textContent = input.value;
      }
    });
    
    container.appendChild(input);
    container.appendChild(valueDisplay);
    
    return container;
  }
  
  // Create composite input (for complex properties like box-shadow)
  function createCompositeInput(property: StyleProperty): HTMLElement {
    const container = document.createElement('div');
    container.className = 'solumind-composite-container';
    
    // For box-shadow, create individual inputs for each component
    if (property.id === 'box-shadow') {
      // Horizontal offset
      const hOffsetContainer = document.createElement('div');
      hOffsetContainer.className = 'solumind-composite-item';
      
      const hOffsetLabel = document.createElement('label');
      hOffsetLabel.textContent = 'H-Offset';
      
      const hOffsetInput = document.createElement('input');
      hOffsetInput.type = 'text';
      hOffsetInput.className = 'solumind-input solumind-composite-input';
      hOffsetInput.setAttribute('data-component', 'h-offset');
      
      hOffsetContainer.appendChild(hOffsetLabel);
      hOffsetContainer.appendChild(hOffsetInput);
      
      // Vertical offset
      const vOffsetContainer = document.createElement('div');
      vOffsetContainer.className = 'solumind-composite-item';
      
      const vOffsetLabel = document.createElement('label');
      vOffsetLabel.textContent = 'V-Offset';
      
      const vOffsetInput = document.createElement('input');
      vOffsetInput.type = 'text';
      vOffsetInput.className = 'solumind-input solumind-composite-input';
      vOffsetInput.setAttribute('data-component', 'v-offset');
      
      vOffsetContainer.appendChild(vOffsetLabel);
      vOffsetContainer.appendChild(vOffsetInput);
      
      // Blur radius
      const blurContainer = document.createElement('div');
      blurContainer.className = 'solumind-composite-item';
      
      const blurLabel = document.createElement('label');
      blurLabel.textContent = 'Blur';
      
      const blurInput = document.createElement('input');
      blurInput.type = 'text';
      blurInput.className = 'solumind-input solumind-composite-input';
      blurInput.setAttribute('data-component', 'blur');
      
      blurContainer.appendChild(blurLabel);
      blurContainer.appendChild(blurInput);
      
      // Spread radius
      const spreadContainer = document.createElement('div');
      spreadContainer.className = 'solumind-composite-item';
      
      const spreadLabel = document.createElement('label');
      spreadLabel.textContent = 'Spread';
      
      const spreadInput = document.createElement('input');
      spreadInput.type = 'text';
      spreadInput.className = 'solumind-input solumind-composite-input';
      spreadInput.setAttribute('data-component', 'spread');
      
      spreadContainer.appendChild(spreadLabel);
      spreadContainer.appendChild(spreadInput);
      
      // Color
      const colorContainer = document.createElement('div');
      colorContainer.className = 'solumind-composite-item';
      
      const colorLabel = document.createElement('label');
      colorLabel.textContent = 'Color';
      
      const colorInput = document.createElement('input');
      colorInput.type = 'color';
      colorInput.className = 'solumind-input solumind-composite-input';
      colorInput.setAttribute('data-component', 'color');
      colorInput.value = '#000000';
      
      colorContainer.appendChild(colorLabel);
      colorContainer.appendChild(colorInput);
      
      // Inset checkbox
      const insetContainer = document.createElement('div');
      insetContainer.className = 'solumind-composite-item';
      
      const insetLabel = document.createElement('label');
      insetLabel.textContent = 'Inset';
      
      const insetInput = document.createElement('input');
      insetInput.type = 'checkbox';
      insetInput.className = 'solumind-input solumind-composite-input';
      insetInput.setAttribute('data-component', 'inset');
      
      insetContainer.appendChild(insetLabel);
      insetContainer.appendChild(insetInput);
      
      // Add all inputs to container
      container.appendChild(hOffsetContainer);
      container.appendChild(vOffsetContainer);
      container.appendChild(blurContainer);
      container.appendChild(spreadContainer);
      container.appendChild(colorContainer);
      container.appendChild(insetContainer);
      
      // Add change handlers to update box shadow
      const inputs = container.querySelectorAll('.solumind-composite-input');
      inputs.forEach(input => {
        input.addEventListener('input', () => {
          if (selectedElement) {
            updateBoxShadow();
          }
        });
      });
      
      // Function to build box-shadow value from inputs
      function updateBoxShadow() {
        const hOffset = (container.querySelector('[data-component="h-offset"]') as HTMLInputElement).value || '0px';
        const vOffset = (container.querySelector('[data-component="v-offset"]') as HTMLInputElement).value || '0px';
        const blur = (container.querySelector('[data-component="blur"]') as HTMLInputElement).value || '0px';
        const spread = (container.querySelector('[data-component="spread"]') as HTMLInputElement).value || '0px';
        const color = (container.querySelector('[data-component="color"]') as HTMLInputElement).value || '#000000';
        const inset = (container.querySelector('[data-component="inset"]') as HTMLInputElement).checked;
        
        const boxShadow = `${inset ? 'inset ' : ''}${hOffset} ${vOffset} ${blur} ${spread} ${color}`;
        updateElementStyle('box-shadow', boxShadow);
      }
    }
    
    return container;
  }
  
  // Update element style
  function updateElementStyle(property: string, value: string): void {
    if (selectedElement) {
      // Apply style to the element
      selectedElement.style.setProperty(property, value);
      
      // Trigger update event
      editor.trigger('style:changed', {
        property,
        value,
        element: selectedElement,
      });
      
      // Update CSS content
      updateCssContent();
    }
  }
  
  // Parse box-shadow value
  function parseBoxShadow(boxShadow: string): any {
    if (!boxShadow || boxShadow === 'none') {
      return {
        inset: false,
        hOffset: '0px',
        vOffset: '0px',
        blur: '0px',
        spread: '0px',
        color: '#000000',
      };
    }
    
    const inset = boxShadow.includes('inset');
    boxShadow = boxShadow.replace('inset', '').trim();
    
    const parts = boxShadow.split(' ').filter(Boolean);
    
    return {
      inset,
      hOffset: parts[0] || '0px',
      vOffset: parts[1] || '0px',
      blur: parts[2] || '0px',
      spread: parts[3] || '0px',
      color: parts[4] || '#000000',
    };
  }
  
  // Update CSS content
  function updateCssContent(): void {
    // Get all styled elements from canvas
    const canvasBody = editor.getWrapper();
    if (!canvasBody) return;
    
    let cssContent = '';
    
    // Get all elements with inline styles
    const styledElements = Array.from(canvasBody.querySelectorAll('[style]'));
    
    // Process each element
    styledElements.forEach(element => {
      const styles = (element as HTMLElement).style;
      if (styles.length) {
        // Generate a selector for the element
        let selector = '';
        
        // Use class or tag name
        if (element.className) {
          // Get first class
          const className = element.className.split(' ')[0];
          selector = `.${className.replace(/:/g, '\\:')}`;
        } else {
          selector = element.tagName.toLowerCase();
        }
        
        // Start CSS rule
        cssContent += `${selector} {\n`;
        
        // Add styles
        for (let i = 0; i < styles.length; i++) {
          const property = styles[i];
          const value = styles.getPropertyValue(property);
          
          cssContent += `  ${property}: ${value};\n`;
        }
        
        // End CSS rule
        cssContent += '}\n\n';
      }
    });
    
    // Update editor CSS content
    editor.setStyle(cssContent);
  }
  
  // Set selected element
  function setSelectedElement(element: HTMLElement | null): void {
    selectedElement = element;
    
    const sectorsContainer = stylesContainer.querySelector('.solumind-style-sectors');
    const emptyMessage = stylesContainer.querySelector('.solumind-style-empty-message');
    
    if (element && sectorsContainer && emptyMessage) {
      // Show sectors
      sectorsContainer.style.display = 'block';
      emptyMessage.style.display = 'none';
      
      // Update inputs with current values
      updateInputsFromElement(element);
    } else if (sectorsContainer && emptyMessage) {
      // Hide sectors
      sectorsContainer.style.display = 'none';
      emptyMessage.style.display = 'block';
    }
  }
  
  // Update inputs with values from selected element
  function updateInputsFromElement(element: HTMLElement): void {
    // Get computed styles
    const styles = window.getComputedStyle(element);
    
    // Update inputs for each property
    const propertyInputs = stylesContainer.querySelectorAll('.solumind-style-property');
    propertyInputs.forEach(propertyElement => {
      const propertyId = propertyElement.getAttribute('data-property-id');
      if (!propertyId) return;
      
      const propertyValue = styles.getPropertyValue(propertyId);
      
      // Find input for this property
      const input = propertyElement.querySelector('[data-property]') as HTMLInputElement;
      if (!input) return;
      
      // Special case for color inputs
      if (input.type === 'color') {
        // Try to convert any color format to hex
        const tempDiv = document.createElement('div');
        tempDiv.style.color = propertyValue;
        document.body.appendChild(tempDiv);
        const computedColor = window.getComputedStyle(tempDiv).color;
        document.body.removeChild(tempDiv);
        
        // Convert RGB to hex
        if (computedColor.startsWith('rgb')) {
          const rgb = computedColor.match(/\d+/g);
          if (rgb && rgb.length >= 3) {
            const hexColor = `#${Number(rgb[0]).toString(16).padStart(2, '0')}${Number(rgb[1]).toString(16).padStart(2, '0')}${Number(rgb[2]).toString(16).padStart(2, '0')}`;
            input.value = hexColor;
            
            // Update text input if exists
            const colorText = propertyElement.querySelector('.solumind-color-text-input') as HTMLInputElement;
            if (colorText) {
              colorText.value = hexColor;
            }
          }
        }
      }
      // Special case for select inputs
      else if (input.tagName === 'SELECT') {
        // Find option with matching value
        const options = input.querySelectorAll('option');
        let found = false;
        
        options.forEach(option => {
          if (option.value === propertyValue) {
            option.selected = true;
            found = true;
          }
        });
        
        // If no match, select empty option
        if (!found) {
          const emptyOption = input.querySelector('option[value=""]');
          if (emptyOption) {
            (emptyOption as HTMLOptionElement).selected = true;
          }
        }
      }
      // Special case for radio inputs
      else if (propertyElement.querySelector('.solumind-radio-group')) {
        const radioInputs = propertyElement.querySelectorAll('input[type="radio"]');
        radioInputs.forEach(radio => {
          (radio as HTMLInputElement).checked = (radio as HTMLInputElement).value === propertyValue;
        });
      }
      // Special case for checkbox inputs
      else if (input.type === 'checkbox') {
        input.checked = propertyValue === 'true';
      }
      // Special case for composite inputs (box-shadow)
      else if (propertyId === 'box-shadow') {
        const boxShadowValues = parseBoxShadow(propertyValue);
        
        // Update each component input
        const components = propertyElement.querySelectorAll('[data-component]');
        components.forEach(component => {
          const componentType = component.getAttribute('data-component');
          if (!componentType) return;
          
          switch (componentType) {
            case 'h-offset':
              (component as HTMLInputElement).value = boxShadowValues.hOffset;
              break;
            case 'v-offset':
              (component as HTMLInputElement).value = boxShadowValues.vOffset;
              break;
            case 'blur':
              (component as HTMLInputElement).value = boxShadowValues.blur;
              break;
            case 'spread':
              (component as HTMLInputElement).value = boxShadowValues.spread;
              break;
            case 'color':
              (component as HTMLInputElement).value = boxShadowValues.color;
              break;
            case 'inset':
              (component as HTMLInputElement).checked = boxShadowValues.inset;
              break;
          }
        });
      }
      // Text or number inputs
      else if (input.type === 'text' || input.type === 'number') {
        // Extract value without unit
        const valueMatch = propertyValue.match(/^([0-9.-]+)/);
        if (valueMatch && valueMatch[1]) {
          input.value = valueMatch[1];
          
          // Extract unit
          const unitMatch = propertyValue.match(/[0-9.-]+(.*)/);
          if (unitMatch && unitMatch[1]) {
            const unitSelect = propertyElement.querySelector('.solumind-unit-select') as HTMLSelectElement;
            if (unitSelect) {
              // Find option with matching unit
              const unitOptions = unitSelect.querySelectorAll('option');
              let foundUnit = false;
              
              unitOptions.forEach(option => {
                if (option.value === unitMatch[1]) {
                  option.selected = true;
                  foundUnit = true;
                }
              });
              
              // If no match, select first option
              if (!foundUnit && unitOptions.length > 0) {
                (unitOptions[0] as HTMLOptionElement).selected = true;
              }
            }
          }
        } else {
          input.value = propertyValue;
        }
      }
      // Other inputs
      else {
        input.value = propertyValue;
      }
    });
  }
  
  // Initialize style manager and setup event listeners
  function init(): void {
    // Initialize style manager UI
    initStyleManager();
    
    // Listen for element selection in canvas
    const canvasFrame = editor.getContainer().querySelector('.solumind-canvas-frame') as HTMLIFrameElement;
    if (canvasFrame && canvasFrame.contentWindow) {
      canvasFrame.contentWindow.document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        
        // If clicked element is the body, deselect
        if (target.tagName.toLowerCase() === 'body') {
          setSelectedElement(null);
          return;
        }
        
        // Select clicked element
        setSelectedElement(target);
        
        // Remove selection from other elements
        const selectedElements = canvasFrame.contentWindow!.document.querySelectorAll('.solumind-component-selected');
        selectedElements.forEach(el => {
          if (el !== target) {
            el.classList.remove('solumind-component-selected');
          }
        });
        
        // Add selection to clicked element
        target.classList.add('solumind-component-selected');
        
        // Stop propagation to parent elements
        event.stopPropagation();
      });
    }
    
    // Listen for component selection event
    editor.on('component:selected', (data) => {
      const element = data.element;
      if (element && element instanceof HTMLElement) {
        setSelectedElement(element);
      }
    });
  }
  
  // Initialize
  init();
}
