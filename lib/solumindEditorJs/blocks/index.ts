/**
 * Default blocks for SolumindEditor
 */

import { SolumindEditor, Block } from '../types';

// Base blocks organized by categories
const baseBlocks: Record<string, Block[]> = {
  'Basic': [
    {
      id: 'text',
      label: 'Text',
      content: '<div class="solumind-text">Edit this text</div>',
      media: '<i class="fas fa-font"></i>'
    },
    {
      id: 'heading',
      label: 'Heading',
      content: '<h2 class="solumind-heading">Heading</h2>',
      media: '<i class="fas fa-heading"></i>'
    },
    {
      id: 'paragraph',
      label: 'Paragraph',
      content: '<p class="solumind-paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>',
      media: '<i class="fas fa-paragraph"></i>'
    },
    {
      id: 'image',
      label: 'Image',
      content: '<img class="solumind-image" src="https://via.placeholder.com/350x250" alt="Placeholder Image">',
      media: '<i class="fas fa-image"></i>'
    },
    {
      id: 'link',
      label: 'Link',
      content: '<a href="#" class="solumind-link">Link</a>',
      media: '<i class="fas fa-link"></i>'
    },
    {
      id: 'button',
      label: 'Button',
      content: '<button class="solumind-button">Click me</button>',
      media: '<i class="fas fa-square"></i>'
    },
    {
      id: 'divider',
      label: 'Divider',
      content: '<hr class="solumind-divider">',
      media: '<i class="fas fa-minus"></i>'
    },
  ],
  'Layout': [
    {
      id: 'container',
      label: 'Container',
      content: '<div class="solumind-container" style="padding: 20px; width: 100%;"></div>',
      media: '<i class="fas fa-square-full"></i>'
    },
    {
      id: 'row',
      label: 'Row',
      content: '<div class="solumind-row flex flex-wrap w-full"></div>',
      media: '<i class="fas fa-grip-lines"></i>'
    },
    {
      id: 'column',
      label: 'Column',
      content: '<div class="solumind-column flex-grow p-4"></div>',
      media: '<i class="fas fa-grip-lines-vertical"></i>'
    },
    {
      id: '2-columns',
      label: '2 Columns',
      content: '<div class="solumind-row flex flex-wrap w-full"><div class="solumind-column w-1/2 p-4">Column 1</div><div class="solumind-column w-1/2 p-4">Column 2</div></div>',
      media: '<i class="fas fa-columns"></i>'
    },
    {
      id: '3-columns',
      label: '3 Columns',
      content: '<div class="solumind-row flex flex-wrap w-full"><div class="solumind-column w-1/3 p-4">Column 1</div><div class="solumind-column w-1/3 p-4">Column 2</div><div class="solumind-column w-1/3 p-4">Column 3</div></div>',
      media: '<i class="fas fa-columns"></i>'
    },
  ],
  'Components': [
    {
      id: 'card',
      label: 'Card',
      content: '<div class="solumind-card p-4 border rounded-lg shadow"><h3 class="solumind-card-title font-bold text-lg mb-2">Card Title</h3><p class="solumind-card-content">Card content goes here. You can add text and other elements.</p></div>',
      media: '<i class="fas fa-credit-card"></i>'
    },
    {
      id: 'alert',
      label: 'Alert',
      content: '<div class="solumind-alert bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert"><p>This is an alert message.</p></div>',
      media: '<i class="fas fa-exclamation-triangle"></i>'
    },
    {
      id: 'badge',
      label: 'Badge',
      content: '<span class="solumind-badge inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">Badge</span>',
      media: '<i class="fas fa-certificate"></i>'
    },
    {
      id: 'form',
      label: 'Form',
      content: '<form class="solumind-form"><div class="mb-4"><label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label><input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" id="username" type="text" placeholder="Username"></div><div class="mb-6"><label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label><input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3" id="password" type="password" placeholder="******************"></div><div class="flex items-center justify-between"><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button">Sign In</button></div></form>',
      media: '<i class="fas fa-file-alt"></i>'
    },
    {
      id: 'navbar',
      label: 'Navbar',
      content: '<nav class="solumind-navbar flex items-center justify-between flex-wrap bg-blue-500 p-6"><div class="flex items-center flex-shrink-0 text-white mr-6"><span class="font-semibold text-xl tracking-tight">Logo</span></div><div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto"><div class="text-sm lg:flex-grow"><a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">Link 1</a><a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">Link 2</a><a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white">Link 3</a></div></div></nav>',
      media: '<i class="fas fa-bars"></i>'
    },
    {
      id: 'footer',
      label: 'Footer',
      content: '<footer class="solumind-footer bg-gray-800 text-white p-6"><div class="flex flex-wrap"><div class="w-full md:w-1/3 mb-4 md:mb-0"><h3 class="font-bold mb-2">About Us</h3><p class="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></div><div class="w-full md:w-1/3 mb-4 md:mb-0"><h3 class="font-bold mb-2">Quick Links</h3><ul class="text-gray-400"><li><a href="#" class="hover:text-white">Home</a></li><li><a href="#" class="hover:text-white">About</a></li><li><a href="#" class="hover:text-white">Contact</a></li></ul></div><div class="w-full md:w-1/3"><h3 class="font-bold mb-2">Follow Us</h3><div class="flex space-x-4"><a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-facebook"></i></a><a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-twitter"></i></a><a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-instagram"></i></a></div></div></div><div class="mt-8 text-center text-gray-400">&copy; 2025 Your Company. All rights reserved.</div></footer>',
      media: '<i class="fas fa-shoe-prints"></i>'
    },
  ],
  'Media': [
    {
      id: 'video',
      label: 'Video',
      content: '<video class="solumind-video w-full" controls><source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
      media: '<i class="fas fa-video"></i>'
    },
    {
      id: 'audio',
      label: 'Audio',
      content: '<audio class="solumind-audio w-full" controls><source src="https://www.w3schools.com/html/horse.ogg" type="audio/ogg">Your browser does not support the audio tag.</audio>',
      media: '<i class="fas fa-volume-up"></i>'
    },
    {
      id: 'icon',
      label: 'Icon',
      content: '<i class="solumind-icon fas fa-star"></i>',
      media: '<i class="fas fa-icons"></i>'
    },
    {
      id: 'gallery',
      label: 'Image Gallery',
      content: '<div class="solumind-gallery grid grid-cols-3 gap-4"><img src="https://via.placeholder.com/300x200" alt="Image 1" class="w-full h-auto"><img src="https://via.placeholder.com/300x200" alt="Image 2" class="w-full h-auto"><img src="https://via.placeholder.com/300x200" alt="Image 3" class="w-full h-auto"></div>',
      media: '<i class="fas fa-images"></i>'
    },
  ],
  'Section Templates': [
    {
      id: 'hero-section',
      label: 'Hero Section',
      content: '<section class="solumind-hero-section bg-gray-800 text-white py-16"><div class="container mx-auto px-4"><div class="flex flex-wrap items-center"><div class="w-full lg:w-1/2 mb-8 lg:mb-0"><h1 class="text-4xl font-bold mb-4">Welcome to Our Website</h1><p class="text-xl mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p><button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Get Started</button></div><div class="w-full lg:w-1/2"><img src="https://via.placeholder.com/600x400" alt="Hero Image" class="rounded shadow-lg"></div></div></div></section>',
      media: '<i class="fas fa-star"></i>'
    },
    {
      id: 'features-section',
      label: 'Features Section',
      content: '<section class="solumind-features-section py-16"><div class="container mx-auto px-4"><h2 class="text-3xl font-bold text-center mb-12">Our Features</h2><div class="grid grid-cols-1 md:grid-cols-3 gap-8"><div class="text-center"><div class="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"><i class="fas fa-bolt text-2xl"></i></div><h3 class="text-xl font-bold mb-2">Fast & Efficient</h3><p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></div><div class="text-center"><div class="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"><i class="fas fa-lock text-2xl"></i></div><h3 class="text-xl font-bold mb-2">Secure</h3><p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></div><div class="text-center"><div class="bg-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"><i class="fas fa-cog text-2xl"></i></div><h3 class="text-xl font-bold mb-2">Customizable</h3><p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></div></div></div></section>',
      media: '<i class="fas fa-cubes"></i>'
    },
    {
      id: 'testimonials-section',
      label: 'Testimonials Section',
      content: '<section class="solumind-testimonials-section py-16 bg-gray-100"><div class="container mx-auto px-4"><h2 class="text-3xl font-bold text-center mb-12">What Our Clients Say</h2><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"><div class="bg-white p-6 rounded-lg shadow"><p class="italic mb-4">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero."</p><div class="flex items-center"><img src="https://via.placeholder.com/60x60" alt="Client" class="w-12 h-12 rounded-full mr-4"><div><h4 class="font-bold">John Doe</h4><p class="text-gray-600">CEO, Company Inc</p></div></div></div><div class="bg-white p-6 rounded-lg shadow"><p class="italic mb-4">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero."</p><div class="flex items-center"><img src="https://via.placeholder.com/60x60" alt="Client" class="w-12 h-12 rounded-full mr-4"><div><h4 class="font-bold">Jane Smith</h4><p class="text-gray-600">Designer, Studio X</p></div></div></div><div class="bg-white p-6 rounded-lg shadow"><p class="italic mb-4">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero."</p><div class="flex items-center"><img src="https://via.placeholder.com/60x60" alt="Client" class="w-12 h-12 rounded-full mr-4"><div><h4 class="font-bold">Mike Johnson</h4><p class="text-gray-600">Developer, Tech Co</p></div></div></div></div></div></section>',
      media: '<i class="fas fa-quote-right"></i>'
    },
    {
      id: 'contact-section',
      label: 'Contact Section',
      content: '<section class="solumind-contact-section py-16"><div class="container mx-auto px-4"><h2 class="text-3xl font-bold text-center mb-12">Contact Us</h2><div class="flex flex-wrap -mx-4"><div class="w-full lg:w-1/2 px-4 mb-8 lg:mb-0"><form><div class="mb-4"><label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label><input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" id="name" type="text" placeholder="Your Name"></div><div class="mb-4"><label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label><input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" id="email" type="email" placeholder="your@email.com"></div><div class="mb-4"><label class="block text-gray-700 text-sm font-bold mb-2" for="message">Message</label><textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-32" id="message" placeholder="Your Message"></textarea></div><div class="flex items-center justify-between"><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button">Send Message</button></div></form></div><div class="w-full lg:w-1/2 px-4"><div class="mb-6"><h3 class="text-xl font-bold mb-2">Address</h3><p class="text-gray-600">123 Street Name, City, Country</p></div><div class="mb-6"><h3 class="text-xl font-bold mb-2">Phone</h3><p class="text-gray-600">+1 234 567 890</p></div><div class="mb-6"><h3 class="text-xl font-bold mb-2">Email</h3><p class="text-gray-600">info@example.com</p></div><div><h3 class="text-xl font-bold mb-2">Follow Us</h3><div class="flex space-x-4"><a href="#" class="text-gray-600 hover:text-blue-500"><i class="fab fa-facebook text-2xl"></i></a><a href="#" class="text-gray-600 hover:text-blue-500"><i class="fab fa-twitter text-2xl"></i></a><a href="#" class="text-gray-600 hover:text-blue-500"><i class="fab fa-instagram text-2xl"></i></a><a href="#" class="text-gray-600 hover:text-blue-500"><i class="fab fa-linkedin text-2xl"></i></a></div></div></div></div></div></section>',
      media: '<i class="fas fa-envelope"></i>'
    },
    {
      id: 'pricing-section',
      label: 'Pricing Section',
      content: '<section class="solumind-pricing-section py-16"><div class="container mx-auto px-4"><h2 class="text-3xl font-bold text-center mb-12">Our Pricing Plans</h2><div class="flex flex-wrap -mx-4"><div class="w-full md:w-1/3 px-4 mb-8"><div class="bg-white rounded-lg shadow-lg overflow-hidden"><div class="bg-gray-100 py-4 px-6 border-b"><h3 class="text-xl font-bold text-center">Basic</h3></div><div class="p-6"><div class="text-center mb-6"><span class="text-4xl font-bold">$19</span><span class="text-gray-600">/month</span></div><ul class="mb-6"><li class="mb-2 flex items-center"><svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Feature 1</li><li class="mb-2 flex items-center"><svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Feature 2</li><li class="mb-2 flex items-center"><svg class="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> Feature 3</li><li class="flex items-center"><svg class="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> Feature 4</li></ul><button class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Get Started</button></div></div></div><div class="w-full md:w-1/3 px-4 mb-8"><div class="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-blue-500"><div class="bg-blue-500 py-4 px-6 border-b"><h3 class="text-xl font-bold text-center text-white">Pro</h3></div><div class="p-6"><div class="text-center mb-6"><span class="text-4xl font-bold">$49</span><span class="text-gray-600">/month</span></div><ul class="mb-6"><li class="mb-2 flex items-center"><svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Feature 1</li><li class="mb-2 flex items-center"><svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Feature 2</li><li class="mb-2 flex items-center"><svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Feature 3</li><li class="flex items-center"><svg class="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> Feature 4</li></ul><button class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Get Started</button></div></div></div><div class="w-full md:w-1/3 px-4 mb-8"><div class="bg-white rounded-lg shadow-lg overflow-hidden"><div class="bg-gray-100 py-4 px-6 border-b"><h3 class="text-xl font-bold text-center">Enterprise</h3></div><div class="p-6"><div class="text-center mb-6"><span class="text-4xl font-bold">$99</span><span class="text-gray-600">/month</span></div><ul class="mb-6"><li class="mb-2 flex items-center"><svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Feature 1</li><li class="mb-2 flex items-center"><svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Feature 2</li><li class="mb-2 flex items-center"><svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Feature 3</li><li class="flex items-center"><svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Feature 4</li></ul><button class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Get Started</button></div></div></div></div></div></section>',
      media: '<i class="fas fa-tags"></i>'
    },
  ],
};

