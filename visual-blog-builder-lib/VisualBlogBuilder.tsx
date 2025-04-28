import React, { useRef, useState } from "react";
import { AddComponentModal } from "./components/AddComponentModal";
import { ConfigComponentModal } from "./components/ConfigComponentModal";
import { useBlogBuilderStore } from "./store/blogBuilderStore";
import { GridRenderer } from "./components/GridRenderer";
import { BlogBuilderDndProvider, useComponentDnD } from "./components/useComponentDnD";
import { AnimatePresence, motion } from "framer-motion";

export interface VisualBlogBuilderProps {
  initialValue?: any;
  onChange?: (value: any) => void;
}

export const VisualBlogBuilder: React.FC<VisualBlogBuilderProps> = ({ initialValue, onChange }) => {
  // Initialisation de l'état global (dans un effet pour éviter le setState during render)
  React.useEffect(() => {
    useBlogBuilderStore.getState().initialize(initialValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue]);

  const grid = useBlogBuilderStore((state) => state.grid);
  const addComponent = useBlogBuilderStore((state: any) => state.addComponent);
  const updateComponentConfig = useBlogBuilderStore((state: any) => state.updateComponentConfig);
  const removeComponent = useBlogBuilderStore((state: any) => state.removeComponent);
  const moveComponent = useBlogBuilderStore((state: any) => state.moveComponent);
  const addRow = useBlogBuilderStore((state: any) => state.addRow);
  const removeRow = useBlogBuilderStore((state: any) => state.removeRow);
  const addColumn = useBlogBuilderStore((state: any) => state.addColumn);
  const removeColumn = useBlogBuilderStore((state: any) => state.removeColumn);

  const [addModal, setAddModal] = useState<{ open: boolean; colId: string | null }>({ open: false, colId: null });
  const [configModal, setConfigModal] = useState<{ open: boolean; compId: string | null }>({ open: false, compId: null });

  // État pour la toolbar contextuelle
  const [hoveredComp, setHoveredComp] = useState<{ compId: string | null; anchorRect: DOMRect | null; anchorEl: HTMLElement | null }>({ compId: null, anchorRect: null, anchorEl: null });

  // Handler pour afficher la toolbar au survol d'un composant
  const handleCompMouseEnter = (compId: string, e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    setHoveredComp({ compId, anchorRect: rect, anchorEl: el });
  };
  const handleCompMouseLeave = () => setHoveredComp({ compId: null, anchorRect: null, anchorEl: null });

  // Handler pour dupliquer (optionnel, à implémenter dans le store si besoin)
  const handleDuplicateComponent = (compId: string) => {
    // TODO: add duplicate logic in store
  };

  // Handler pour ouvrir la modale d'ajout sur une colonne
  const handleOpenAddModal = (colId: string) => setAddModal({ open: true, colId });
  const handleCloseAddModal = () => setAddModal({ open: false, colId: null });

  // Handler pour ajouter un composant (à compléter avec le store)
  const handleAddComponent = (type: any) => {
    if (addModal.colId) {
      addComponent(addModal.colId, type);
    }
    handleCloseAddModal();
  };

  // Handler pour ouvrir la modale de config
  const handleOpenConfigModal = (compId: string) => setConfigModal({ open: true, compId });
  const handleCloseConfigModal = () => setConfigModal({ open: false, compId: null });

  // Handler pour sauvegarder la config d'un composant
  const handleSaveConfig = (compId: string, config: any) => {
    updateComponentConfig(compId, config);
    handleCloseConfigModal();
  };

  // Handler pour le drag & drop (à compléter pour la logique de déplacement)
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!active || !over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;
    // Trouver la colonne et l'index cible
    let toColId = "";
    let toIndex = 0;
    grid.rows.forEach((row: any) => {
      row.columns.forEach((col: any) => {
        const idx = col.components.findIndex((c: any) => c.id === overId);
        if (idx !== -1) {
          toColId = col.id;
          toIndex = idx;
        }
      });
    });
    if (toColId) {
      moveComponent(activeId, toColId, toIndex);
    }
  };

  const resizingCol = useRef<string | null>(null);
  const startX = useRef<number>(0);
  const startWidth = useRef<number>(0);

  const handleResizeStart = (e: React.MouseEvent, colId: string) => {
    resizingCol.current = colId;
    startX.current = e.clientX;
    const col = grid.rows.flatMap((row: any) => row.columns).find((c: any) => c.id === colId);
    startWidth.current = col?.width || 0;
    document.addEventListener("mousemove", handleResizing as any);
    document.addEventListener("mouseup", handleResizeEnd as any);
  };

  const handleResizing = (e: MouseEvent) => {
    if (!resizingCol.current) return;
    const delta = e.clientX - startX.current;
    const newWidth = Math.max(80, startWidth.current + delta);
    // Mettre à jour la largeur de la colonne dans le store
    useBlogBuilderStore.getState().setColumnWidth(resizingCol.current, newWidth);
  };

  const handleResizeEnd = () => {
    resizingCol.current = null;
    document.removeEventListener("mousemove", handleResizing as any);
    document.removeEventListener("mouseup", handleResizeEnd as any);
  };

  // TODO: Ajout des modales, drag & drop, etc.
  // Sécurisation de l'accès à grid et grid.rows pour éviter toute erreur d'itérabilité
  const safeGrid = React.useMemo(() => (grid && typeof grid === 'object' && Array.isArray(grid.rows) ? grid : { rows: [] }), [grid]);

  return (
    <BlogBuilderDndProvider onDragEnd={handleDragEnd}>
      <div className="flex flex-col h-full w-full bg-white rounded-lg shadow-xl p-6 relative">
        {/* Toolbar contextuelle flottante supprimée ici, gérée uniquement dans GridRenderer */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Éditeur visuel de blog</h2>
          <button
            className="bg-primary text-white px-5 py-2 rounded-lg shadow-lg font-semibold text-base flex items-center gap-2 hover:bg-primary/90 active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/50"
            onClick={addRow}
            type="button"
          >
            {/* Plus icon Heroicons */}
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M12 5v14m7-7H5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Nouvelle section
          </button>
        </div>
        <div className="flex-1 overflow-auto">
          <GridRenderer
            grid={safeGrid}
            onAddComponent={handleOpenAddModal}
            onEditComponent={handleOpenConfigModal}
            onRemoveComponent={removeComponent}
            useComponentDnD={useComponentDnD}
            onAddRow={addRow}
            onRemoveRow={removeRow}
            onAddColumn={addColumn}
            onRemoveColumn={removeColumn}
            onCompMouseEnter={handleCompMouseEnter}
            onCompMouseLeave={handleCompMouseLeave}
            hoveredCompId={hoveredComp.compId}
          />
        </div>
        <AddComponentModal
          open={addModal.open}
          onClose={handleCloseAddModal}
          onSelect={handleAddComponent}
        />
        <ConfigComponentModal
          open={configModal.open}
          onClose={handleCloseConfigModal}
          compId={configModal.compId}
          grid={safeGrid}
          onSave={handleSaveConfig}
        />
      </div>
    </BlogBuilderDndProvider>
  );
};

export default VisualBlogBuilder;
