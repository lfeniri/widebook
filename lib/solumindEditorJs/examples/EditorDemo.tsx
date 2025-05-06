"use client";

import React, { useState } from 'react';
import { SolumindEditor } from '../';

export default function EditorDemo() {
  const [content, setContent] = useState({
    html: `
<div class="container mx-auto p-8">
  <header class="mb-8">
    <h1 class="text-3xl font-bold text-blue-600">Welcome to SolumindEditor</h1>
    <p class="text-gray-600">A powerful drag and drop page builder for Next.js</p>
  </header>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4">Key Features</h2>
      <ul class="list-disc pl-5 space-y-2">
        <li>TailwindCSS Integration</li>
        <li>Advanced Style Manager</li>
        <li>Custom Components Support</li>
        <li>Next.js Components</li>
        <li>Full Code Editor with Monaco</li>
      </ul>
    </div>
    
    <div class="bg-blue-50 p-6 rounded-lg border border-blue-100">
      <h2 class="text-xl font-semibold mb-4">Getting Started</h2>
      <p class="mb-4">Try dragging components from the left sidebar and drop them here.</p>
      <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
        Learn More
      </button>
    </div>
  </div>
</div>
`,
    css: `
.container {
  font-family: 'Inter', sans-serif;
}

h1 {
  position: relative;
}

h1::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 3px;
  background-color: #2563eb;
}
`,
    js: `
// Example of custom JavaScript
document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('button');
  if (button) {
    button.addEventListener('click', () => {
      alert('Welcome to SolumindEditor!');
    });
  }
});
`
  });

  const handleChange = (newContent) => {
    console.log('Content updated:', newContent);
    setContent(newContent);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">SolumindEditor Demo</h1>
      <div className="mb-4">
        <SolumindEditor
          value={content}
          onChange={handleChange}
          height="80vh"
        />
      </div>
    </div>
  );
}
