# SolumindEditorJs Integration Guide

This guide will help you integrate the SolumindEditorJs library into your Next.js project.

## Table of Contents

1. [Installation](#installation)
2. [Basic Usage](#basic-usage)
3. [Advanced Configuration](#advanced-configuration)
4. [Custom Components](#custom-components)
5. [Styling](#styling)
6. [Troubleshooting](#troubleshooting)

## Installation

### Option 1: Using the Installation Script

The easiest way to install SolumindEditorJs is by using the installation script:

```bash
node ./node_modules/solumind-editor-js/scripts/install.js
```

This script will:
- Install the library locally
- Create example components and pages (optional)
- Set up CSS files (optional)

### Option 2: Manual Installation

#### 1. Install as a Local Package

```bash
npm install --save ./lib/solumindEditorJs
```

#### 2. Import Styles

Create a CSS file in your project's styles directory and import it in your layout:

```jsx
// app/layout.js or src/app/layout.js
import '@/styles/solumind-editor.css';
```

## Basic Usage

### Creating a Simple Editor Component

```jsx
"use client";

import { SolumindEditor } from 'solumind-editor-js';
import { useState } from 'react';

export default function EditorPage() {
  const [content, setContent] = useState({
    html: '<div class="container mx-auto p-4">Hello World</div>',
    css: '.container { background-color: #f8f9fa; }',
    js: 'console.log("Editor loaded");'
  });

  const handleChange = (data) => {
    setContent(data);
    // You can save this data to your database
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Page Editor</h1>
      <SolumindEditor
        value={content}
        onChange={handleChange}
        height="70vh"
      />
    </div>
  );
}
```

### Client-Side Rendering

Since the editor uses DOM manipulation, you need to ensure it's only rendered on the client-side:

```jsx
// Option 1: Use the "use client" directive
"use client";
import { SolumindEditor } from 'solumind-editor-js';

// Option 2: Use dynamic import with SSR disabled
import dynamic from 'next/dynamic';

const SolumindEditor = dynamic(
  () => import('solumind-editor-js').then(mod => mod.SolumindEditor),
  { ssr: false }
);
```

## Advanced Configuration

### Configuration Options

```jsx
<SolumindEditor
  value={content}
  onChange={handleChange}
  height="70vh"
  config={{
    // Canvas configuration
    canvas: {
      styles: [
        'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
        '/css/custom.css'
      ]
    },
    // Panel configuration
    panels: {
      // Custom panel configuration
    },
    // Block categories
    blockCategories: [
      // Custom block categories
    ],
    // Enable/disable features
    features: {
      codeEditor: true,
      styleManager: true,
      responsivePreview: true
    }
  }}
/>
```

### Accessing the Editor Instance

```jsx
"use client";
import { useRef, useEffect } from 'react';
import { SolumindEditor } from 'solumind-editor-js';

export default function EditorWithRef() {
  const editorRef = useRef(null);
  
  useEffect(() => {
    if (editorRef.current && editorRef.current.editor) {
      const editor = editorRef.current.editor;
      
      // You can use the editor instance methods
      console.log(editor.getHtml());
      
      // Add custom commands
      editor.on('component:selected', (component) => {
        console.log('Selected component:', component);
      });
    }
  }, []);
  
  return <SolumindEditor ref={editorRef} height="70vh" />;
}
```

## Custom Components

### Registering Custom Components

```jsx
"use client";
import { useRef, useEffect } from 'react';
import { SolumindEditor } from 'solumind-editor-js';

export default function EditorWithCustomComponents() {
  const editorRef = useRef(null);
  
  useEffect(() => {
    if (editorRef.current && editorRef.current.editor) {
      const editor = editorRef.current.editor;
      
      // Register a custom component
      editor.registerCustomComponent({
        id: 'custom-card',
        label: 'Custom Card',
        isNextJs: false,
        component: {
          content: `
            <div class="bg-white p-4 rounded-lg shadow-md">
              <h3 class="text-lg font-semibold mb-2">{{title}}</h3>
              <p class="text-gray-600">{{description}}</p>
              <button class="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                {{buttonText}}
              </button>
            </div>
          `,
          props: {
            title: 'Card Title',
            description: 'Card description goes here',
            buttonText: 'Learn More'
          }
        },
        props: {
          title: {
            type: 'string',
            default: 'Card Title'
          },
          description: {
            type: 'string',
            default: 'Card description goes here'
          },
          buttonText: {
            type: 'string',
            default: 'Learn More'
          }
        }
      });
      
      // Register a Next.js component
      editor.registerCustomComponent({
        id: 'nextjs-hero',
        label: 'Next.js Hero',
        isNextJs: true,
        component: {
          content: `
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-12">
              <h1 className="text-4xl font-bold mb-4">{props.title}</h1>
              <p className="text-xl mb-6">{props.subtitle}</p>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-medium">
                {props.buttonText}
              </button>
            </div>
          `,
          props: {
            title: 'Welcome to Our App',
            subtitle: 'The best solution for your needs',
            buttonText: 'Get Started'
          }
        },
        props: {
          title: {
            type: 'string',
            default: 'Welcome to Our App'
          },
          subtitle: {
            type: 'string',
            default: 'The best solution for your needs'
          },
          buttonText: {
            type: 'string',
            default: 'Get Started'
          }
        }
      });
    }
  }, []);
  
  return <SolumindEditor ref={editorRef} height="70vh" />;
}
```

## Styling

### Custom Styling for the Editor

You can override the default styling of the editor by creating a CSS file with the same class names:

```css
/* styles/solumind-editor-custom.css */
.solumind-editor {
  /* Custom editor styles */
}

.solumind-toolbar-button {
  /* Custom toolbar button styles */
}

.solumind-block {
  /* Custom block styles */
}
```

Then import your custom CSS after the editor's CSS:

```jsx
import 'solumind-editor-js/styles/editor.css';
import '@/styles/solumind-editor-custom.css';
```

## Troubleshooting

### Common Issues

#### Issue: Editor not rendering or showing errors

**Solution:**
- Ensure you're using client-side rendering with the "use client" directive or dynamic import
- Check browser console for errors
- Verify that all required dependencies are installed

#### Issue: Custom components not showing up

**Solution:**
- Make sure you're registering components after the editor is initialized
- Check that the component ID is unique
- Verify that the component content is valid HTML/JSX

#### Issue: CSS not applying correctly

**Solution:**
- Check that the editor CSS is imported correctly
- Make sure your custom CSS has the correct specificity
- Use browser dev tools to inspect the elements and verify classes

#### Issue: Undo/Redo not working as expected

**Solution:**
- The history manager has a debounce time, so rapid changes might be grouped
- Some operations might not be recorded in history (like moving components)
- Try increasing the max history items in the configuration

### Getting Help

If you're still having issues, check the library's README and GitHub issues, or contact the Solumind team for support.
