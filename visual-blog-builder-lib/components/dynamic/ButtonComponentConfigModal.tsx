import React, { useState, useEffect } from "react";
import { ButtonConfig } from '../../types/blogBuilderTypes';

interface ButtonComponentConfigModalProps {
  config: ButtonConfig;
  onSave: (config: ButtonConfig) => void;
  onClose: () => void;
}

export const ButtonComponentConfigModal: React.FC<ButtonComponentConfigModalProps> = ({ config, onSave, onClose }) => {
  const safeConfig = config || {};
  const safeStyle = safeConfig.style || {};

  const [label, setLabel] = useState(safeConfig.label || "");
  const [color, setColor] = useState(safeStyle.backgroundColor || "#2563eb");
  const [textColor, setTextColor] = useState(safeStyle.color || "#fff");
  const [url, setUrl] = useState(safeConfig.url || "");
  const [fontWeight, setFontWeight] = useState(safeStyle.fontWeight || "bold");
  const [fontFamily, setFontFamily] = useState(safeStyle.fontFamily || "inherit");
  const [padding, setPadding] = useState(safeStyle.padding || "8px 24px");
  const [margin, setMargin] = useState(safeStyle.margin || "0px");
  const [shadow, setShadow] = useState(safeStyle.boxShadow || "none");
  const [border, setBorder] = useState(safeStyle.border || "none");
  const [ariaLabel, setAriaLabel] = useState(safeConfig.ariaLabel || "");

  useEffect(() => {
    setLabel(safeConfig.label || "");
    setColor(safeStyle.backgroundColor || "#2563eb");
    setTextColor(safeStyle.color || "#fff");
    setUrl(safeConfig.url || "");
    setFontWeight(safeStyle.fontWeight || "bold");
    setFontFamily(safeStyle.fontFamily || "inherit");
    setPadding(safeStyle.padding || "8px 24px");
    setMargin(safeStyle.margin || "0px");
    setShadow(safeStyle.boxShadow || "none");
    setBorder(safeStyle.border || "none");
    setAriaLabel(safeConfig.ariaLabel || "");
  }, [config]);

  const handleSave = () => {
    onSave({
      ...safeConfig,
      label,
      url,
      ariaLabel,
      style: {
        ...safeStyle,
        backgroundColor: color,
        color: textColor,
        fontWeight,
        fontFamily,
        padding,
        margin,
        boxShadow: shadow,
        border,
      },
    });
  };

  return (
    <div className="space-y-4 p-4">
      <label className="flex flex-col gap-1">
        Texte du bouton
        <input className="border rounded p-2" value={label} onChange={e => setLabel(e.target.value)} />
      </label>
      <label className="flex flex-col gap-1">
        Lien (URL)
        <input className="border rounded p-2" value={url} onChange={e => setUrl(e.target.value)} />
      </label>
      <label className="flex flex-col gap-1">
        Couleur de fond
        <input type="color" value={color} onChange={e => setColor(e.target.value)} />
      </label>
      <label className="flex flex-col gap-1">
        Couleur du texte
        <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} />
      </label>
      <label className="flex flex-col gap-1">
        Graisse
        <select className="border rounded p-2" value={fontWeight} onChange={e => setFontWeight(e.target.value)}>
          <option value="normal">Normal</option>
          <option value="bold">Gras</option>
          <option value="lighter">Fin</option>
        </select>
      </label>
      <label className="flex flex-col gap-1">
        Police
        <select className="border rounded p-2" value={fontFamily} onChange={e => setFontFamily(e.target.value)}>
          <option value="inherit">Défaut</option>
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
        </select>
      </label>
      <label className="flex flex-col gap-1">
        Padding (px)
        <input type="text" className="border rounded p-2" value={padding} onChange={e => setPadding(e.target.value)} placeholder="ex: 8px 24px" />
      </label>
      <label className="flex flex-col gap-1">
        Margin (px)
        <input type="text" className="border rounded p-2" value={margin} onChange={e => setMargin(e.target.value)} placeholder="ex: 8px 0" />
      </label>
      <label className="flex flex-col gap-1">
        Ombre
        <input type="text" className="border rounded p-2" value={shadow} onChange={e => setShadow(e.target.value)} placeholder="ex: 0 2px 8px #0002" />
      </label>
      <label className="flex flex-col gap-1">
        Bordure
        <input type="text" className="border rounded p-2" value={border} onChange={e => setBorder(e.target.value)} placeholder="ex: 1px solid #eee" />
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
};
