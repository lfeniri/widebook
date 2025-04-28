"use client";

import React from "react";

export const BadgeComponent: React.FC<{ config: any }> = ({ config }) => {
  return (
    <span
      style={{
        backgroundColor: config.style?.backgroundColor || "#f59e42",
        color: config.style?.color || "#fff",
        borderRadius: 12,
        padding: "0.2em 0.8em",
        fontWeight: 600,
        fontSize: 14,
        ...config.style,
      }}
      className="inline-block align-middle"
    >
      {config.text || "Badge"}
    </span>
  );
};
