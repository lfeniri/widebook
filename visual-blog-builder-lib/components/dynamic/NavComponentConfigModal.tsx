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
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-semibold mb-2">Configuration Navigation</h2>
      <div>
        <label className="block font-medium">Liens *</label>
        {links.map((link, idx) => (
          <div key={idx} className="flex gap-2 items-center mb-1">
            <input
              type="text"
              className="input flex-1"
              value={link.label}
              onChange={e => handleLinkChange(idx, 'label', e.target.value)}
              placeholder="Label"
              required
            />
            <input
              type="text"
              className="input flex-1"
              value={link.href}
              onChange={e => handleLinkChange(idx, 'href', e.target.value)}
              placeholder="URL"
              required
            />
            <button type="button" className="btn btn-xs btn-danger" onClick={() => handleRemoveLink(idx)}>-</button>
          </div>
        ))}
        <button type="button" className="btn btn-xs btn-primary mt-1" onClick={handleAddLink}>Ajouter un lien</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Couleur de fond</label>
          <input type="text" className="input" value={backgroundColor} onChange={e => setBackgroundColor(e.target.value)} placeholder="#fff" />
        </div>
        <div>
          <label className="block font-medium">Couleur du texte</label>
          <input type="text" className="input" value={color} onChange={e => setColor(e.target.value)} placeholder="#222" />
        </div>
        <div>
          <label className="block font-medium">Padding</label>
          <input type="text" className="input" value={padding} onChange={e => setPadding(e.target.value)} placeholder="1rem" />
        </div>
        <div>
          <label className="block font-medium">Marge</label>
          <input type="text" className="input" value={margin} onChange={e => setMargin(e.target.value)} placeholder="1rem auto" />
        </div>
        <div>
          <label className="block font-medium">Rayon de bordure</label>
          <input type="text" className="input" value={borderRadius} onChange={e => setBorderRadius(e.target.value)} placeholder="8px" />
        </div>
        <div>
          <label className="block font-medium">Ombre</label>
          <input type="text" className="input" value={boxShadow} onChange={e => setBoxShadow(e.target.value)} placeholder="0 2px 8px #0002" />
        </div>
        <div>
          <label className="block font-medium">Bordure</label>
          <input type="text" className="input" value={border} onChange={e => setBorder(e.target.value)} placeholder="1px solid #eee" />
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button type="button" className="btn btn-secondary" onClick={onClose}>Annuler</button>
        <button type="button" className="btn btn-primary" onClick={handleSave}>Enregistrer</button>
      </div>
    </div>
  );
};

export default NavComponentConfigModal;
