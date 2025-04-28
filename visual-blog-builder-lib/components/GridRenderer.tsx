import React from "react";
import { BlogGrid } from "../types/blogBuilderTypes";
import { componentRegistry } from "./componentRegistry";
import { AnimatePresence, motion } from "framer-motion";
import { useDroppable } from '@dnd-kit/core';
import { useBlogBuilderStore } from "../store/blogBuilderStore";

export const GridRenderer: React.FC<{
  grid: BlogGrid;
  onAddComponent?: (colId: string) => void;
  onEditComponent?: (compId: string) => void;
  onRemoveComponent?: (compId: string) => void;
  useComponentDnD?: (id: string) => any;
  onResizeStart?: (e: React.MouseEvent, colId: string) => void;
  onAddRow?: () => void;
  onRemoveRow?: (rowId: string) => void;
  onAddColumn?: (rowId: string) => void;
  onRemoveColumn?: (rowId: string, colId: string) => void;
  onCompMouseEnter?: (compId: string, e: React.MouseEvent) => void;
  onCompMouseLeave?: () => void;
  hoveredCompId?: string | null;
}> = ({ grid, onAddComponent, onEditComponent, onRemoveComponent, useComponentDnD, onResizeStart, onAddRow, onRemoveRow, onAddColumn, onRemoveColumn, onCompMouseEnter, onCompMouseLeave, hoveredCompId }) => {
  // Hook pour feedback visuel drag & drop sur colonne
  const getDroppableState = (colId: string) => {
    try {
      // dnd-kit: useDroppable attend un objet { id }
      // On retourne l'état isOver pour la colonne
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { isOver } = useDroppable ? useDroppable({ id: colId }) : { isOver: false };
      return { isOver };
    } catch {
      return { isOver: false };
    }
  };

  // Sécurisation du rendu pour éviter les erreurs si grid ou grid.rows est undefined
  const safeRows = Array.isArray(grid?.rows) ? grid.rows : [];

  return (
    <div className="flex flex-col gap-4">
      {safeRows.length === 0 && (
        <div className="text-gray-400 text-center py-8">Aucune ligne dans la grille. Ajoutez une ligne pour commencer.</div>
      )}
      {safeRows.map((row) => (
        <div key={row.id} className="flex gap-4 items-start relative group border border-gray-200 rounded-lg bg-white shadow-sm transition-shadow hover:shadow-lg">
          {/* Actions section (ligne) en haut à droite */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-20 opacity-0 group-hover:opacity-100 transition pointer-events-auto bg-white/90 rounded-lg shadow p-1 border border-gray-100">
            {/* Ajouter colonne */}
            <button
              className="hover:bg-green-100 text-green-600 rounded-full p-2 flex items-center justify-center transition"
              title="Ajouter une colonne"
              type="button"
              onClick={() => onAddColumn && onAddColumn(row.id)}
            >
              {/* Plus icon */}
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M12 5v14m7-7H5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {/* Supprimer section */}
            <button
              className="hover:bg-red-100 text-red-600 rounded-full p-2 flex items-center justify-center transition"
              title="Supprimer la section"
              type="button"
              onClick={() => onRemoveRow && onRemoveRow(row.id)}
            >
              {/* Trash icon */}
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M3 6h18M9 6v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6m-6 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          {row.columns.map((col) => (
            <div
              key={col.id}
              className="flex-1 min-h-[80px] bg-gray-50 rounded border p-2 relative group transition-shadow hover:shadow-md"
              style={col.width ? { width: col.width, minWidth: 80, maxWidth: 800 } : {}}
            >
              {/* Actions colonne en haut à droite */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 z-30 opacity-0 group-hover:opacity-100 transition pointer-events-auto bg-white/90 rounded-lg shadow p-1 border border-gray-100">
                <button
                  className="hover:bg-red-100 text-red-600 rounded-full p-2 flex items-center justify-center transition"
                  title="Supprimer la colonne"
                  type="button"
                  onClick={() => onRemoveColumn && onRemoveColumn(row.id, col.id)}
                >
                  {/* Trash icon */}
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M3 6h18M9 6v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6m-6 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button
                  className="hover:bg-blue-100 text-blue-600 rounded-full p-2 flex items-center justify-center transition"
                  title="Ajouter un composant"
                  type="button"
                  onClick={() => onAddComponent && onAddComponent(col.id)}
                >
                  {/* Plus icon */}
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M12 5v14m7-7H5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
              {/* Rendu des composants dynamiques */}
              <div className="flex flex-col gap-2">
                {col.components.map((comp) => {
                  const CompRenderer = componentRegistry[comp.type]?.Renderer;
                  const isToolbarActive = hoveredCompId === comp.id;
                  return (
                    <div
                      key={comp.id}
                      className="relative group border border-gray-200 rounded bg-white p-2 hover:shadow-md transition"
                      onMouseEnter={e => onCompMouseEnter && onCompMouseEnter(comp.id, e)}
                      onMouseLeave={onCompMouseLeave}
                      tabIndex={0}
                      onFocus={e => onCompMouseEnter && onCompMouseEnter(comp.id, e as any)}
                      onBlur={onCompMouseLeave}
                    >
                      {/* Toolbar contextuelle flottante, centrée en haut à l'intérieur du composant */}
                      {isToolbarActive && (
                        <div
                          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1 z-30 flex gap-2 bg-white/90 backdrop-blur border border-gray-200 shadow-xl rounded-full px-3 py-2 items-center pointer-events-auto animate-fade-in"
                        >
                          <button
                            className="hover:bg-blue-100 text-blue-600 rounded-full h-9 w-9 flex items-center justify-center transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                            title="Éditer le composant"
                            type="button"
                            onClick={() => onEditComponent && onEditComponent(comp.id)}
                          >
                            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true" className="mx-auto my-auto">
                              <path d="M12 20h9"/>
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          <button
                            className="hover:bg-red-100 text-red-600 rounded-full h-9 w-9 flex items-center justify-center transition focus:outline-none focus:ring-2 focus:ring-red-400"
                            title="Supprimer le composant"
                            type="button"
                            onClick={() => onRemoveComponent && onRemoveComponent(comp.id)}
                          >
                            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true" className="mx-auto my-auto">
                              <path d="M3 6h18M9 6v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6m-6 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      )}
                      {/* Actions composant classiques masquées si toolbar contextuelle active */}
                      {!isToolbarActive && (
                        <div className="absolute top-3 right-3 flex flex-col gap-2 z-20 opacity-0 group-hover:opacity-100 transition pointer-events-auto bg-white rounded-xl shadow-md p-1 border border-gray-100">
                          <button
                            className="hover:bg-blue-100 text-blue-600 rounded-full h-9 w-9 flex items-center justify-center transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                            title="Éditer le composant"
                            type="button"
                            onClick={() => onEditComponent && onEditComponent(comp.id)}
                          >
                            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true" className="mx-auto my-auto">
                              <path d="M12 20h9"/>
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          <button
                            className="hover:bg-red-100 text-red-600 rounded-full h-9 w-9 flex items-center justify-center transition focus:outline-none focus:ring-2 focus:ring-red-400"
                            title="Supprimer le composant"
                            type="button"
                            onClick={() => onRemoveComponent && onRemoveComponent(comp.id)}
                          >
                            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true" className="mx-auto my-auto">
                              <path d="M3 6h18M9 6v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6m-6 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      )}
                      {CompRenderer && <CompRenderer {...comp} />}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}
      <button
        className="mt-4 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-primary/80"
        title="Ajouter une ligne"
        type="button"
        onClick={onAddRow}
      >
        +
      </button>
    </div>
  );
};
