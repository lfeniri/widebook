import React, { useState } from 'react';
import { DateConfig } from '../../types/blogBuilderTypes';

interface DateComponentConfigModalProps {
  config: DateConfig;
  onSave: (config: DateConfig) => void;
  onClose: () => void;
}

export const DateComponentConfigModal: React.FC<DateComponentConfigModalProps> = ({ config, onSave, onClose }) => {
  const safeConfig = config || {};
  const safeStyle = safeConfig.style || {};

  const [value, setValue] = useState(safeConfig.value || "");
  const [margin, setMargin] = useState(safeStyle.margin || "0.5rem");
  const [ariaLabel, setAriaLabel] = useState(safeConfig.ariaLabel || "");

  const handleSave = () => {
    onSave({
      ...safeConfig,
      value,
      ariaLabel,
      style: {
        ...safeStyle,
        margin,
      },
    });
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-semibold mb-2">Configuration Date</h2>
      <div>
        <label className="block font-medium">Label *</label>
        <input type="text" className="input" value={ariaLabel} onChange={e => setAriaLabel(e.target.value)} required />
      </div>
      <div>
        <label className="block font-medium">Valeur par défaut</label>
        <input type="date" className="input" value={value} onChange={e => setValue(e.target.value)} />
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

export default DateComponentConfigModal;
