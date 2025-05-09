"use client";
import React, { useRef, useEffect } from "react";

interface CodePreviewProps {
  html: string;
  css: string;
  js: string;
  height: string;
}

const CodePreview: React.FC<CodePreviewProps> = ({ html, css, js, height }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  useEffect(() => {
    // Mettre à jour le contenu de l'iframe
    updateIframeContent();
  }, [html, css, js]);
  
  // Mettre à jour le contenu de l'iframe
  const updateIframeContent = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (doc) {
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                /* Réinitialisation des styles de base */
                body, html {
                  margin: 0;
                  padding: 0;
                  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                }
              </style>
              <!-- Tailwind CSS -->
              <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
              <!-- CSS personnalisé -->
              <style>${css}</style>
            </head>
            <body>
              ${html}
              <script>
                // Code JavaScript
                try {
                  ${js}
                } catch (error) {
                  console.error("Erreur dans le code JavaScript:", error);
                }
              </script>
            </body>
          </html>
        `);
        doc.close();
      }
    }
  };

  return (
    <div style={{ height, overflow: "hidden", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
      <iframe
        ref={iframeRef}
        style={{ width: "100%", height: "100%", border: "none" }}
        title="Code Preview"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};

export default CodePreview;
