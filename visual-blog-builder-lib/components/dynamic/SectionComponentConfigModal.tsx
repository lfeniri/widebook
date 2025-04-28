import React, { useState } from 'react';
import { SectionConfig } from '../../types/blogBuilderTypes';

interface SectionComponentConfigModalProps {
  config: SectionConfig;
  onSave: (config: SectionConfig) => void;
  onClose: () => void;
}

export const SectionComponentConfigModal: React.FC<SectionComponentConfigModalProps> = ({ config, onSave, onClose }) => {
  const safeConfig = config || {};
  const safeStyle = safeConfig.style || {};

  const [backgroundColor, setBackgroundColor] = useState(safeStyle.backgroundColor || "#fff");
  const [padding, setPadding] = useState(safeStyle.padding || "2rem");
  const [margin, setMargin] = useState(safeStyle.margin || "0px");
  const [ariaLabel, setAriaLabel] = useState(safeConfig.ariaLabel || "");
  const [title, setTitle] = useState(safeConfig.title || "");
  const [borderRadius, setBorderRadius] = useState(safeStyle.borderRadius || "0.5rem");
  const [boxShadow, setBoxShadow] = useState(safeStyle.boxShadow || "none");
  const [border, setBorder] = useState(safeStyle.border || "none");
  const [maxWidth, setMaxWidth] = useState(safeStyle.maxWidth || "100%");

  const handleSave = () => {
    onSave({
      ...safeConfig,
      title,
      ariaLabel,
      style: {
        ...safeStyle,
        backgroundColor,
        padding,
        margin,
        borderRadius,
        boxShadow,
        border,
        maxWidth,
      },
    });
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-semibold mb-2">Configuration Section</h2>
      <div>
        <label className="block font-medium">Titre</label>
        <input type="text" className="input" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Couleur de fond</label>
          <input type="text" className="input" value={backgroundColor} onChange={e => setBackgroundColor(e.target.value)} placeholder="#fff" />
        </div>
        <div>
          <label className="block font-medium">Padding</label>
          <input type="text" className="input" value={padding} onChange={e => setPadding(e.target.value)} placeholder="2rem" />
        </div>
        <div>
          <label className="block font-medium">Marge</label>
          <input type="text" className="input" value={margin} onChange={e => setMargin(e.target.value)} placeholder="2rem auto" />
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
        <div>
          <label className="block font-medium">Max width</label>
          <input type="text" className="input" value={maxWidth} onChange={e => setMaxWidth(e.target.value)} placeholder="" />
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button type="button" className="btn btn-secondary" onClick={onClose}>Annuler</button>
        <button type="button" className="btn btn-primary" onClick={handleSave}>Enregistrer</button>
      </div>
    </div>
  );
};

export default SectionComponentConfigModal;
