"use client";

import React, { useState } from 'react';
import { LinkConfig } from '../../types/blogBuilderTypes';

interface LinkComponentConfigModalProps {
  config: LinkConfig;
  onSave: (config: LinkConfig) => void;
  onClose: () => void;
}

const LinkComponentConfigModal: React.FC<LinkComponentConfigModalProps> = ({ config, onSave, onClose }) => {
  const [href, setHref] = useState(config.href || '');
  const [label, setLabel] = useState(config.label || '');
  const [target, setTarget] = useState(config.target || '');
  const [rel, setRel] = useState(config.rel || '');
  const [color, setColor] = useState(config.style?.color || '');
  const [fontWeight, setFontWeight] = useState(config.style?.fontWeight || '');
  const [textDecoration, setTextDecoration] = useState(config.style?.textDecoration || '');
  const [padding, setPadding] = useState(config.style?.padding || '');
  const [margin, setMargin] = useState(config.style?.margin || '');

  const handleSave = () => {
    onSave({
      href,
      label,
      target,
      rel,
      style: {
        color,
        fontWeight,
        textDecoration,
        padding,
        margin,
      },
    });
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl shadow-lg max-w-lg w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuration Lien</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL *</label>
          <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition" value={href} onChange={e => setHref(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Texte du lien *</label>
          <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition" value={label} onChange={e => setLabel(e.target.value)} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cible</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={target} onChange={e => setTarget(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rel</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={rel} onChange={e => setRel(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Couleur du texte</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={color} onChange={e => setColor(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Font Weight</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={fontWeight} onChange={e => setFontWeight(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Text Decoration</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={textDecoration} onChange={e => setTextDecoration(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Padding</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={padding} onChange={e => setPadding(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Margin</label>
          <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={margin} onChange={e => setMargin(e.target.value)} />
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-6">
        <button type="button" className="px-5 py-2 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition" onClick={onClose}>Annuler</button>
        <button type="button" className="px-5 py-2 rounded-lg font-semibold bg-primary text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition" onClick={handleSave}>Enregistrer</button>
      </div>
    </div>
  );
};

export default LinkComponentConfigModal;