// Function to register all base blocks
export function registerBaseBlocks(editor: SolumindEditor): void {
  // Register blocks for each category
  Object.entries(baseBlocks).forEach(([category, blocks]) => {
    // Create category container
    const categoryId = category.toLowerCase().replace(/\s+/g, '-');
    const categoryContainer = document.createElement('div');
    categoryContainer.className = 'solumind-block-category';
    categoryContainer.innerHTML = `
      <div class="solumind-block-category-header" data-category="${categoryId}">
        <h3 class="solumind-block-category-title">${category}</h3>
        <span class="solumind-block-category-toggle">▼</span>
      </div>
      <div class="solumind-block-category-content" data-category="${categoryId}"></div>
    `;
    
    // Add click event to toggle category content
    const header = categoryContainer.querySelector(`.solumind-block-category-header[data-category="${categoryId}"]`);
    const content = categoryContainer.querySelector(`.solumind-block-category-content[data-category="${categoryId}"]`);
    
    if (header && content) {
      header.addEventListener('click', () => {
        content.classList.toggle('collapsed');
        const toggle = header.querySelector('.solumind-block-category-toggle');
        if (toggle) {
          toggle.textContent = content.classList.contains('collapsed') ? '►' : '▼';
        }
      });
    }
    
    // Add blocks to category
    blocks.forEach(block => {
      editor.registerCustomBlock({
        ...block,
        category: categoryId,
      });
    });
    
    // Add category to blocks container
    const blocksContainer = editor.getContainer().querySelector('.solumind-blocks-container');
    if (blocksContainer) {
      blocksContainer.appendChild(categoryContainer);
    }
  });
}
