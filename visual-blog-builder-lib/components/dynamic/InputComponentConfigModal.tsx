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
    <div className="space-y-6 p-6 bg-white rounded-xl shadow-lg max-w-lg w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuration du champ</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Label *</label>
          <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition" value={label} onChange={e => setLabel(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Placeholder</label>
          <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={placeholder} onChange={e => setPlaceholder(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={type} onChange={e => setType(e.target.value)} />
          </div>
          <div className="flex items-center gap-2 mt-6">
            <input type="checkbox" checked={required} onChange={e => setRequired(e.target.checked)} id="required" />
            <label htmlFor="required" className="text-sm font-medium text-gray-700">Requis</label>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Padding</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={padding} onChange={e => setPadding(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Margin</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={margin} onChange={e => setMargin(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Border</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={border} onChange={e => setBorder(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Box Shadow</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={boxShadow} onChange={e => setBoxShadow(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-6">
        <button type="button" className="px-5 py-2 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition" onClick={onClose}>Annuler</button>
        <button type="button" className="px-5 py-2 rounded-lg font-semibold bg-primary text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition" onClick={handleSave}>Enregistrer</button>
      </div>
    </div>
  );
});

export default InputComponentConfigModal;
