import React from "react";
import { Modal } from "./Modal";
import { componentRegistry } from "./componentRegistry";
import { BlogGrid, BlogComponentInstance } from "../types/blogBuilderTypes";

interface ConfigComponentModalProps {
  open: boolean;
  onClose: () => void;
  compId: string | null;
  grid: BlogGrid;
  onSave: (compId: string, config: any) => void;
}

export const ConfigComponentModal: React.FC<ConfigComponentModalProps> = ({ open, onClose, compId, grid, onSave }) => {
  if (!compId) return null;
  // Recherche du composant dans la grille
  let comp: BlogComponentInstance | undefined;
  grid.rows.forEach(row => {
    row.columns.forEach(col => {
      const found = col.components.find(c => c.id === compId);
      if (found) comp = found;
    });
  });
  if (!comp) return null;
  const ConfigModal = componentRegistry[comp.type]?.ConfigModal;
  return (
    <Modal open={open} onClose={onClose}>
      <div className="relative w-full max-w-screen-md max-h-[90vh] bg-white rounded-xl shadow-2xl border border-gray-100 p-6 flex flex-col overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">Configurer le composant</h3>
        {/* Formulaire de configuration du composant dynamique */}
        <div className="flex-1 overflow-y-auto">
          {compId && grid ? (
            <ConfigModal
              config={comp.config}
              onSave={(config: any) => onSave(compId, config)}
              onClose={onClose}
            />
          ) : (
            <div className="text-gray-400 text-center py-8">Aucun composant sélectionné.</div>
          )}
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold shadow-sm transition-colors"
            onClick={onClose}
          >
            Annuler
          </button>
        </div>
      </div>
    </Modal>
  );
};
