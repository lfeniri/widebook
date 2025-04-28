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
    <div className="space-y-4 p-4">
      <label className="flex flex-col gap-1">
        Label
        <input className="border rounded p-2" value={label} onChange={e => setLabel(e.target.value)} />
      </label>
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-sm">Options</span>
        {options.map((opt: string, idx: number) => (
          <div key={idx} className="flex gap-2 items-center">
            <input className="border rounded p-2 flex-1" value={opt} onChange={e => handleOptionChange(idx, e.target.value)} />
            <button type="button" className="text-red-500" onClick={() => handleRemoveOption(idx)} title="Supprimer">✕</button>
          </div>
        ))}

        <button type="button" className="text-primary underline text-sm mt-1" onClick={handleAddOption}>Ajouter une option</button>
      </div>
      <label className="flex flex-col gap-1">
        Margin (px)
        <input type="text" className="border rounded p-2" value={margin} onChange={e => setMargin(e.target.value)} placeholder="ex: 8px 0" />
      </label>
      <label className="flex flex-col gap-1">
        Accessibilité (aria-label)
        <input className="border rounded p-2" value={ariaLabel} onChange={e => setAriaLabel(e.target.value)} />
      </label>
      <div className="flex justify-end gap-2 mt-4">
        <button type="button" className="btn btn-secondary" onClick={onClose}>Annuler</button>
        <button type="button" className="btn btn-primary" onClick={handleSave}>Enregistrer</button>
      </div>
    </div>
  );
});
