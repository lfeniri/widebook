import React from "react";

export const TitleComponent: React.FC<{ config: any }> = ({ config }) => {
  return <h1 className="text-2xl font-bold" style={config.style}>{config.text || "Titre..."}</h1>;
};
