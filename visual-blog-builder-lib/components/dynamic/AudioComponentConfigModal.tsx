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
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-semibold mb-2">Configuration Audio</h2>
      <div>
        <label className="block font-medium">URL du fichier audio *</label>
        <input type="text" className="input" value={src} onChange={e => setSrc(e.target.value)} required />
      </div>
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={controls} onChange={e => setControls(e.target.checked)} /> Contrôles
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={autoplay} onChange={e => setAutoplay(e.target.checked)} /> Autoplay
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={loop} onChange={e => setLoop(e.target.checked)} /> Boucle
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={muted} onChange={e => setMuted(e.target.checked)} /> Muet
        </label>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button type="button" className="btn btn-secondary" onClick={onClose}>Annuler</button>
        <button type="button" className="btn btn-primary" onClick={handleSave}>Enregistrer</button>
      </div>
    </div>
  );
});

export default AudioComponentConfigModal;
