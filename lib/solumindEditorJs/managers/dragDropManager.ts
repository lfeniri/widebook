/**
 * Drag and Drop Manager for SolumindEditor
 */

import { SolumindEditor, CustomComponent } from '../types';

export function setupDragAndDrop(
  editorContainer: HTMLElement,
  componentsContainer: HTMLElement,
) {
  let draggedElement: HTMLElement | null = null;
  let draggedElementType: 'block' | 'component' | 'element' | null = null;
  let draggedElementId: string | null = null;
  let dropPlaceholder: HTMLElement | null = null;
  let draggedComponentData: any = null; // Pour stocker les données complètes du composant
  
  // Create drop placeholder
  function createDropPlaceholder() {
    const placeholder = document.createElement('div');
    placeholder.className = 'solumind-drop-placeholder';
    placeholder.innerHTML = '<div class="solumind-drop-indicator"></div>';
    return placeholder;
  }
  
  // Get canvas document
  function getCanvasDocument() {
    const iframe = editorContainer.querySelector('.solumind-canvas-frame') as HTMLIFrameElement;
    return iframe?.contentWindow?.document;
  }
  
  // Get canvas body
  function getCanvasBody() {
    return getCanvasDocument()?.body;
  }
  
  // Setup drag events for blocks and components
  const setupDragEvents = () => {
    // Handle draggable blocks
    const blocks = editorContainer.querySelectorAll('.solumind-block');
    blocks.forEach(block => {
      block.addEventListener('dragstart', (e) => {
        const dragEvent = e as DragEvent;
        draggedElement = block as HTMLElement;
        draggedElementType = 'block';
        draggedElementId = block.getAttribute('data-block-id');
        
        // Create ghost image for dragging
        const ghostElement = block.cloneNode(true) as HTMLElement;
        ghostElement.style.opacity = '0.5';
        ghostElement.style.position = 'absolute';
        ghostElement.style.top = '-1000px';
        document.body.appendChild(ghostElement);
        
        if (dragEvent.dataTransfer) {
          dragEvent.dataTransfer.setDragImage(ghostElement, 0, 0);
          dragEvent.dataTransfer.effectAllowed = 'copy';
          dragEvent.dataTransfer.setData('text/plain', draggedElementId || '');
          
          // Store block content if available
          const blockContent = block.getAttribute('data-content');
          if (blockContent) {
            try {
              dragEvent.dataTransfer.setData('application/json', JSON.stringify({
                type: 'block',
                id: draggedElementId,
                content: blockContent
              }));
            } catch (err) {
              console.error('Error storing block data:', err);
            }
          }
        }
        
        setTimeout(() => {
          document.body.removeChild(ghostElement);
        }, 0);
      });
      
      block.addEventListener('dragend', () => {
        draggedElement = null;
        draggedElementType = null;
        draggedElementId = null;
        
        // Remove placeholder if exists
        if (dropPlaceholder && dropPlaceholder.parentNode) {
          dropPlaceholder.parentNode.removeChild(dropPlaceholder);
          dropPlaceholder = null;
        }
      });
    });
    
    // Handle draggable components
    const components = componentsContainer.querySelectorAll('.solumind-component-item');
    components.forEach(component => {
      component.addEventListener('dragstart', (e) => {
        const dragEvent = e as DragEvent;
        draggedElement = component as HTMLElement;
        draggedElementType = 'component';
        draggedElementId = component.getAttribute('data-component-id');
        
        // Stocker les données JSON du composant si disponibles
        const componentJsonData = component.getAttribute('data-component-json');
        
        // Create ghost image for dragging
        const ghostElement = component.cloneNode(true) as HTMLElement;
        ghostElement.style.opacity = '0.5';
        ghostElement.style.position = 'absolute';
        ghostElement.style.top = '-1000px';
        document.body.appendChild(ghostElement);
        
        if (dragEvent.dataTransfer) {
          dragEvent.dataTransfer.setDragImage(ghostElement, 0, 0);
          dragEvent.dataTransfer.effectAllowed = 'copy';
          dragEvent.dataTransfer.setData('text/plain', draggedElementId || '');
          
          // Store component data for transfer to iframe
          if (componentJsonData) {
            try {
              dragEvent.dataTransfer.setData('application/json', componentJsonData);
            } catch (err) {
              console.error('Error storing component data:', err);
            }
          } else {
            // Store minimal component data
            try {
              dragEvent.dataTransfer.setData('application/json', JSON.stringify({
                type: 'component',
                id: draggedElementId,
                label: component.textContent?.trim()
              }));
            } catch (err) {
              console.error('Error storing minimal component data:', err);
            }
          }
        }
        
        setTimeout(() => {
          document.body.removeChild(ghostElement);
        }, 0);
      });
      
      component.addEventListener('dragend', () => {
        draggedElement = null;
        draggedElementType = null;
        draggedElementId = null;
        
        // Remove placeholder if exists
        if (dropPlaceholder && dropPlaceholder.parentNode) {
          dropPlaceholder.parentNode.removeChild(dropPlaceholder);
          dropPlaceholder = null;
        }
      });
    });
  };
    // Setup drop events for canvas
  const setupDropEvents = () => {
    const canvasDocument = getCanvasDocument();
    if (!canvasDocument) return;
    
    const canvasBody = getCanvasBody();
    if (!canvasBody) return;
    
    // Add message event listener to handle messages from iframe
    window.addEventListener('message', (e) => {
      // Vérifier si le message est un objet et qu'il vient bien de l'iframe
      if (e.data && typeof e.data === 'object') {
        console.log('Message reçu de l\'iframe:', e.data);
        
        switch (e.data.type) {
          case 'dragover':
            // Gérer l'événement dragover provenant de l'iframe
            if (!draggedElement) return;
            
            // Créer le placeholder s'il n'existe pas
            if (!dropPlaceholder) {
              dropPlaceholder = createDropPlaceholder();
            }
            
            // Calculer la position où placer le placeholder
            const mouseY = e.data.y;
            let closestElement: Element | null = null;
            let closestDistance = Infinity;
            let insertBefore = true;
            
            // Trouver l'élément le plus proche du pointeur de la souris
            Array.from(canvasBody.children).forEach((child) => {
              const rect = child.getBoundingClientRect();
              const childCenter = rect.top + rect.height / 2;
              const distanceToTop = Math.abs(mouseY - rect.top);
              const distanceToBottom = Math.abs(mouseY - rect.bottom);
              
              const minDistance = Math.min(distanceToTop, distanceToBottom);
              
              if (minDistance < closestDistance) {
                closestDistance = minDistance;
                closestElement = child;
                insertBefore = mouseY < childCenter;
              }
            });
            
            // Positionner le placeholder
            if (closestElement) {
              if (insertBefore) {
                canvasBody.insertBefore(dropPlaceholder, closestElement);
              } else {
                const nextSibling = closestElement.nextSibling as ChildNode;
                if (nextSibling) {
                  canvasBody.insertBefore(dropPlaceholder, nextSibling);
                } else {
                  canvasBody.appendChild(dropPlaceholder);
                }
              }
            } else if (canvasBody.children.length === 0) {
              // S'il n'y a pas d'éléments dans le canvas, ajouter le placeholder
              canvasBody.appendChild(dropPlaceholder);
            }
            break;
            
          case 'drop':
            // Gérer l'événement drop provenant de l'iframe
            if (!draggedElement) return;
            
            draggedElementId = e.data.componentId;
            draggedElementType = draggedElementId ? 'component' : 'element';
            
            if (!draggedElementId && draggedElement) {
              // Essayer de récupérer l'ID depuis l'élément s'il n'est pas dans le message
              draggedElementId = draggedElement.getAttribute('data-component-id') || 
                                draggedElement.getAttribute('data-block-id') || null;
            }
            
            // Créer l'élément à insérer
            let newElement: HTMLElement | null = null;
            
            if (draggedElementType === 'block' && draggedElementId) {
              // Chercher le contenu du bloc et créer l'élément
              const blockContent = document.querySelector(`[data-block-id="${draggedElementId}"]`)?.getAttribute('data-content');
              if (blockContent) {
                // Créer un élément temporaire pour parser le HTML
                const tempContainer = document.createElement('div');
                tempContainer.innerHTML = blockContent;
                newElement = tempContainer.firstElementChild as HTMLElement;
              }
            } else if (draggedElementType === 'component' && draggedElementId) {
              // Pour les composants personnalisés, vérifier si nous avons des données JSON
              let componentData = null;
              
              if (e.data.componentData) {
                try {
                  componentData = JSON.parse(e.data.componentData);
                } catch (error) {
                  console.error('Erreur lors du parsing des données de composant:', error);
                }
              }
              
              // Si pas de données dans le message, essayer depuis l'élément
              if (!componentData && draggedElement) {
                const componentJson = draggedElement.getAttribute('data-component-json');
                if (componentJson) {
                  try {
                    componentData = JSON.parse(componentJson);
                  } catch (error) {
                    console.error('Erreur lors du parsing du JSON du composant:', error);
                  }
                }
              }
              
              // Créer l'élément du composant
              const tempContainer = document.createElement('div');
              
              if (componentData && componentData.component?.content) {
                tempContainer.innerHTML = componentData.component.content;
              } else if (draggedElement) {
                tempContainer.innerHTML = `<div class="solumind-custom-component">${draggedElement.textContent}</div>`;
              } else {
                tempContainer.innerHTML = `<div class="solumind-custom-component">Component ${draggedElementId}</div>`;
              }
              
              newElement = tempContainer.firstElementChild as HTMLElement;
              if (newElement) {
                newElement.classList.add('solumind-custom-component');
                newElement.setAttribute('data-component-id', draggedElementId);
              }
            }
            
            // Insérer le nouvel élément où se trouve le placeholder
            if (newElement && dropPlaceholder && dropPlaceholder.parentNode) {
              console.log('Insertion d\'élément:', {
                type: draggedElementType,
                id: draggedElementId,
                content: newElement.outerHTML
              });
              
              try {
                // Remplacer le placeholder par le nouvel élément
                dropPlaceholder.parentNode.replaceChild(newElement, dropPlaceholder);
                
                // Rendre les éléments déposés déplaçables
                makeElementDraggable(newElement);
                
                // Ajouter un comportement de sélection au nouvel élément
                addSelectionBehavior(newElement);
                
                // Ajouter un retour visuel pour le succès
                newElement.classList.add('solumind-element-added');
                
                // Supprimer la classe après la fin de l'animation
                setTimeout(() => {
                  newElement?.classList.remove('solumind-element-added');
                }, 1000);
                
                // Effacer la référence du placeholder
                dropPlaceholder = null;
                
                // Déclencher un événement de mise à jour
                const event = new CustomEvent('solumind:content:updated');
                document.dispatchEvent(event);
                
                console.log('Élément inséré avec succès via message iframe');
              } catch (error) {
                console.error('Erreur lors de l\'insertion de l\'élément via message iframe:', error);
              }
            } else {
              console.error('Drop échoué - éléments manquants pour le drop iframe', {
                newElement: !!newElement,
                dropPlaceholder: !!dropPlaceholder,
                parentNode: !!(dropPlaceholder && dropPlaceholder.parentNode)
              });
            }
            break;
            
          case 'dragleave':
            // Supprimer le placeholder quand dragleave se produit
            if (dropPlaceholder && dropPlaceholder.parentNode) {
              dropPlaceholder.parentNode.removeChild(dropPlaceholder);
              dropPlaceholder = null;
            }
            break;
            
          case 'elementInserted':
            // Traiter la confirmation d'insertion d'élément
            if (e.data.success) {
              console.log('Élément inséré avec succès dans l\'iframe, id:', e.data.id);
            } else {
              console.error('Échec d\'insertion d\'élément dans l\'iframe:', e.data.error);
            }
            break;
        }
      }
    });
    
    // Handle dragover on canvas
    canvasDocument.addEventListener('dragover', (e) => {
      const dragEvent = e as DragEvent;
      dragEvent.preventDefault();
      
      if (!draggedElement) return;
      
      // Create drop placeholder if not exists
      if (!dropPlaceholder) {
        dropPlaceholder = createDropPlaceholder();
      }
      
      // Get position and determine where to insert the placeholder
      const mouseY = dragEvent.clientY;
      let closestElement: Element | null = null;
      let closestDistance = Infinity;
      let insertBefore = true;
      
      // Find the closest element to the mouse pointer
      Array.from(canvasBody.children).forEach((child) => {
        const rect = child.getBoundingClientRect();
        const childCenter = rect.top + rect.height / 2;
        const distanceToTop = Math.abs(mouseY - rect.top);
        const distanceToBottom = Math.abs(mouseY - rect.bottom);
        
        const minDistance = Math.min(distanceToTop, distanceToBottom);
        
        if (minDistance < closestDistance) {
          closestDistance = minDistance;
          closestElement = child;
          insertBefore = mouseY < childCenter;
        }
      });
      
      // Position the placeholder
      if (closestElement) {
        if (insertBefore) {
          canvasBody.insertBefore(dropPlaceholder, closestElement);
        } else {          // Get next sibling with proper type casting
          const nextSibling = closestElement.nextSibling as ChildNode;
          if (nextSibling) {
            canvasBody.insertBefore(dropPlaceholder, nextSibling);
          } else {
            canvasBody.appendChild(dropPlaceholder);
          }
        }
      } else if (canvasBody.children.length === 0) {
        // If no elements in canvas, just append
        canvasBody.appendChild(dropPlaceholder);
      }
    });
    
    // Handle drop on canvas
    canvasDocument.addEventListener('drop', (e) => {
      const dragEvent = e as DragEvent;
      dragEvent.preventDefault();
      
      if (!draggedElement || !draggedElementId) return;
      
      // Create the actual element based on the dragged element type
      let newElement: HTMLElement | null = null;
      
      if (draggedElementType === 'block') {
        // Find block content and create element
        const blockContent = document.querySelector(`[data-block-id="${draggedElementId}"]`)?.getAttribute('data-content');
        if (blockContent) {
          // Create temporary element to parse HTML
          const tempContainer = document.createElement('div');
          tempContainer.innerHTML = blockContent;
          newElement = tempContainer.firstElementChild as HTMLElement;
        }
      } else if (draggedElementType === 'component') {
        // For custom components, check if we have JSON data
        const componentJson = draggedElement.getAttribute('data-component-json');
        if (componentJson) {
          try {
            // Parse component data
            const componentData = JSON.parse(componentJson);
            
            // Create element from component content
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = componentData.component?.content || 
              `<div class="solumind-component-placeholder">${draggedElement.textContent}</div>`;
            
            newElement = tempContainer.firstElementChild as HTMLElement;
            newElement.className += ' solumind-custom-component';
            newElement.setAttribute('data-component-id', draggedElementId);
          } catch (e) {
            // Fallback to simple placeholder
            newElement = document.createElement('div');
            newElement.className = 'solumind-custom-component';
            newElement.setAttribute('data-component-id', draggedElementId);
            newElement.innerHTML = `<div class="solumind-component-placeholder">${draggedElement.textContent}</div>`;
          }
        } else {
          // Fallback to simple placeholder if no JSON data
          newElement = document.createElement('div');
          newElement.className = 'solumind-custom-component';
          newElement.setAttribute('data-component-id', draggedElementId);
          newElement.innerHTML = `<div class="solumind-component-placeholder">${draggedElement.textContent}</div>`;
        }
      }      // Insert the new element where the placeholder is
      if (newElement && dropPlaceholder && dropPlaceholder.parentNode) {
        // Log pour déboguer
        console.log('Inserting element:', {
          newElement,
          draggedElementType,
          draggedElementId,
          content: newElement.outerHTML
        });
        
        try {
          // Ensure we're replacing the placeholder
          dropPlaceholder.parentNode.replaceChild(newElement, dropPlaceholder);
          
          // Make dropped elements draggable for reordering
          makeElementDraggable(newElement);
          
          // Add selection behavior to the new element
          addSelectionBehavior(newElement);
          
          // Add visual feedback for successful drop
          newElement.classList.add('solumind-element-added');
          
          // Remove the feedback class after the animation completes
          setTimeout(() => {
            newElement.classList.remove('solumind-element-added');
          }, 1000);
          
          // Clear the placeholder reference
          dropPlaceholder = null;
          
          // Trigger an update event to notify that content has changed
          const event = new CustomEvent('solumind:content:updated');
          document.dispatchEvent(event);
          
          console.log('Element inserted successfully');
        } catch (error) {
          console.error('Error inserting element:', error);
        }
      } else {
        console.error('Drop failed - missing required elements:', { 
          newElement: !!newElement, 
          dropPlaceholder: !!dropPlaceholder,
          dropPlaceholderParent: !!(dropPlaceholder && dropPlaceholder.parentNode) 
        });
      }
    });
    
    // Handle dragleave on canvas
    canvasDocument.addEventListener('dragleave', (e) => {
      const dragEvent = e as DragEvent;
      // Check if actually leaving the canvas (not just moving between elements)
      const rect = canvasDocument.body.getBoundingClientRect();
      const x = dragEvent.clientX;
      const y = dragEvent.clientY;
      
      if (x <= rect.left || x >= rect.right || y <= rect.top || y >= rect.bottom) {
        // Remove placeholder if exists
        if (dropPlaceholder && dropPlaceholder.parentNode) {
          dropPlaceholder.parentNode.removeChild(dropPlaceholder);
          dropPlaceholder = null;
        }
      }
    });
  };
  
  // Make an element draggable for reordering
  function makeElementDraggable(element: HTMLElement) {
    element.setAttribute('draggable', 'true');
    
    element.addEventListener('dragstart', (e) => {
      const dragEvent = e as DragEvent;
      draggedElement = element;
      draggedElementType = 'element';
      
      // Style for dragging
      element.classList.add('solumind-dragging');
      
      if (dragEvent.dataTransfer) {
        dragEvent.dataTransfer.effectAllowed = 'move';
      }
      
      // Create placeholder for the original position
      dropPlaceholder = createDropPlaceholder();
      element.parentNode?.replaceChild(dropPlaceholder, element);
    });
    
    element.addEventListener('dragend', () => {
      draggedElement = null;
      draggedElementType = null;
      
      // Remove dragging style
      element.classList.remove('solumind-dragging');
      
      // Remove placeholder if it still exists
      if (dropPlaceholder && dropPlaceholder.parentNode) {
        dropPlaceholder.parentNode.removeChild(dropPlaceholder);
        dropPlaceholder = null;
      }
    });
  }
  
  // Add selection behavior to elements for editing
  function addSelectionBehavior(element: HTMLElement) {
    element.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // Remove selection from all elements
      const canvasDocument = getCanvasDocument();
      if (!canvasDocument) return;
      
      const selectedElements = canvasDocument.querySelectorAll('.solumind-component-selected');
      selectedElements.forEach(el => el.classList.remove('solumind-component-selected'));
      
      // Add selection to this element
      element.classList.add('solumind-component-selected');
      
      // Trigger selection event for the style panel
      // This would be handled by the editor instance
    });
  }
  
  // Initialize drag and drop
  const init = () => {
    setupDragEvents();
    setupDropEvents();
    
    // Re-initialize when DOM changes
    const observer = new MutationObserver(() => {
      setupDragEvents();
    });
    
    observer.observe(editorContainer, { 
      childList: true, 
      subtree: true 
    });
    
    // Return cleanup function
    return () => {
      observer.disconnect();
    };
  };
  
  // Initialize
  return init();
}
