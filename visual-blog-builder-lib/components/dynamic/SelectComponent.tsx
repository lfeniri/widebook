import React from "react";

export const SelectComponent: React.FC<{ config: any }> = ({ config }) => {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1">{config.label || "Sélectionnez une option"}</span>
      <select className="border rounded p-2 w-full" style={config.style}>
        {(config.options || []).map((opt: string, idx: number) => (
          <option key={idx} value={opt}>{opt}</option>
        ))}
      </select>
    </label>
  );
};
