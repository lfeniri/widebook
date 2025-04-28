"use client";

import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { CardConfig } from '../../types/blogBuilderTypes';

interface CardComponentConfigModalProps {
  config: CardConfig;
  onSave: (config: CardConfig) => void;
  onClose: () => void;
}

export const CardComponentConfigModal = forwardRef<any, CardComponentConfigModalProps>(({ config, onSave, onClose }, ref) => {
  const safeConfig = config || {};
  const safeStyle = safeConfig.style || {};

  const [title, setTitle] = useState(safeConfig.title || "");
  const [content, setContent] = useState(safeConfig.content || "");
  const [backgroundColor, setBackgroundColor] = useState(safeStyle.backgroundColor || "#fff");
  const [color, setColor] = useState(safeStyle.color || "#222");
  const [borderRadius, setBorderRadius] = useState(safeStyle.borderRadius || "0.5rem");
  const [boxShadow, setBoxShadow] = useState(safeStyle.boxShadow || "none");
  const [padding, setPadding] = useState(safeStyle.padding || "1rem");
  const [margin, setMargin] = useState(safeStyle.margin || "0.5rem");
  const [ariaLabel, setAriaLabel] = useState(safeConfig.ariaLabel || "");
  const [image, setImage] = useState(safeConfig.image || "");
  const [border, setBorder] = useState(safeStyle.border || "none");
  const [maxWidth, setMaxWidth] = useState(safeStyle.maxWidth || "100%");

  const handleSave = () => {
    onSave({
      ...safeConfig,
      title,
      content,
      image,
      ariaLabel,
      style: {
        ...safeStyle,
        backgroundColor,
        color,
        borderRadius,
        boxShadow,
        border,
        padding,
        margin,
        maxWidth,
      },
    });
  };

  useImperativeHandle(ref, () => ({
    save: handleSave
  }));

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl shadow-lg max-w-lg w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuration de la carte</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
          <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contenu</label>
          <textarea className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition" value={content} onChange={e => setContent(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image (URL)</label>
          <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={image} onChange={e => setImage(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Couleur de fond</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={backgroundColor} onChange={e => setBackgroundColor(e.target.value)} placeholder="#fff" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Couleur du texte</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={color} onChange={e => setColor(e.target.value)} placeholder="#222" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Border Radius</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={borderRadius} onChange={e => setBorderRadius(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Box Shadow</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={boxShadow} onChange={e => setBoxShadow(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Border</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={border} onChange={e => setBorder(e.target.value)} />
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

export default CardComponentConfigModal;
