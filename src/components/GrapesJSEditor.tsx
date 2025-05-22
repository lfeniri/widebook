"use client";
import React, { useEffect, useRef } from "react";

// Import type definitions only, not the actual implementation
import type grapesjs from "grapesjs";
// Only import CSS statically, not the implementation
import "grapesjs/dist/css/grapes.min.css";

// Type for module imports
type ModuleWithDefault<T = any> = { default: T };

interface GrapesJSEditorProps {
  value?: { html: string; css: string };
  onChange?: (data: { html: string; css: string }) => void;
  height?: string;
}

const GrapesJSEditor: React.FC<GrapesJSEditorProps> = ({ value, onChange, height = "600px" }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const grapesEditor = useRef<any>(null);

  useEffect(() => {
    // Dynamically import and initialize editor
    const loadEditor = async () => {
      if (!editorRef.current || grapesEditor.current) return;

      try {
        // Dynamically import all modules that use window
        const grapesJSModule = await import('grapesjs') as ModuleWithDefault<typeof grapesjs>;

        // @ts-ignore - No type definitions available
        const grapesjsCustomCodeModule = await import('grapesjs-custom-code');
        // @ts-ignore - No type definitions available
        const presetWebpageModule = await import('grapesjs-preset-webpage');
        // @ts-ignore - No type definitions available
        const pluginFormsModule = await import('grapesjs-plugin-forms') as ModuleWithDefault;
        // @ts-ignore - No type definitions available
        const grapesjsComponentCodeEditorModule = await import('grapesjs-component-code-editor') as ModuleWithDefault;
        // @ts-ignore - No type definitions available
        const grapesjsParserPostcssModule = await import('grapesjs-parser-postcss') as ModuleWithDefault;

        // Initialize editor with dynamically loaded modules
        grapesEditor.current = grapesJSModule.default.init({
          container: editorRef.current,
          fromElement: false,
          width: "auto",
          showOffsets: true,
          noticeOnUnload: false,
          storageManager: false,
          selectorManager: {
            componentFirst: true
          },
          components: value?.html || '',
          style: value?.css || '',
          canvas: {
              styles: [
                  'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css'
              ]
          },
          panels: {
              defaults: [
              {
                  buttons: [
                  {
                      attributes: { title: 'Open Code' },
                      className: 'fa fa-home',
                      command: 'open-code',
                      id: 'open-code'
                  }
                  ],
                  id: 'views'
              }
              ]
          },
          plugins: [
            grapesjsCustomCodeModule.default,
            presetWebpageModule.default,
            pluginFormsModule.default,
            grapesjsComponentCodeEditorModule.default,
            grapesjsParserPostcssModule.default
          ],
          pluginsOpts: {
            grapesjsCustomCode: {},
            "grapesjs-component-code-editor": {}
          },
        });

        const pn = grapesEditor.current.Panels;
        const panelViews = pn.addPanel({
          id: "views"
        });
        panelViews.get("buttons").add([
          {
            attributes: {
              title: "Open Code"
            },
            className: "fa fa-file-code-o",
            command: "open-code",
            togglable: false, //do not close when button is clicked again
            id: "open-code"
          }
        ]);

        // Ajout des blocs de base
        grapesEditor.current.on('update', () => {
          if (onChange) {
            const html = grapesEditor.current.getWrapper().toHTML();
            const css = grapesEditor.current.getCss();
            onChange({ html, css });
          }
        });
      } catch (error) {
        console.error("Error loading GrapesJS editor:", error);
      }
    };

    loadEditor();

    return () => {
      if (grapesEditor.current) {
        grapesEditor.current.destroy();
        grapesEditor.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (grapesEditor.current && value !== undefined) {
      // Vérifier si les valeurs ont réellement changé pour éviter des rechargements inutiles
      const currentHtml = grapesEditor.current.getHtml();
      const currentCss = grapesEditor.current.getCss();

      if (value.html !== currentHtml || value.css !== currentCss) {
        grapesEditor.current.setComponents(value.html || '');
        grapesEditor.current.setStyle(value.css || '');

        // Afficher une notification que le contenu a été mis à jour
        if (currentHtml && currentCss) {
          const notification = document.createElement('div');
          notification.textContent = 'Contenu mis à jour par l\'assistant IA';
          notification.style.position = 'fixed';
          notification.style.bottom = '20px';
          notification.style.right = '20px';
          notification.style.backgroundColor = '#4CAF50';
          notification.style.color = 'white';
          notification.style.padding = '10px 20px';
          notification.style.borderRadius = '5px';
          notification.style.zIndex = '9999';

          document.body.appendChild(notification);

          setTimeout(() => {
            document.body.removeChild(notification);
          }, 3000);
        }
      }
    }
  }, [value]);

  return <div ref={editorRef} style={{ minHeight: height, border: "1px solid #e5e7eb", borderRadius: 8, background: "#fff" }} />;
};

export default GrapesJSEditor;
