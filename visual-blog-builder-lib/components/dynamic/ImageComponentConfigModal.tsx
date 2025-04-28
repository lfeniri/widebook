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
    <div className="space-y-4 p-4">
      <label className="flex flex-col gap-1">
        URL de l'image
        <input className="border rounded p-2" value={src} onChange={e => setSrc(e.target.value)} />
      </label>
      <label className="flex flex-col gap-1">
        Texte alternatif (alt)
        <input className="border rounded p-2" value={alt} onChange={e => setAlt(e.target.value)} />
      </label>
      <label className="flex flex-col gap-1">
        Largeur (%)
        <input type="number" min="10" max="100" value={parseInt(width)} onChange={e => setWidth(e.target.value + "%")}/>
      </label>
      <label className="flex flex-col gap-1">
        Bords arrondis (px)
        <input type="number" min="0" max="100" value={parseInt(borderRadius)} onChange={e => setBorderRadius(e.target.value + "px")}/>
      </label>
      <label className="flex flex-col gap-1">
        Ajustement (object-fit)
        <select className="border rounded p-2" value={objectFit} onChange={e => setObjectFit(e.target.value)}>
          <option value="cover">cover</option>
          <option value="contain">contain</option>
          <option value="fill">fill</option>
          <option value="none">none</option>
          <option value="scale-down">scale-down</option>
        </select>
      </label>
      <label className="flex flex-col gap-1">
        Ombre
        <input type="text" className="border rounded p-2" value={boxShadow} onChange={e => setBoxShadow(e.target.value)} placeholder="ex: 0 2px 8px #0002" />
      </label>
      <label className="flex flex-col gap-1">
        Bordure
        <input type="text" className="border rounded p-2" value={border} onChange={e => setBorder(e.target.value)} placeholder="ex: 1px solid #eee" />
      </label>
      <label className="flex flex-col gap-1">
        Margin (px)
        <input type="text" className="border rounded p-2" value={margin} onChange={e => setMargin(e.target.value)} placeholder="ex: 8px 0" />
      </label>
      <label className="flex flex-col gap-1">
        Padding (px)
        <input type="text" className="border rounded p-2" value={padding} onChange={e => setPadding(e.target.value)} placeholder="ex: 8px 16px" />
      </label>
      <label className="flex flex-col gap-1">
        Largeur max (responsive)
        <input type="text" className="border rounded p-2" value={maxWidth} onChange={e => setMaxWidth(e.target.value)} placeholder="ex: 100% ou 600px" />
      </label>
      <label className="flex flex-col gap-1">
        Accessibilité (aria-label)
        <input className="border rounded p-2" value={ariaLabel} onChange={e => setAriaLabel(e.target.value)} />
      </label>
      {/* Les boutons sont désormais centralisés dans ConfigComponentModal */}
    </div>
  );
});
