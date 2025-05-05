"use client";
import React, { useEffect, useRef } from "react";

import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import grapesjsCustomCode from "grapesjs-custom-code";
import pluginAdvanceComponents from 'grapesjs-advance-components';
import presetWebpage from 'grapesjs-preset-webpage';
import pluginForms from 'grapesjs-plugin-forms';

interface GrapesJSEditorProps {
  value?: { html: string; css: string };
  onChange?: (data: { html: string; css: string }) => void;
  height?: string;
}

const GrapesJSEditor: React.FC<GrapesJSEditorProps> = ({ value, onChange, height = "600px" }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const grapesEditor = useRef<any>(null);

  useEffect(() => {
    if (editorRef.current && !grapesEditor.current) {
      grapesEditor.current = grapesjs.init({
        container: editorRef.current,
        fromElement: false,
               width: "auto",
        storageManager: false,
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
                //...
                {
                    attributes: { title: 'Open Code' },
                    className: 'fa fa-home',
                    command: 'open-code',
                    id: 'open-code'
                }
                //...
                ],
                id: 'views'
            }
            ]
        },
        plugins: [grapesjsCustomCode, pluginAdvanceComponents, presetWebpage, pluginForms, 'grapesjs-component-code-editor'],
        pluginsOpts: {
          grapesjsCustomCode: {}
        },
      });

      // Ajout des blocs de base
    

      grapesEditor.current.on('update', () => {
        if (onChange) {
          const html = grapesEditor.current.getWrapper().toHTML();
          const css = grapesEditor.current.getCss();
          onChange({ html, css });
        }
      });
    }
    return () => {
      if (grapesEditor.current) {
        grapesEditor.current.destroy();
        grapesEditor.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (grapesEditor.current && value !== undefined) {
      grapesEditor.current.setComponents(value.html || '');
      grapesEditor.current.setStyle(value.css || '');
    }
  }, [value]);

  return <div ref={editorRef} style={{ minHeight: height, border: "1px solid #e5e7eb", borderRadius: 8, background: "#fff" }} />;
};

export default GrapesJSEditor;
