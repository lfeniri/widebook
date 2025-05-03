"use client";
import React, { useEffect, useRef } from "react";

import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import grapesjsCustomCode from "grapesjs-custom-code";

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
        height,        width: "auto",
        storageManager: false,
        components: value?.html || '',
        style: value?.css || '',
        plugins: [grapesjsCustomCode],
        pluginsOpts: {
          grapesjsCustomCode: {},
        },
      });

      // Ajout des blocs de base
      const blockManager = grapesEditor.current.BlockManager;
      blockManager.add('section', {
        label: 'Section',
        attributes: { class: 'gjs-block-section' },
        content: '<section><h1>Titre de section</h1><p>Votre texte ici...</p></section>',
      });
      blockManager.add('text', {
        label: 'Texte',
        content: '<div data-gjs-type="text">Double-cliquez pour éditer le texte</div>',
      });
      blockManager.add('image', {
        label: 'Image',
        select: true,
        content: { type: 'image' },
        activate: true,
      });
      blockManager.add('2-columns', {
        label: '2 Colonnes',
        content:
          '<div class="row"><div class="cell" style="width: 50%; padding: 10px;">Colonne 1</div><div class="cell" style="width: 50%; padding: 10px;">Colonne 2</div></div>',
      });

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
