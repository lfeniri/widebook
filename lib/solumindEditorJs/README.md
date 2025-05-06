# SolumindEditorJs

A powerful web page builder inspired by GrapesJS but with enhanced capabilities for Next.js projects. This library allows you to create beautiful, responsive web pages with an intuitive drag-and-drop interface and extensive customization options.

![SolumindEditor Demo](https://via.placeholder.com/800x450?text=SolumindEditor)

## Features

✨ **Modern Interface**: Clean and intuitive user interface for effortless page building

🔄 **Drag and Drop**: Advanced drag and drop functionality for intuitive component placement

🎨 **Style Manager**: Extensive component customization via a user-friendly style manager

📱 **Responsive Design**: Preview your designs in desktop, tablet, and mobile views

🧩 **Custom Components**: Support for reusable sections and components (headers, footers, etc.)

⚛️ **Next.js Integration**: Ability to add custom Next.js components with their logic and parameters

🔍 **Code Editor**: Hidden code editor powered by Monaco for advanced HTML/CSS/JS editing

📦 **JSON Format**: Clean JSON output format for HTML, CSS, and JavaScript content

🧪 **Well-Tested**: Comprehensive test suite to ensure reliability

📚 **Documented**: Extensive documentation and examples for easy implementation

## Installation

```bash
npm install --save solumind-editor-js
# or
yarn add solumind-editor-js
```

## Usage

### React/Next.js Component

```tsx
import { SolumindEditor } from 'solumind-editor-js';

// In your component
export default function MyEditor() {
  const [content, setContent] = useState({
    html: '<div class="container mx-auto p-4">Hello World</div>',
    css: '.container { background-color: #f0f0f0; }',
    js: 'console.log("Welcome to SolumindEditor");'
  });

  const handleChange = (data) => {
    setContent(data);
    // Save to database or perform other actions
  };

  return (
    <SolumindEditor
      value={content}
      onChange={handleChange}
      height="80vh"
      config={{
        // Optional additional configuration
        panels: {
          // Custom panels configuration
        },
        blockCategories: [
          // Custom block categories
        ]
      }}
    />
  );
}
```

### Vanilla JavaScript

```javascript
import { createSolumindEditor } from 'solumind-editor-js';

// Initialize editor
const editor = createSolumindEditor({
  container: document.getElementById('editor-container'),
  components: '<div class="container mx-auto p-4">Hello World</div>',
  style: '.container { background-color: #f0f0f0; }',
  script: 'console.log("Welcome to SolumindEditor");'
});

// Listen for changes
editor.on('update', () => {
  const html = editor.getHtml();
  const css = editor.getCss();
  const js = editor.getJs();
  
  // Save or process the content
  console.log({ html, css, js });
});
```

## Adding Custom Components

### Adding Next.js Components

```tsx
import { SolumindEditor } from 'solumind-editor-js';

export default function MyEditor() {
  const editorRef = useRef(null);
  
  useEffect(() => {
    // Access the editor instance
    if (editorRef.current && editorRef.current.editor) {
      const editor = editorRef.current.editor;
      
      // Register a custom Next.js component
      editor.registerCustomComponent({
        id: 'my-nextjs-card',
        label: 'Custom Card',
        isNextJs: true,
        component: {
          content: '<div class="card">{{title}}<p>{{description}}</p></div>',
          props: {
            title: 'Card Title',
            description: 'Card Description'
          }
        },
        props: {
          title: {
            type: 'string',
            default: 'Card Title'
          },
          description: {
            type: 'string',
            default: 'Card Description'
          }
        }
      });
    }
  }, []);
  
  return <SolumindEditor ref={editorRef} height="80vh" />;
}
```

## API Reference

### SolumindEditor Component Props

| Prop | Type | Description |
|------|------|-------------|
| `value` | `{ html: string; css: string; js: string }` | Current editor content |
| `onChange` | `(data: { html: string; css: string; js: string }) => void` | Change handler function |
| `height` | `string` | Editor height (CSS value, default: '600px') |
| `config` | `object` | Additional editor configuration |

### Core Editor API

The core editor instance provides the following methods:

- `getHtml()`: Get the HTML content
- `getCss()`: Get the CSS content
- `getJs()`: Get the JavaScript content
- `setComponents(html)`: Set the HTML content
- `setStyle(css)`: Set the CSS content
- `setJs(js)`: Set the JavaScript content
- `on(event, callback)`: Add an event listener
- `off(event, callback)`: Remove an event listener
- `trigger(event, ...args)`: Trigger an event
- `destroy()`: Destroy the editor instance

## License

MIT
