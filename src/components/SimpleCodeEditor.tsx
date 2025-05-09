"use client";
import React, { useEffect, useRef } from "react";
import { createLightCodeEditor, CodeEditorLanguage } from "../../lib/solumindEditorJs/light-editor";
// Importer les styles CSS de base de l'éditeur
import "../../lib/solumindEditorJs/styles/editor.css";

interface CodeEditorProps {
  value?: { html: string; css: string; js: string };
  onChange?: (data: { html: string; css: string; js: string }) => void;
  height?: string;
}

const SimpleCodeEditor: React.FC<CodeEditorProps> = ({
  value = { html: "", css: "", js: "" },
  onChange,
  height = "600px"
}) => {
  const htmlEditorRef = useRef<HTMLDivElement>(null);
  const cssEditorRef = useRef<HTMLDivElement>(null);
  const jsEditorRef = useRef<HTMLDivElement>(null);
  
  const htmlEditorInstance = useRef<any>(null);
  const cssEditorInstance = useRef<any>(null);
  const jsEditorInstance = useRef<any>(null);

  const [activeTab, setActiveTab] = React.useState<'html' | 'css' | 'js'>('html');
  
  // Fonction pour changer d'onglet et mettre à jour les statistiques
  const changeTab = (tab: 'html' | 'css' | 'js') => {
    setActiveTab(tab);
    // Mettre à jour les statistiques après le changement d'onglet
    setTimeout(updateStats, 100);
  };
  
  // Initialize editors
  useEffect(() => {
    if (htmlEditorRef.current && !htmlEditorInstance.current) {
      console.log("Initializing HTML editor...");
      htmlEditorInstance.current = createLightCodeEditor(htmlEditorRef.current, {
        value: value.html,
        language: 'html',
        onChange: (content) => {
          if (onChange) {
            onChange({
              html: content,
              css: cssEditorInstance.current?.getValue() || value.css,
              js: jsEditorInstance.current?.getValue() || value.js
            });
          }
        }
      });
    }
    
    if (cssEditorRef.current && !cssEditorInstance.current) {
      console.log("Initializing CSS editor...");
      cssEditorInstance.current = createLightCodeEditor(cssEditorRef.current, {
        value: value.css,
        language: 'css',
        onChange: (content) => {
          if (onChange) {
            onChange({
              html: htmlEditorInstance.current?.getValue() || value.html,
              css: content,
              js: jsEditorInstance.current?.getValue() || value.js
            });
          }
        }
      });
    }
    
    if (jsEditorRef.current && !jsEditorInstance.current) {
      console.log("Initializing JS editor...");
      jsEditorInstance.current = createLightCodeEditor(jsEditorRef.current, {
        value: value.js,
        language: 'js',
        onChange: (content) => {
          if (onChange) {
            onChange({
              html: htmlEditorInstance.current?.getValue() || value.html,
              css: cssEditorInstance.current?.getValue() || value.css,
              js: content
            });
          }
        }
      });
    }
    
    return () => {
      htmlEditorInstance.current?.destroy();
      cssEditorInstance.current?.destroy();
      jsEditorInstance.current?.destroy();
    };
  }, []);
    // État pour suivre les statistiques d'édition (lignes, caractères)
  const [stats, setStats] = React.useState({ lines: 0, chars: 0 });
  
  // Mettre à jour les statistiques
  const updateStats = () => {
    let text = "";
    
    switch(activeTab) {
      case 'html':
        text = htmlEditorInstance.current?.getValue() || "";
        break;
      case 'css':
        text = cssEditorInstance.current?.getValue() || "";
        break;
      case 'js':
        text = jsEditorInstance.current?.getValue() || "";
        break;
    }
    
    const lines = text.split('\n').length;
    const chars = text.length;
    setStats({ lines, chars });
  };

  // Format code
  const formatActiveEditor = () => {
    switch(activeTab) {
      case 'html':
        htmlEditorInstance.current?.formatCode?.();
        break;
      case 'css':
        cssEditorInstance.current?.formatCode?.();
        break;
      case 'js':
        jsEditorInstance.current?.formatCode?.();
        break;
    }
    
    // Mettre à jour les statistiques après formatage
    setTimeout(updateStats, 100);
  };
  
  // Update editor content when value changes from props
  useEffect(() => {
    if (htmlEditorInstance.current && value.html !== undefined && htmlEditorInstance.current.getValue() !== value.html) {
      htmlEditorInstance.current.setValue(value.html);
    }
    
    if (cssEditorInstance.current && value.css !== undefined && cssEditorInstance.current.getValue() !== value.css) {
      cssEditorInstance.current.setValue(value.css);
    }
    
    if (jsEditorInstance.current && value.js !== undefined && jsEditorInstance.current.getValue() !== value.js) {
      jsEditorInstance.current.setValue(value.js);
    }
  }, [value]);

  // Mettre à jour les statistiques lorsque le contenu change
  useEffect(() => {
    updateStats();
  }, [activeTab, value]);

  // Mettre à jour les statistiques lorsque l'éditeur est initialement chargé
  useEffect(() => {
    setTimeout(updateStats, 500);
  }, []);

  // Calculate editor heights
  const containerHeight = parseInt(height, 10);
  const editorHeight = containerHeight - 50; // 50px for tabs and controls
  
  return (
    <div style={{ 
      border: "1px solid #e5e7eb", 
      borderRadius: "8px", 
      overflow: "hidden", 
      height: height,
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#fff"
    }}>
      {/* Tabs */}
      <div style={{
        display: "flex",
        borderBottom: "1px solid #e5e7eb",
        backgroundColor: "#f8f9fa"
      }}>        <button 
          onClick={() => changeTab('html')} 
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === 'html' ? "#fff" : "transparent",
            border: "none",
            borderBottom: activeTab === 'html' ? "2px solid #FF385C" : "none",
            cursor: "pointer",
            fontWeight: activeTab === 'html' ? "bold" : "normal"
          }}
        >
          HTML
        </button>
        <button 
          onClick={() => changeTab('css')} 
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === 'css' ? "#fff" : "transparent",
            border: "none",
            borderBottom: activeTab === 'css' ? "2px solid #FF385C" : "none",
            cursor: "pointer",
            fontWeight: activeTab === 'css' ? "bold" : "normal"
          }}
        >
          CSS
        </button>
        <button 
          onClick={() => changeTab('js')} 
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === 'js' ? "#fff" : "transparent",
            border: "none",
            borderBottom: activeTab === 'js' ? "2px solid #FF385C" : "none",
            cursor: "pointer",
            fontWeight: activeTab === 'js' ? "bold" : "normal"
          }}
        >
          JavaScript
        </button>
          {/* Statistics and format button */}
        <div style={{ 
          marginLeft: "auto", 
          padding: "5px",
          display: "flex",
          alignItems: "center",
          gap: "15px"
        }}>
          {/* Statistics */}
          <div style={{
            fontSize: "12px",
            color: "#666",
            display: "flex",
            gap: "10px"
          }}>
            <span>{stats.lines} lignes</span>
            <span>{stats.chars} caractères</span>
          </div>
          
          {/* Format button */}
          <button 
            onClick={formatActiveEditor}
            style={{
              padding: "5px 10px",
              backgroundColor: "#FF385C",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Format
          </button>
        </div>
      </div>
      
      {/* Editor containers */}
      <div style={{ flex: 1, position: "relative" }}>
        <div 
          ref={htmlEditorRef} 
          style={{ 
            height: `${editorHeight}px`,
            display: activeTab === 'html' ? 'block' : 'none',
            width: '100%'
          }} 
        />
        <div 
          ref={cssEditorRef} 
          style={{ 
            height: `${editorHeight}px`,
            display: activeTab === 'css' ? 'block' : 'none',
            width: '100%'
          }} 
        />
        <div 
          ref={jsEditorRef} 
          style={{ 
            height: `${editorHeight}px`,
            display: activeTab === 'js' ? 'block' : 'none',
            width: '100%'
          }} 
        />
      </div>
    </div>
  );
};

export default SimpleCodeEditor;
