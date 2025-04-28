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
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-semibold mb-2">Configuration Lien</h2>
      <div>
        <label className="block font-medium">URL *</label>
        <input type="text" className="input" value={href} onChange={e => setHref(e.target.value)} required />
      </div>
      <div>
        <label className="block font-medium">Texte du lien *</label>
        <input type="text" className="input" value={label} onChange={e => setLabel(e.target.value)} required />
      </div>
      <div className="flex gap-4">
        <div>
          <label className="block font-medium">Cible</label>
          <select className="input" value={target} onChange={e => setTarget(e.target.value)}>
            <option value="">Par défaut</option>
            <option value="_blank">Nouvel onglet (_blank)</option>
            <option value="_self">Même onglet (_self)</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Rel</label>
          <input type="text" className="input" value={rel} onChange={e => setRel(e.target.value)} placeholder="noopener noreferrer" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Couleur</label>
          <input type="text" className="input" value={color} onChange={e => setColor(e.target.value)} placeholder="#0070f3" />
        </div>
        <div>
          <label className="block font-medium">Graisse</label>
          <input type="text" className="input" value={fontWeight} onChange={e => setFontWeight(e.target.value)} placeholder="bold" />
        </div>
        <div>
          <label className="block font-medium">Décoration</label>
          <input type="text" className="input" value={textDecoration} onChange={e => setTextDecoration(e.target.value)} placeholder="underline" />
        </div>
        <div>
          <label className="block font-medium">Padding</label>
          <input type="text" className="input" value={padding} onChange={e => setPadding(e.target.value)} placeholder="0.5rem 1rem" />
        </div>
        <div>
          <label className="block font-medium">Marge</label>
          <input type="text" className="input" value={margin} onChange={e => setMargin(e.target.value)} placeholder="0.5rem" />
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button type="button" className="btn btn-secondary" onClick={onClose}>Annuler</button>
        <button type="button" className="btn btn-primary" onClick={handleSave}>Enregistrer</button>
      </div>
    </div>
  );
};

export default LinkComponentConfigModal;
