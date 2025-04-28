import React, { useState, forwardRef, useImperativeHandle } from "react";
import { BadgeConfig } from '../../types/blogBuilderTypes';

interface BadgeComponentConfigModalProps {
  config: BadgeConfig;
  onSave: (config: BadgeConfig) => void;
  onClose: () => void;
}

export const BadgeComponentConfigModal = forwardRef<any, BadgeComponentConfigModalProps>(({ config, onSave, onClose }, ref) => {
  const safeConfig = config || {};
  const safeStyle = safeConfig.style || {};

  const [text, setText] = useState(safeConfig.text || "");
  const [color, setColor] = useState(safeStyle.backgroundColor || "#f59e42");
  const [textColor, setTextColor] = useState(safeStyle.color || "#fff");
  const [fontSize, setFontSize] = useState(safeStyle.fontSize || "1rem");
  const [fontWeight, setFontWeight] = useState(safeStyle.fontWeight || "bold");
  const [fontFamily, setFontFamily] = useState(safeStyle.fontFamily || "inherit");
  const [textAlign, setTextAlign] = useState(safeStyle.textAlign || "center");
  const [padding, setPadding] = useState(safeStyle.padding || "0px");
  const [margin, setMargin] = useState(safeStyle.margin || "0px");
  const [shadow, setShadow] = useState(safeStyle.boxShadow || "none");
  const [border, setBorder] = useState(safeStyle.border || "none");
  const [maxWidth, setMaxWidth] = useState(safeStyle.maxWidth || "100%");
  const [ariaLabel, setAriaLabel] = useState(safeConfig.ariaLabel || "");

  const handleSave = () => {
    onSave({
      ...safeConfig,
      text,
      ariaLabel,
      style: {
        ...safeStyle,
        backgroundColor: color,
        color: textColor,
        fontSize,
        fontWeight,
        fontFamily,
        textAlign,
        padding,
        margin,
        boxShadow: shadow,
        border,
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
        Texte du badge
        <input className="border rounded p-2" value={text} onChange={e => setText(e.target.value)} />
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
        Alignement
        <select className="border rounded p-2" value={textAlign} onChange={e => setTextAlign(e.target.value)}>
          <option value="left">Gauche</option>
          <option value="center">Centre</option>
          <option value="right">Droite</option>
        </select>
      </label>
      <label className="flex flex-col gap-1">
        Padding (px)
        <input type="text" className="border rounded p-2" value={padding} onChange={e => setPadding(e.target.value)} placeholder="ex: 8px 16px" />
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
        Largeur max (responsive)
        <input type="text" className="border rounded p-2" value={maxWidth} onChange={e => setMaxWidth(e.target.value)} placeholder="ex: 100% ou 600px" />
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
