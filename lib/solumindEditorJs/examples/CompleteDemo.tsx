"use client";
import React, { useState, useRef, useEffect } from 'react';
import { SolumindEditor } from '../';

export default function CompleteDemo() {
  const editorRef = useRef(null);
  const [activeTab, setActiveTab] = useState('editor');
  const [content, setContent] = useState({
    html: `
<div class="min-h-screen bg-gray-50">
  <!-- Hero Section -->
  <div class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
    <div class="container mx-auto px-6 text-center">
      <h1 class="text-5xl font-bold mb-4">SolumindEditor Demo</h1>
      <p class="text-xl mb-8">A powerful page builder for Next.js projects</p>
      <button class="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
        Try it Now
      </button>
    </div>
  </div>
  
  <!-- Features Section -->
  <div class="container mx-auto px-6 py-16">
    <h2 class="text-3xl font-bold text-center mb-12">Key Features</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
      <!-- Feature 1 -->
      <div class="bg-white rounded-xl p-8 shadow-md">
        <div class="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">Drag & Drop Interface</h3>
        <p class="text-gray-600">Easily build pages by dragging and dropping components onto your canvas.</p>
      </div>
      
      <!-- Feature 2 -->
      <div class="bg-white rounded-xl p-8 shadow-md">
        <div class="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">Style Manager</h3>
        <p class="text-gray-600">Advanced styling options with an intuitive interface for customizing components.</p>
      </div>
      
      <!-- Feature 3 -->
      <div class="bg-white rounded-xl p-8 shadow-md">
        <div class="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">Code Editor</h3>
        <p class="text-gray-600">Built-in code editor with Monaco integration for advanced customization.</p>
      </div>
    </div>
  </div>
  
  <!-- CTA Section -->
  <div class="bg-indigo-700 py-16">
    <div class="container mx-auto px-6 text-center">
      <h2 class="text-3xl font-bold text-white mb-4">Ready to build amazing pages?</h2>
      <p class="text-indigo-100 mb-8 max-w-2xl mx-auto">Start creating beautiful, responsive web pages with our intuitive editor.</p>
      <div class="flex justify-center space-x-4">
        <button class="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
          Get Started
        </button>
        <button class="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-colors">
          Learn More
        </button>
      </div>
    </div>
  </div>
</div>
    `,
    css: `
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.feature-icon {
  transition: transform 0.3s ease;
}

.bg-white:hover .feature-icon {
  transform: scale(1.1);
}

button {
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
    `,
    js: `
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('button');
  
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      alert('Button clicked! In a real application, this would perform an action.');
    });
  });
});
    `
  });
  
  const [showCode, setShowCode] = useState(false);
  const [markupType, setMarkupType] = useState('html');
  const [devicePreview, setDevicePreview] = useState('desktop');

  const handleChange = (data) => {
    setContent(data);
  };

  // Access the editor instance
  useEffect(() => {
    if (editorRef.current && editorRef.current.editor) {
      const editor = editorRef.current.editor;
      
      // Register a custom component
      editor.registerCustomComponent({
        id: 'custom-testimonial',
        label: 'Testimonial Card',
        isNextJs: false,
        component: {
          content: `
            <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 class="font-bold">{{name}}</h4>
                  <p class="text-gray-600 text-sm">{{position}}</p>
                </div>
              </div>
              <p class="text-gray-700 mb-4">{{quote}}</p>
              <div class="flex text-yellow-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          `,
          props: {
            name: 'John Doe',
            position: 'CEO, Example Inc.',
            quote: 'This product has transformed our workflow. Highly recommended!'
          }
        },
        props: {
          name: {
            type: 'string',
            default: 'John Doe'
          },
          position: {
            type: 'string',
            default: 'CEO, Example Inc.'
          },
          quote: {
            type: 'string',
            default: 'This product has transformed our workflow. Highly recommended!'
          }
        }
      });
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">SolumindEditor Demo</h1>
          
          <div className="flex space-x-4">
            {/* Device Preview Buttons */}
            <div className="flex border border-white border-opacity-20 rounded-lg">
              <button 
                className={`px-3 py-1 ${devicePreview === 'desktop' ? 'bg-white bg-opacity-20' : ''}`}
                onClick={() => setDevicePreview('desktop')}
                title="Desktop Preview"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
              <button 
                className={`px-3 py-1 ${devicePreview === 'tablet' ? 'bg-white bg-opacity-20' : ''}`}
                onClick={() => setDevicePreview('tablet')}
                title="Tablet Preview"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </button>
              <button 
                className={`px-3 py-1 ${devicePreview === 'mobile' ? 'bg-white bg-opacity-20' : ''}`}
                onClick={() => setDevicePreview('mobile')}
                title="Mobile Preview"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            
            {/* Code Toggle Button */}
            <button 
              className={`px-4 py-1 rounded-lg ${showCode ? 'bg-white text-blue-600' : 'border border-white'}`}
              onClick={() => setShowCode(!showCode)}
            >
              {showCode ? 'Hide Code' : 'Show Code'}
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Editor */}
        {!showCode && (
          <div className="flex-1">
            <SolumindEditor
              ref={editorRef}
              value={content}
              onChange={handleChange}
              height="calc(100vh - 64px)"
              config={{ devicePreview }}
            />
          </div>
        )}
        
        {/* Code View */}
        {showCode && (
          <div className="flex-1 bg-gray-900 text-gray-100 flex flex-col">
            {/* Code Tabs */}
            <div className="bg-gray-800 px-4 border-b border-gray-700 flex">
              <button 
                className={`px-4 py-3 ${markupType === 'html' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
                onClick={() => setMarkupType('html')}
              >
                HTML
              </button>
              <button 
                className={`px-4 py-3 ${markupType === 'css' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
                onClick={() => setMarkupType('css')}
              >
                CSS
              </button>
              <button 
                className={`px-4 py-3 ${markupType === 'js' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
                onClick={() => setMarkupType('js')}
              >
                JavaScript
              </button>
            </div>
            
            {/* Code Content */}
            <div className="flex-1 overflow-auto p-4">
              <pre className="font-mono text-sm">
                <code>
                  {markupType === 'html' && content.html}
                  {markupType === 'css' && content.css}
                  {markupType === 'js' && content.js}
                </code>
              </pre>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
