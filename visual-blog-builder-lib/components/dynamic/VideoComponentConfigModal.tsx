import React, { useState } from 'react';
import { VideoConfig } from '../../types/blogBuilderTypes';

interface VideoComponentConfigModalProps {
  config: VideoConfig;
  onSave: (config: VideoConfig) => void;
  onClose: () => void;
}

export const VideoComponentConfigModal: React.FC<VideoComponentConfigModalProps> = ({ config, onSave, onClose }) => {
  const safeConfig = config || {};
  const safeStyle = safeConfig.style || {};

  const [src, setSrc] = useState(safeConfig.src || "");
  const [controls, setControls] = useState(safeConfig.controls ?? true);
  const [margin, setMargin] = useState(safeStyle.margin || "0px");
  const [ariaLabel, setAriaLabel] = useState(safeConfig.ariaLabel || "");

  const handleSave = () => {
    onSave({
      ...safeConfig,
      src,
      controls,
      ariaLabel,
      style: {
        ...safeStyle,
        margin,
      },
    });
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-semibold mb-2">Configuration Vidéo</h2>
      <div>
        <label className="block font-medium">URL de la vidéo *</label>
        <input type="text" className="input" value={src} onChange={e => setSrc(e.target.value)} required />
      </div>
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={controls} onChange={e => setControls(e.target.checked)} /> Contrôles
        </label>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Marge</label>
          <input type="text" className="input" value={margin} onChange={e => setMargin(e.target.value)} placeholder="ex: 1rem auto" />
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button type="button" className="btn btn-secondary" onClick={onClose}>Annuler</button>
        <button type="button" className="btn btn-primary" onClick={handleSave}>Enregistrer</button>
      </div>
    </div>
  );
};

export default VideoComponentConfigModal;
