import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { TextConfig } from '../../types/blogBuilderTypes';

interface TextComponentConfigModalProps {
  config: TextConfig;
  onSave: (config: TextConfig) => void;
  onClose: () => void;
}

export const TextComponentConfigModal = forwardRef<any, TextComponentConfigModalProps>(({ config, onSave, onClose }, ref) => {
  const safeConfig = config || {};
  const safeStyle = safeConfig.style || {};

  const [text, setText] = useState(safeConfig.text || "");
  const [color, setColor] = useState(safeStyle.color || "#222");
  const [fontSize, setFontSize] = useState(safeStyle.fontSize || "16px");
  const [fontWeight, setFontWeight] = useState(safeStyle.fontWeight || "normal");
  const [fontFamily, setFontFamily] = useState(safeStyle.fontFamily || "inherit");
  const [textAlign, setTextAlign] = useState(safeStyle.textAlign || "left");
  const [padding, setPadding] = useState(safeStyle.padding || "0px");
  const [margin, setMargin] = useState(safeStyle.margin || "0px");
  const [shadow, setShadow] = useState(safeStyle.boxShadow || "none");
  const [border, setBorder] = useState(safeStyle.border || "none");
  const [maxWidth, setMaxWidth] = useState(safeStyle.maxWidth || "100%");
  const [ariaLabel, setAriaLabel] = useState(safeConfig.ariaLabel || "");

  useEffect(() => {
    setText(safeConfig.text || "");
    setColor(safeStyle.color || "#222");
    setFontSize(safeStyle.fontSize || "16px");
    setFontWeight(safeStyle.fontWeight || "normal");
    setFontFamily(safeStyle.fontFamily || "inherit");
    setTextAlign(safeStyle.textAlign || "left");
    setPadding(safeStyle.padding || "0px");
    setMargin(safeStyle.margin || "0px");
    setShadow(safeStyle.boxShadow || "none");
    setBorder(safeStyle.border || "none");
    setMaxWidth(safeStyle.maxWidth || "100%");
    setAriaLabel(safeConfig.ariaLabel || "");
  }, [config]);

  const handleSave = () => {
    onSave({
      ...safeConfig,
      text,
      ariaLabel,
      style: {
        ...safeStyle,
        color,
        fontSize,
        fontWeight,
        fontFamily,
        textAlign,
        padding,
        margin,
        boxShadow: shadow,
        border,
        maxWidth,
      },
    });
  };

  useImperativeHandle(ref, () => ({
    save: handleSave
  }));

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl shadow-lg max-w-lg w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuration Texte</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Texte *</label>
          <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition" value={text} onChange={e => setText(e.target.value)} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Couleur du texte</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={color} onChange={e => setColor(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={fontSize} onChange={e => setFontSize(e.target.value)} />
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Text Align</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={textAlign} onChange={e => setTextAlign(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Padding</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={padding} onChange={e => setPadding(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Margin</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={margin} onChange={e => setMargin(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Box Shadow</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={shadow} onChange={e => setShadow(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Border</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={border} onChange={e => setBorder(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Width</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={maxWidth} onChange={e => setMaxWidth(e.target.value)} />
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
