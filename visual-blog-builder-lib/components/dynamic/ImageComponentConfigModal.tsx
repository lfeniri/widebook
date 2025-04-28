import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { ImageConfig } from '../../types/blogBuilderTypes';

interface ImageComponentConfigModalProps {
  config: ImageConfig;
  onSave: (config: ImageConfig) => void;
  onClose: () => void;
}

export const ImageComponentConfigModal = forwardRef<any, ImageComponentConfigModalProps>(({ config, onSave, onClose }, ref) => {
  const safeConfig = config || {};
  const safeStyle = safeConfig.style || {};

  const [src, setSrc] = useState(safeConfig.src || "");
  const [alt, setAlt] = useState(safeConfig.alt || "");
  const [width, setWidth] = useState(safeStyle.width || "100%");
  const [borderRadius, setBorderRadius] = useState(safeStyle.borderRadius || "0px");
  const [objectFit, setObjectFit] = useState(safeStyle.objectFit || "cover");
  const [boxShadow, setBoxShadow] = useState(safeStyle.boxShadow || "none");
  const [border, setBorder] = useState(safeStyle.border || "none");
  const [margin, setMargin] = useState(safeStyle.margin || "0px");
  const [padding, setPadding] = useState(safeStyle.padding || "0px");
  const [maxWidth, setMaxWidth] = useState(safeStyle.maxWidth || "100%");
  const [ariaLabel, setAriaLabel] = useState(safeConfig.ariaLabel || "");

  useEffect(() => {
    setSrc(safeConfig.src || "");
    setAlt(safeConfig.alt || "");
    setWidth(safeStyle.width || "100%");
    setBorderRadius(safeStyle.borderRadius || "0px");
    setObjectFit(safeStyle.objectFit || "cover");
    setBoxShadow(safeStyle.boxShadow || "none");
    setBorder(safeStyle.border || "none");
    setMargin(safeStyle.margin || "0px");
    setPadding(safeStyle.padding || "0px");
    setMaxWidth(safeStyle.maxWidth || "100%");
    setAriaLabel(safeConfig.ariaLabel || "");
  }, [config]);

  const handleSave = () => {
    onSave({
      ...safeConfig,
      src,
      alt,
      ariaLabel,
      style: {
        ...safeStyle,
        width,
        borderRadius,
        objectFit,
        boxShadow,
        border,
        margin,
        padding,
        maxWidth,
      },
    });
  };

  useImperativeHandle(ref, () => ({
    save: handleSave
  }));

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl shadow-lg max-w-lg w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuration Image</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL de l'image *</label>
          <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition" value={src} onChange={e => setSrc(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Texte alternatif (alt)</label>
          <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={alt} onChange={e => setAlt(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Largeur</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={width} onChange={e => setWidth(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Width</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={maxWidth} onChange={e => setMaxWidth(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Border Radius</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={borderRadius} onChange={e => setBorderRadius(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Object Fit</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={objectFit} onChange={e => setObjectFit(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Box Shadow</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={boxShadow} onChange={e => setBoxShadow(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Border</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" value={border} onChange={e => setBorder(e.target.value)} />
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
