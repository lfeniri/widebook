import React, { useState, forwardRef, useImperativeHandle } from "react";
import { SelectConfig } from '../../types/blogBuilderTypes';

interface SelectComponentConfigModalProps {
  config: SelectConfig;
  onSave: (config: SelectConfig) => void;
  onClose: () => void;
}

export const SelectComponentConfigModal = forwardRef<any, SelectComponentConfigModalProps>(({ config, onSave, onClose }, ref) => {
  const safeConfig = config || {};
  const safeStyle = safeConfig.style || {};

  const [label, setLabel] = useState(safeConfig.label || "");
  const [options, setOptions] = useState(safeConfig.options || ["Option 1", "Option 2"]);
  const [selected, setSelected] = useState(safeConfig.selected || "");
  const [margin, setMargin] = useState(safeStyle.margin || "");
  const [ariaLabel, setAriaLabel] = useState(safeConfig.ariaLabel || "");

  const handleOptionChange = (idx: number, value: string) => {
    setOptions(prev => prev.map((opt, i) => i === idx ? value : opt));
  };
  const handleRemoveOption = (idx: number) => {
    setOptions(prev => prev.filter((_, i) => i !== idx));
  };
  const handleAddOption = () => {
    setOptions(prev => [...prev, `Option ${prev.length + 1}`]);
  };

  const handleSave = () => {
    onSave({
      ...safeConfig,
      label,
      options,
      selected,
      ariaLabel,
      style: {
        ...safeStyle,
        margin,
      },
    });
  };

  useImperativeHandle(ref, () => ({
    save: handleSave
  }));

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl shadow-lg max-w-lg w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuration Select</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Label *</label>
          <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition" value={label} onChange={e => setLabel(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Options *</label>
          {options.map((opt, idx) => (
            <div key={idx} className="flex gap-2 items-center mb-1">
              <input
                type="text"
                className="input flex-1 w-full rounded-md border border-gray-300 px-3 py-2"
                value={opt}
                onChange={e => handleOptionChange(idx, e.target.value)}
                required
              />
              <button type="button" className="text-red-500 font-bold px-2" onClick={() => handleRemoveOption(idx)}>&times;</button>
            </div>
          ))}
          <button type="button" className="px-3 py-1 rounded bg-primary text-white font-semibold hover:bg-primary/90 transition" onClick={handleAddOption}>Ajouter une option</button>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Valeur sélectionnée</label>
          <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={selected} onChange={e => setSelected(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Aria-label (accessibilité)</label>
          <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={ariaLabel} onChange={e => setAriaLabel(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Marge</label>
          <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={margin} onChange={e => setMargin(e.target.value)} />
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-6">
        <button type="button" className="px-5 py-2 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition" onClick={onClose}>Annuler</button>
        <button type="button" className="px-5 py-2 rounded-lg font-semibold bg-primary text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition" onClick={handleSave}>Enregistrer</button>
      </div>
    </div>
  );
});
