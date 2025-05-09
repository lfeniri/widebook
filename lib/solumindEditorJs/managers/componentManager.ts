/**
 * Component Manager for SolumindEditor
 */

import { SolumindEditor, CustomComponent } from '../types';

export function setupComponentManager(
  componentsContainer: HTMLElement,
  editor: SolumindEditor,
): void {
  // Default custom components categories
  const defaultComponentCategories = [
    {
      id: 'layout',
      name: 'Layout Components',
    },
    {
      id: 'ui',
      name: 'UI Components',
    },
    {
      id: 'nextjs',
      name: 'Next.js Components',
    },
    {
      id: 'custom',
      name: 'Custom Components',
    },
  ];

  // Initialize the component manager
  function initComponentManager(): void {
    // Create component manager container
    const componentManager = document.createElement('div');
    componentManager.className = 'solumind-component-manager';
    
    // Create component manager header
    const header = document.createElement('div');
    header.className = 'solumind-component-manager-header';
    header.innerHTML = `<h3>Components</h3>`;
    
    // Create search input
    const searchContainer = document.createElement('div');
    searchContainer.className = 'solumind-component-search';
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'solumind-search-input';
    searchInput.placeholder = 'Search components...';
    
    searchContainer.appendChild(searchInput);
    
    // Create component categories
    const categoriesContainer = document.createElement('div');
    categoriesContainer.className = 'solumind-component-categories';
    
    // Create components container
    const componentsListContainer = document.createElement('div');
    componentsListContainer.className = 'solumind-components-list';
    
    // Create add component button
    const addComponentBtn = document.createElement('button');
    addComponentBtn.className = 'solumind-add-component-btn';
    addComponentBtn.innerHTML = `<i class="fas fa-plus"></i> Add Custom Component`;
    
    // Append elements to component manager
    componentManager.appendChild(header);
    componentManager.appendChild(searchContainer);
    componentManager.appendChild(categoriesContainer);
    componentManager.appendChild(componentsListContainer);
    componentManager.appendChild(addComponentBtn);
    
    // Append component manager to container
    componentsContainer.appendChild(componentManager);
    
    // Create categories
    createComponentCategories(categoriesContainer);
    
    // Set up event listeners
    setupEventListeners(searchInput, addComponentBtn);
  }
  
  // Create component categories
  function createComponentCategories(container: HTMLElement): void {
    defaultComponentCategories.forEach(category => {
      const categoryElement = document.createElement('div');
      categoryElement.className = 'solumind-component-category';
      categoryElement.setAttribute('data-category', category.id);
      categoryElement.textContent = category.name;
      
      // Add click event to filter components
      categoryElement.addEventListener('click', () => {
        // Toggle active class
        const isActive = categoryElement.classList.contains('active');
        
        // Remove active class from all categories
        const categories = container.querySelectorAll('.solumind-component-category');
        categories.forEach(cat => cat.classList.remove('active'));
        
        if (!isActive) {
          // Add active class to clicked category
          categoryElement.classList.add('active');
          
          // Filter components
          filterComponentsByCategory(category.id);
        } else {
          // Show all components
          filterComponentsByCategory('all');
        }
      });
      
      container.appendChild(categoryElement);
    });
    
    // Add "All" category
    const allCategory = document.createElement('div');
    allCategory.className = 'solumind-component-category active';
    allCategory.setAttribute('data-category', 'all');
    allCategory.textContent = 'All Components';
    
    allCategory.addEventListener('click', () => {
      // Remove active class from all categories
      const categories = container.querySelectorAll('.solumind-component-category');
      categories.forEach(cat => cat.classList.remove('active'));
      
      // Add active class to "All" category
      allCategory.classList.add('active');
      
      // Show all components
      filterComponentsByCategory('all');
    });
    
    // Insert "All" category at the beginning
    container.insertBefore(allCategory, container.firstChild);
  }
  
  // Filter components by category
  function filterComponentsByCategory(categoryId: string): void {
    const componentItems = componentsContainer.querySelectorAll('.solumind-component-item');
    
    componentItems.forEach(item => {
      if (categoryId === 'all' || item.getAttribute('data-category') === categoryId) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }
  
  // Set up event listeners
  function setupEventListeners(searchInput: HTMLInputElement, addComponentBtn: HTMLButtonElement): void {
    // Search components
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const componentItems = componentsContainer.querySelectorAll('.solumind-component-item');
      
      componentItems.forEach(item => {
        const label = item.textContent?.toLowerCase() || '';
        if (label.includes(searchTerm)) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
    
    // Add custom component
    addComponentBtn.addEventListener('click', () => {
      showAddComponentModal();
    });
  }
  
  // Show add component modal
  function showAddComponentModal(): void {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'solumind-modal-overlay';
    
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'solumind-modal';
    
    // Create modal header
    const modalHeader = document.createElement('div');
    modalHeader.className = 'solumind-modal-header';
    modalHeader.innerHTML = `
      <h3>Add Custom Component</h3>
      <button class="solumind-modal-close">&times;</button>
    `;
    
    // Create modal body
    const modalBody = document.createElement('div');
    modalBody.className = 'solumind-modal-body';
    
    // Create form
    const form = document.createElement('form');
    form.className = 'solumind-component-form';
    
    // Component ID field
    const idField = document.createElement('div');
    idField.className = 'solumind-form-field';
    idField.innerHTML = `
      <label for="component-id">Component ID</label>
      <input type="text" id="component-id" name="component-id" placeholder="my-custom-button" required>
    `;
    
    // Component label field
    const labelField = document.createElement('div');
    labelField.className = 'solumind-form-field';
    labelField.innerHTML = `
      <label for="component-label">Component Label</label>
      <input type="text" id="component-label" name="component-label" placeholder="Custom Button" required>
    `;
    
    // Component category field
    const categoryField = document.createElement('div');
    categoryField.className = 'solumind-form-field';
    categoryField.innerHTML = `
      <label for="component-category">Component Category</label>
      <select id="component-category" name="component-category">
        <option value="custom">Custom Components</option>
        <option value="layout">Layout Components</option>
        <option value="ui">UI Components</option>
        <option value="nextjs">Next.js Components</option>
      </select>
    `;
    
    // NextJS checkbox
    const nextJsField = document.createElement('div');
    nextJsField.className = 'solumind-form-field checkbox';
    nextJsField.innerHTML = `
      <input type="checkbox" id="component-nextjs" name="component-nextjs">
      <label for="component-nextjs">Is Next.js Component</label>
    `;
    
    // Component content field
    const contentField = document.createElement('div');
    contentField.className = 'solumind-form-field';
    contentField.innerHTML = `
      <label for="component-content">Component HTML</label>
      <textarea id="component-content" name="component-content" placeholder="<div class='my-component'>Custom Component Content</div>" required></textarea>
    `;
    
    // Component props field
    const propsField = document.createElement('div');
    propsField.className = 'solumind-form-field';
    propsField.innerHTML = `
      <label for="component-props">Component Props (JSON)</label>
      <textarea id="component-props" name="component-props" placeholder='{\n  "text": "Button Text",\n  "color": "primary"\n}'></textarea>
      <p class="solumind-form-help">Enter component props as JSON, or leave empty if no props needed.</p>
    `;
    
    // Add submit button
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'solumind-modal-submit';
    submitBtn.textContent = 'Add Component';
    
    // Append form fields
    form.appendChild(idField);
    form.appendChild(labelField);
    form.appendChild(categoryField);
    form.appendChild(nextJsField);
    form.appendChild(contentField);
    form.appendChild(propsField);
    form.appendChild(submitBtn);
    
    // Add form submit handler
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const id = (document.getElementById('component-id') as HTMLInputElement).value;
      const label = (document.getElementById('component-label') as HTMLInputElement).value;
      const category = (document.getElementById('component-category') as HTMLSelectElement).value;
      const isNextJs = (document.getElementById('component-nextjs') as HTMLInputElement).checked;
      const content = (document.getElementById('component-content') as HTMLTextAreaElement).value;
      const propsText = (document.getElementById('component-props') as HTMLTextAreaElement).value;
      
      // Parse props if provided
      let props = {};
      if (propsText.trim()) {
        try {
          props = JSON.parse(propsText);
        } catch (error) {
          alert('Invalid props JSON format. Please enter valid JSON.');
          return;
        }
      }
      
      // Create component
      const component: CustomComponent = {
        id,
        label,
        isNextJs,
        component: {
          content,
          props,
        },
        props,
      };
      
      // Register component
      registerCustomComponent(component, category);
      
      // Close modal
      closeModal();
    });
    
    // Append form to modal body
    modalBody.appendChild(form);
    
    // Create modal footer
    const modalFooter = document.createElement('div');
    modalFooter.className = 'solumind-modal-footer';
    
    // Append modal parts
    modal.appendChild(modalHeader);
    modal.appendChild(modalBody);
    modal.appendChild(modalFooter);
    
    // Append modal to overlay
    overlay.appendChild(modal);
    
    // Append overlay to body
    document.body.appendChild(overlay);
    
    // Add close button handler
    const closeBtn = modal.querySelector('.solumind-modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal();
      }
    });
    
    // Function to close the modal
    function closeModal(): void {
      document.body.removeChild(overlay);
    }
  }
  
  // Register a custom component
  function registerCustomComponent(component: CustomComponent, category = 'custom'): void {
    // Create component element
    const componentElement = document.createElement('div');
    componentElement.className = 'solumind-component-item';
    componentElement.setAttribute('draggable', 'true');
    componentElement.setAttribute('data-component-id', component.id);
    componentElement.setAttribute('data-category', category);
    componentElement.textContent = component.label;
    
    // Add special badge for NextJS components
    if (component.isNextJs) {
      const badge = document.createElement('span');
      badge.className = 'solumind-component-badge nextjs';
      badge.textContent = 'Next';
      componentElement.appendChild(badge);
    }
    
    // Store component data
    componentElement.setAttribute('data-component-json', JSON.stringify(component));
      // Add drag events
    componentElement.addEventListener('dragstart', (e) => {
      const dragEvent = e as DragEvent;
      if (dragEvent.dataTransfer) {
        // Store component ID
        dragEvent.dataTransfer.setData('text/plain', component.id);
        // Store full component data as JSON
        dragEvent.dataTransfer.setData('application/json', JSON.stringify(component));
        dragEvent.dataTransfer.effectAllowed = 'copy';
        
        // Create ghost image for dragging
        const ghostElement = componentElement.cloneNode(true) as HTMLElement;
        ghostElement.style.opacity = '0.5';
        ghostElement.style.position = 'absolute';
        ghostElement.style.top = '-1000px';
        document.body.appendChild(ghostElement);
        
        dragEvent.dataTransfer.setDragImage(ghostElement, 10, 10);
        
        setTimeout(() => {
          document.body.removeChild(ghostElement);
        }, 0);
      }
    });
    
    // Add component to container
    const componentsListContainer = componentsContainer.querySelector('.solumind-components-list');
    if (componentsListContainer) {
      componentsListContainer.appendChild(componentElement);
    }
    
    // Fire event
    editor.trigger('component:added', component);
  }
  
  // Initialize component manager
  initComponentManager();
  
  // Expose registerCustomComponent method to editor
  editor.registerCustomComponent = (component: CustomComponent): void => {
    registerCustomComponent(component, component.isNextJs ? 'nextjs' : 'custom');
  };
}
