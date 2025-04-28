import React, { useState } from 'react';
import { FooterConfig } from '../../types/blogBuilderTypes';

interface FooterComponentConfigModalProps {
  config: FooterConfig;
  onSave: (config: FooterConfig) => void;
  onClose: () => void;
}

const FooterComponentConfigModal: React.FC<FooterComponentConfigModalProps> = ({ config, onSave, onClose }) => {
  const [content, setContent] = useState(config.content || '');
  const [backgroundColor, setBackgroundColor] = useState(config.style?.backgroundColor || '');
  const [color, setColor] = useState(config.style?.color || '');
  const [padding, setPadding] = useState(config.style?.padding || '');
  const [margin, setMargin] = useState(config.style?.margin || '');
  const [borderRadius, setBorderRadius] = useState(config.style?.borderRadius || '');
  const [boxShadow, setBoxShadow] = useState(config.style?.boxShadow || '');
  const [border, setBorder] = useState(config.style?.border || '');

  const handleSave = () => {
    onSave({
      content,
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

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-semibold mb-2">Configuration Footer</h2>
      <div>
        <label className="block font-medium">Contenu *</label>
        <textarea className="input" value={content} onChange={e => setContent(e.target.value)} required />
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

export default FooterComponentConfigModal;
