import React from "react";

export const ButtonComponent: React.FC<{ config: any }> = ({ config }) => {
  return (
    <a
      href={config.url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        backgroundColor: config.style?.backgroundColor || "#2563eb",
        color: config.style?.color || "#fff",
        padding: "0.5rem 1.5rem",
        borderRadius: 6,
        fontWeight: 600,
        textDecoration: "none",
        display: "inline-block",
        ...config.style,
      }}
      className="transition hover:opacity-80"
    >
      {config.label || "Bouton"}
    </a>
  );
};
