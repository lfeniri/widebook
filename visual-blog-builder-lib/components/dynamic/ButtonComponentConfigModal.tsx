"use client";

import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { ButtonConfig } from '../../types/blogBuilderTypes';

interface ButtonComponentConfigModalProps {
  config: ButtonConfig;
  onSave: (config: ButtonConfig) => void;
  onClose: () => void;
}

export const ButtonComponentConfigModal = forwardRef<any, ButtonComponentConfigModalProps>(({ config, onSave, onClose }, ref) => {
  const safeConfig = config || {};
  const safeStyle = safeConfig.style || {};

  const [label, setLabel] = useState(safeConfig.label || "");
  const [color, setColor] = useState(safeStyle.backgroundColor || "#2563eb");
  const [textColor, setTextColor] = useState(safeStyle.color || "#fff");
  const [url, setUrl] = useState(safeConfig.url || "");
  const [fontWeight, setFontWeight] = useState(safeStyle.fontWeight || "bold");
  const [fontFamily, setFontFamily] = useState(safeStyle.fontFamily || "inherit");
  const [padding, setPadding] = useState(safeStyle.padding || "8px 24px");
  const [margin, setMargin] = useState(safeStyle.margin || "0px");
  const [shadow, setShadow] = useState(safeStyle.boxShadow || "none");
  const [border, setBorder] = useState(safeStyle.border || "none");
  const [ariaLabel, setAriaLabel] = useState(safeConfig.ariaLabel || "");

  useEffect(() => {
    setLabel(safeConfig.label || "");
    setColor(safeStyle.backgroundColor || "#2563eb");
    setTextColor(safeStyle.color || "#fff");
    setUrl(safeConfig.url || "");
    setFontWeight(safeStyle.fontWeight || "bold");
    setFontFamily(safeStyle.fontFamily || "inherit");
    setPadding(safeStyle.padding || "8px 24px");
    setMargin(safeStyle.margin || "0px");
    setShadow(safeStyle.boxShadow || "none");
    setBorder(safeStyle.border || "none");
    setAriaLabel(safeConfig.ariaLabel || "");
  }, [config]);

  const handleSave = () => {
    onSave({
      ...safeConfig,
      label,
      url,
      ariaLabel,
      style: {
        ...safeStyle,
        backgroundColor: color,
        color: textColor,
        fontWeight,
        fontFamily,
        padding,
        margin,
        boxShadow: shadow,
        border,
      },
    });
  };

  useImperativeHandle(ref, () => ({
    save: handleSave
  }));

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl shadow-lg max-w-lg w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuration du bouton</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Label *</label>
          <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition" value={label} onChange={e => setLabel(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
          <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition" value={url} onChange={e => setUrl(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Couleur de fond</label>
            <input type="color" className="w-full h-10 rounded-md border border-gray-300" value={color} onChange={e => setColor(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Couleur du texte</label>
            <input type="color" className="w-full h-10 rounded-md border border-gray-300" value={textColor} onChange={e => setTextColor(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Font Weight</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={fontWeight} onChange={e => setFontWeight(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Font Family</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={fontFamily} onChange={e => setFontFamily(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Padding</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={padding} onChange={e => setPadding(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Margin</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={margin} onChange={e => setMargin(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Box Shadow</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={shadow} onChange={e => setShadow(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Border</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={border} onChange={e => setBorder(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Aria-label (accessibilité)</label>
          <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={ariaLabel} onChange={e => setAriaLabel(e.target.value)} />
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-6">
        <button type="button" className="px-5 py-2 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition" onClick={onClose}>Annuler</button>
        <button type="button" className="px-5 py-2 rounded-lg font-semibold bg-primary text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition" onClick={handleSave}>Enregistrer</button>
      </div>
    </div>
  );
});
