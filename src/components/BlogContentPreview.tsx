"use client";

import React, { useEffect, useRef } from "react";

interface BlogContentPreviewProps {
  content: {
    html?: string;
    css?: string;
    js?: string;
  };
  height?: string;
}

export default function BlogContentPreview({ content, height = "auto" }: BlogContentPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clean up any existing content
    containerRef.current.innerHTML = "";
    
    // Create content container
    const contentContainer = document.createElement("div");
    contentContainer.className = "blog-content-preview";
    contentContainer.innerHTML = content.html || "";
    
    // Create style element
    if (content.css) {
      const style = document.createElement("style");
      style.textContent = content.css;
      contentContainer.appendChild(style);
    }
    
    // Add script if present
    if (content.js) {
      const script = document.createElement("script");
      script.textContent = content.js;
      // Use defer to ensure DOM is fully loaded
      script.defer = true;
      contentContainer.appendChild(script);
    }
    
    // Add to container
    containerRef.current.appendChild(contentContainer);
    
    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [content]);

  return (
    <div 
      ref={containerRef} 
      className="blog-content-preview-container"
      style={{ 
        height, 
        overflow: "auto", 
        padding: "1rem",
        border: "1px solid #e5e7eb",
        borderRadius: "0.5rem"
      }}
    />
  );
}
