"use client";

import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { FooterConfig } from '../../types/blogBuilderTypes';

interface FooterComponentConfigModalProps {
  config: FooterConfig;
  onSave: (config: FooterConfig) => void;
  onClose: () => void;
}

const FooterComponentConfigModal = forwardRef<any, FooterComponentConfigModalProps>(({ config, onSave, onClose }, ref) => {
  const [text, setText] = useState(config.text || '');
  const [backgroundColor, setBackgroundColor] = useState(config.style?.backgroundColor || '');
  const [color, setColor] = useState(config.style?.color || '');
  const [padding, setPadding] = useState(config.style?.padding || '');
  const [margin, setMargin] = useState(config.style?.margin || '');
  const [borderRadius, setBorderRadius] = useState(config.style?.borderRadius || '');
  const [boxShadow, setBoxShadow] = useState(config.style?.boxShadow || '');
  const [border, setBorder] = useState(config.style?.border || '');

  const handleSave = () => {
    onSave({
      text,
      style: {
        backgroundColor,
        color,
        padding,
        margin,
        borderRadius,
        boxShadow,
        border,
      },
    });
  };

  useImperativeHandle(ref, () => ({
    save: handleSave
  }));

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl shadow-lg max-w-lg w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuration Footer</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Texte *</label>
          <textarea className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition" value={text} onChange={e => setText(e.target.value)} required />
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
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-6">
        <button type="button" className="px-5 py-2 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition" onClick={onClose}>Annuler</button>
        <button type="button" className="px-5 py-2 rounded-lg font-semibold bg-primary text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition" onClick={handleSave}>Enregistrer</button>
      </div>
    </div>
  );
});

export default FooterComponentConfigModal;
