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
    <div className="space-y-6 p-6 bg-white rounded-xl shadow-lg max-w-lg w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuration Date</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Label *</label>
          <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition" value={ariaLabel} onChange={e => setAriaLabel(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Valeur par défaut</label>
          <input type="date" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition" value={value} onChange={e => setValue(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Marge</label>
          <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={margin} onChange={e => setMargin(e.target.value)} placeholder="0.5rem" />
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-6">
        <button type="button" className="px-5 py-2 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition" onClick={onClose}>Annuler</button>
        <button type="button" className="px-5 py-2 rounded-lg font-semibold bg-primary text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition" onClick={handleSave}>Enregistrer</button>
      </div>
    </div>
  );
};

export default DateComponentConfigModal;
