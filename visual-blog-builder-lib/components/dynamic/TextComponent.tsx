import React from "react";

export const TextComponent: React.FC<{ config: any }> = ({ config }) => {
  return <div className="text-base" style={config.style}>{config.text || "Texte..."}</div>;
};
