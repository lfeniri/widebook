import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { AudioConfig } from '../../types/blogBuilderTypes';

interface AudioComponentConfigModalProps {
  config: AudioConfig;
  onSave: (config: AudioConfig) => void;
  onClose: () => void;
}

export const AudioComponentConfigModal = forwardRef<any, AudioComponentConfigModalProps>(({ config, onSave, onClose }, ref) => {
  const safeConfig = config || {};
  const safeStyle = safeConfig.style || {};

  const [src, setSrc] = useState(safeConfig.src || "");
  const [controls, setControls] = useState(safeConfig.controls ?? true);
  const [margin, setMargin] = useState(safeStyle.margin || "0px");
  const [ariaLabel, setAriaLabel] = useState(safeConfig.ariaLabel || "");
  const [autoplay, setAutoplay] = useState(safeConfig.autoplay ?? false);
  const [loop, setLoop] = useState(safeConfig.loop ?? false);
  const [muted, setMuted] = useState(safeConfig.muted ?? false);

  const handleSave = () => {
    onSave({
      ...safeConfig,
      src,
      controls,
      autoplay,
      loop,
      muted,
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
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuration Audio</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL du fichier audio *</label>
          <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition" value={src} onChange={e => setSrc(e.target.value)} required />
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <input type="checkbox" checked={controls} onChange={e => setControls(e.target.checked)} /> Contrôles
          </label>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <input type="checkbox" checked={autoplay} onChange={e => setAutoplay(e.target.checked)} /> Autoplay
          </label>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <input type="checkbox" checked={loop} onChange={e => setLoop(e.target.checked)} /> Loop
          </label>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <input type="checkbox" checked={muted} onChange={e => setMuted(e.target.checked)} /> Muted
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Marge</label>
          <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={margin} onChange={e => setMargin(e.target.value)} placeholder="0px" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Aria-label (accessibilité)</label>
          <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={ariaLabel} onChange={e => setAriaLabel(e.target.value)} />
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-6">
        <button type="button" className="px-5 py-2 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition" onClick={onClose}>Annuler</button>
        <button type="button" className="px-5 py-2 rounded-lg font-semibold bg-primary text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition" onClick={handleSave}>Enregistrer</button>
      </div>
    </div>
  );
});

export default AudioComponentConfigModal;
