import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { BlogGrid } from "../../visual-blog-builder-lib/types/blogBuilderTypes";
import { BlogContentBlock } from '@/types/blog';
import { useBlogBuilderStore } from '../../visual-blog-builder-lib/store/blogBuilderStore';
import isEqual from 'lodash.isequal';

const VisualBlogBuilder = dynamic(() => import("../../visual-blog-builder-lib/VisualBlogBuilder"), { ssr: false });

export default function BlogBuilderModal({ open, onClose, value, onChange }: {
  open: boolean;
  onClose: () => void;
  value: BlogContentBlock[] | undefined;
  onChange: (val: BlogContentBlock[]) => void;
}) {
  if (!open) return null;

  // Conversion utilitaire entre BlogContentBlock[] (contentConfig) et BlogGrid
  const toBlogGrid = (blocks: BlogContentBlock[] | undefined): BlogGrid => {
    if ((blocks as any)?.rows) return blocks as any as BlogGrid;
    return {
      rows: [
        {
          id: 'row_1',
          columns: [
            { id: 'col_1', components: (blocks || []) as any }
          ]
        }
      ]
    };
  };
  const toContentConfig = (grid: BlogGrid): BlogContentBlock[] => {
    return grid.rows.flatMap(row => row.columns.flatMap(col => col.components)) as any;
  };

  // Empêche la boucle infinie : n'initialise que si la modal s'ouvre et que c'est la première ouverture
  const [initialized, setInitialized] = useState(false);
  const prevOpen = useRef(false);

  // Synchronisation descendante : si la value change depuis l'extérieur, on réinitialise le builder
  useEffect(() => {
    if (open && initialized) {
      const currentGrid = useBlogBuilderStore.getState().grid;
      const nextGrid = toBlogGrid(value);
      if (!isEqual(currentGrid, nextGrid)) {
        useBlogBuilderStore.getState().initialize(nextGrid);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    // Initialisation UNIQUEMENT lors du passage de open: false -> true
    if (open && !prevOpen.current) {
      useBlogBuilderStore.getState().initialize(toBlogGrid(value));
      setInitialized(true);
    }
    if (!open && prevOpen.current) {
      setInitialized(false);
    }
    prevOpen.current = open;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open || !initialized) return null;

  // VisualBlogBuilder ne doit pas recevoir de props qui changent à chaque render
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative z-10 w-full max-w-6xl h-[90vh] bg-white rounded-xl shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-bold">Éditeur visuel du blog</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-2xl">×</button>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <VisualBlogBuilder
            // Ne PAS passer initialValue après initialisation
            onChange={grid => onChange(toContentConfig(grid))}
          />
        </div>
      </div>
    </div>
  );
}
