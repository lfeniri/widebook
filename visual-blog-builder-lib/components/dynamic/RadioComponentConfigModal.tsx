import React, { useState } from 'react';
import { RadioConfig } from '../../types/blogBuilderTypes';

interface RadioComponentConfigModalProps {
  config: RadioConfig;
  onSave: (config: RadioConfig) => void;
  onClose: () => void;
}

const RadioComponentConfigModal: React.FC<RadioComponentConfigModalProps> = ({ config, onSave, onClose }) => {
  const [label, setLabel] = useState(config.label || '');
  const [options, setOptions] = useState(config.options || []);
  const [selected, setSelected] = useState(config.selected || '');
  const [margin, setMargin] = useState(config.style?.margin || '');

  const handleOptionChange = (idx: number, value: string) => {
    const newOptions = [...options];
    newOptions[idx] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => setOptions([...options, '']);
  const handleRemoveOption = (idx: number) => setOptions(options.filter((_, i) => i !== idx));

  const handleSave = () => {
    onSave({
      label,
      options,
      selected,
      style: { margin },
    });
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-semibold mb-2">Configuration Radio</h2>
      <div>
        <label className="block font-medium">Label *</label>
        <input type="text" className="input" value={label} onChange={e => setLabel(e.target.value)} required />
      </div>
      <div>
        <label className="block font-medium">Options *</label>
        {options.map((opt, idx) => (
          <div key={idx} className="flex gap-2 items-center mb-1">
            <input
              type="text"
              className="input flex-1"
              value={opt}
              onChange={e => handleOptionChange(idx, e.target.value)}
              required
            />
            <button type="button" className="btn btn-xs btn-danger" onClick={() => handleRemoveOption(idx)}>-</button>
          </div>
        ))}
        <button type="button" className="btn btn-xs btn-primary mt-1" onClick={handleAddOption}>Ajouter une option</button>
      </div>
      <div>
        <label className="block font-medium">Option sélectionnée</label>
        <select className="input" value={selected} onChange={e => setSelected(e.target.value)}>
          <option value="">Aucune</option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-medium">Marge</label>
        <input type="text" className="input" value={margin} onChange={e => setMargin(e.target.value)} placeholder="0.5rem" />
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button type="button" className="btn btn-secondary" onClick={onClose}>Annuler</button>
        <button type="button" className="btn btn-primary" onClick={handleSave}>Enregistrer</button>
      </div>
    </div>
  );
};

export default RadioComponentConfigModal;
