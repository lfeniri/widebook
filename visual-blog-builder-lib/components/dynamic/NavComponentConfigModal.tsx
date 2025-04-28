import React, { useState } from 'react';
import { NavConfig } from '../../types/blogBuilderTypes';

interface NavComponentConfigModalProps {
  config: NavConfig;
  onSave: (config: NavConfig) => void;
  onClose: () => void;
}

export const NavComponentConfigModal: React.FC<NavComponentConfigModalProps> = ({ config, onSave, onClose }) => {
  const safeConfig = config || {};
  const safeStyle = safeConfig.style || {};

  const [links, setLinks] = useState(safeConfig.links || []);
  const [backgroundColor, setBackgroundColor] = useState(safeStyle.backgroundColor || "#fff");
  const [color, setColor] = useState(safeStyle.color || "#222");
  const [ariaLabel, setAriaLabel] = useState(safeConfig.ariaLabel || "");
  const [padding, setPadding] = useState(safeStyle.padding || "1rem");
  const [margin, setMargin] = useState(safeStyle.margin || "0px");
  const [borderRadius, setBorderRadius] = useState(safeStyle.borderRadius || "0.5rem");
  const [boxShadow, setBoxShadow] = useState(safeStyle.boxShadow || "none");
  const [border, setBorder] = useState(safeStyle.border || "none");

  const handleLinkChange = (idx: number, key: 'label' | 'href', value: string) => {
    setLinks(prev => prev.map((link, i) => i === idx ? { ...link, [key]: value } : link));
  };
  const handleRemoveLink = (idx: number) => {
    setLinks(prev => prev.filter((_, i) => i !== idx));
  };
  const handleAddLink = () => {
    setLinks(prev => [...prev, { label: '', href: '' }]);
  };

  const handleSave = () => {
    onSave({
      ...safeConfig,
      links,
      ariaLabel,
      style: {
        ...safeStyle,
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

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl shadow-lg max-w-lg w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuration Navigation</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Aria-label (accessibilité)</label>
          <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={ariaLabel} onChange={e => setAriaLabel(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Liens</label>
          {links.map((link, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Label" value={link.label} onChange={e => handleLinkChange(idx, 'label', e.target.value)} />
              <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="URL" value={link.href} onChange={e => handleLinkChange(idx, 'href', e.target.value)} />
              <button type="button" className="text-red-500 font-bold px-2" onClick={() => handleRemoveLink(idx)}>&times;</button>
            </div>
          ))}
          <button type="button" className="px-3 py-1 rounded bg-primary text-white font-semibold hover:bg-primary/90 transition" onClick={handleAddLink}>Ajouter un lien</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Couleur de fond</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={backgroundColor} onChange={e => setBackgroundColor(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Couleur du texte</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={color} onChange={e => setColor(e.target.value)} />
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Border</label>
          <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={border} onChange={e => setBorder(e.target.value)} />
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-6">
        <button type="button" className="px-5 py-2 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition" onClick={onClose}>Annuler</button>
        <button type="button" className="px-5 py-2 rounded-lg font-semibold bg-primary text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition" onClick={handleSave}>Enregistrer</button>
      </div>
    </div>
  );
};

export default NavComponentConfigModal;
