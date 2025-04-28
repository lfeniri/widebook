import React from "react";

export const ImageComponent: React.FC<{ config: any }> = ({ config }) => {
  return (
    <img
      src={config.src || "https://placehold.co/600x400?text=Image"}
      alt={config.alt || "Image"}
      style={{
        width: config.style?.width || "100%",
        borderRadius: config.style?.borderRadius || 0,
        ...config.style,
      }}
      className="object-cover"
    />
  );
};
