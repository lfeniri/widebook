import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { InputConfig } from '../../types/blogBuilderTypes';

interface InputComponentConfigModalProps {
  config: InputConfig;
  onSave: (config: InputConfig) => void;
  onClose: () => void;
}

const InputComponentConfigModal = forwardRef<any, InputComponentConfigModalProps>(({ config, onSave, onClose }, ref) => {
  const safeConfig = config || {};
  const safeStyle = safeConfig.style || {};

  const [label, setLabel] = useState(safeConfig.label || '');
  const [placeholder, setPlaceholder] = useState(safeConfig.placeholder || '');
  const [type, setType] = useState(safeConfig.type || 'text');
  const [required, setRequired] = useState(safeConfig.required ?? false);
  const [padding, setPadding] = useState(safeStyle.padding || '');
  const [margin, setMargin] = useState(safeStyle.margin || '');
  const [border, setBorder] = useState(safeStyle.border || '');
  const [boxShadow, setBoxShadow] = useState(safeStyle.boxShadow || '');

  useEffect(() => {
    setLabel(safeConfig.label || '');
    setPlaceholder(safeConfig.placeholder || '');
    setType(safeConfig.type || 'text');
    setRequired(safeConfig.required ?? false);
    setPadding(safeStyle.padding || '');
    setMargin(safeStyle.margin || '');
    setBorder(safeStyle.border || '');
    setBoxShadow(safeStyle.boxShadow || '');
  }, [config]);

  const handleSave = () => {
    onSave({
      label,
      placeholder,
      type,
      required,
      style: {
        padding,
        margin,
        border,
        boxShadow,
      },
    });
  };

  useImperativeHandle(ref, () => ({
    save: handleSave
  }));

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-semibold mb-2">Configuration Champ de saisie</h2>
      <div>
        <label className="block font-medium">Label *</label>
        <input type="text" className="input" value={label} onChange={e => setLabel(e.target.value)} required />
      </div>
      <div>
        <label className="block font-medium">Placeholder</label>
        <input type="text" className="input" value={placeholder} onChange={e => setPlaceholder(e.target.value)} />
      </div>
      <div className="flex gap-4">
        <div>
          <label className="block font-medium">Type</label>
          <select className="input" value={type} onChange={e => setType(e.target.value)}>
            <option value="text">Texte</option>
            <option value="email">Email</option>
            <option value="password">Mot de passe</option>
            <option value="number">Nombre</option>
            <option value="date">Date</option>
            <option value="url">URL</option>
          </select>
        </div>
        <label className="flex items-center gap-2 mt-6">
          <input type="checkbox" checked={required} onChange={e => setRequired(e.target.checked)} /> Requis
        </label>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Padding</label>
          <input type="text" className="input" value={padding} onChange={e => setPadding(e.target.value)} placeholder="0.5rem 1rem" />
        </div>
        <div>
          <label className="block font-medium">Marge</label>
          <input type="text" className="input" value={margin} onChange={e => setMargin(e.target.value)} placeholder="0.5rem" />
        </div>
        <div>
          <label className="block font-medium">Bordure</label>
          <input type="text" className="input" value={border} onChange={e => setBorder(e.target.value)} placeholder="1px solid #eee" />
        </div>
        <div>
          <label className="block font-medium">Ombre</label>
          <input type="text" className="input" value={boxShadow} onChange={e => setBoxShadow(e.target.value)} placeholder="0 2px 8px #0002" />
        </div>
      </div>
      {/* Les boutons sont désormais centralisés dans ConfigComponentModal */}
    </div>
  );
});

export default InputComponentConfigModal;
