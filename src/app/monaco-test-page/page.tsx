'use client';

import { useEffect, useRef, useState } from 'react';
import { createSolumindEditor } from '@/lib/editorCore';
import '@/app/editor.css';
import '@/app/monaco-editor.css';

export default function TestMonacoPage() {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorStatus, setEditorStatus] = useState('Initializing...');

  useEffect(() => {
    if (editorRef.current) {
      try {
        const editor = createSolumindEditor({
          container: editorRef.current,
          height: '600px',
          width: 'auto',
          components: '<div class="test-container">\n  <h1>Hello Monaco Editor</h1>\n  <p>Edit me to test the editor!</p>\n</div>',
          style: '.test-container {\n  background-color: #f0f0f0;\n  padding: 20px;\n  border-radius: 8px;\n}\n\nh1 {\n  color: #333;\n}\n\np {\n  color: #666;\n}',
          script: 'console.log("Monaco Editor is working!");\n\ndocument.querySelector("h1").addEventListener("click", function() {\n  alert("Hello from Monaco Editor!");\n});'
        });

        editor.on('update', () => {
          setEditorStatus('Editor updated: ' + new Date().toLocaleTimeString());
        });

        setEditorStatus('Editor loaded successfully!');
      } catch (error) {
        console.error('Error initializing editor:', error);
        setEditorStatus(`Error: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Monaco Editor Test</h1>
      <div className="mb-4 p-2 bg-gray-100 border rounded">
        Status: {editorStatus}
      </div>
      <div
        ref={editorRef}
        className="border rounded"
        style={{ height: '600px', width: '100%' }}
      ></div>
    </div>
  );
}
