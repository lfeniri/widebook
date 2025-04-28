import React, { useState } from 'react';
import { CardConfig } from '../../types/blogBuilderTypes';

interface CardComponentConfigModalProps {
  config: CardConfig;
  onSave: (config: CardConfig) => void;
  onClose: () => void;
}

export const CardComponentConfigModal: React.FC<CardComponentConfigModalProps> = ({ config, onSave, onClose }) => {
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

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-semibold mb-2">Configuration Carte</h2>
      <div>
        <label className="block font-medium">Titre *</label>
        <input type="text" className="input" value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div>
        <label className="block font-medium">Contenu *</label>
        <textarea className="input" value={content} onChange={e => setContent(e.target.value)} required />
      </div>
      <div>
        <label className="block font-medium">Image (URL)</label>
        <input type="text" className="input" value={image} onChange={e => setImage(e.target.value)} />
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
          <label className="block font-medium">Ombre</label>
          <input type="text" className="input" value={boxShadow} onChange={e => setBoxShadow(e.target.value)} placeholder="0 2px 8px #0002" />
        </div>
        <div>
          <label className="block font-medium">Bordure</label>
          <input type="text" className="input" value={border} onChange={e => setBorder(e.target.value)} placeholder="1px solid #eee" />
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

export default CardComponentConfigModal;
