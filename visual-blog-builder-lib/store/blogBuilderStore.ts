import { create } from "zustand";
import { BlogGrid, BlogComponentInstance } from "../types/blogBuilderTypes";

interface BlogBuilderState {
  grid: BlogGrid;
  selectedComponent: BlogComponentInstance | null;
  initialize: (initialValue?: BlogGrid) => void;
  addComponent: (colId: string, type: BlogComponentInstance["type"]) => void;
  updateComponentConfig: (compId: string, config: any) => void;
  removeComponent: (compId: string) => void;
  moveComponent: (compId: string, toColId: string, toIndex: number) => void;
  setColumnWidth: (colId: string, width: number) => void;
  // Ajout d'une ligne
  addRow: () => void;
  // Suppression d'une ligne
  removeRow: (rowId: string) => void;
  // Ajout d'une colonne
  addColumn: (rowId: string) => void;
  // Suppression d'une colonne
  removeColumn: (rowId: string, colId: string) => void;
  // ...autres actions (add, edit, remove, select, etc.)
}

// Helper pour garantir que rows est toujours un tableau
function getSafeRows(grid: any): any[] {
  return Array.isArray(grid?.rows) ? grid.rows : [];
}

export const useBlogBuilderStore = create<BlogBuilderState>((set) => ({
  grid: { rows: [] },
  selectedComponent: null,
  initialize: (initialValue?: BlogGrid) => set({ grid: initialValue && Array.isArray(initialValue.rows) ? initialValue : { rows: [
    { id: 'row_1', columns: [ { id: 'col_1', components: [] } ] }
  ] } }),
  addComponent: (colId: string, type: BlogComponentInstance["type"]) => set((state: BlogBuilderState) => {
    const newComponent: BlogComponentInstance = {
      id: `${type}_${Date.now()}`,
      type,
      config: {},
    };
    const safeRows = getSafeRows(state.grid);
    return {
      grid: {
        ...state.grid,
        rows: safeRows.map((row: any) => ({
          ...row,
          columns: row.columns.map((col: any) =>
            col.id === colId
              ? { ...col, components: [...col.components, newComponent] }
              : col
          ),
        })),
      },
    };
  }),
  updateComponentConfig: (compId: string, config: any) => set((state: BlogBuilderState) => {
    const safeRows = getSafeRows(state.grid);
    return {
      grid: {
        ...state.grid,
        rows: safeRows.map((row: any) => ({
          ...row,
          columns: row.columns.map((col: any) => ({
            ...col,
            components: col.components.map((c: any) =>
              c.id === compId ? { ...c, config } : c
            )
          }))
        }))
      }
    };
  }),
  removeComponent: (compId: string) => set((state: BlogBuilderState) => {
    const safeRows = getSafeRows(state.grid);
    return {
      grid: {
        ...state.grid,
        rows: safeRows.map((row: any) => ({
          ...row,
          columns: row.columns.map((col: any) => ({
            ...col,
            components: col.components.filter((c: any) => c.id !== compId)
          }))
        }))
      }
    };
  }),
  moveComponent: (compId: string, toColId: string, toIndex: number) => set((state: BlogBuilderState) => {
    let movedComponent: BlogComponentInstance | null = null;
    const safeRows = getSafeRows(state.grid);
    // Retirer le composant de sa colonne d'origine
    const newRows = safeRows.map((row: any) => ({
      ...row,
      columns: row.columns.map((col: any) => {
        const filtered = col.components.filter((c: any) => {
          if (c.id === compId) {
            movedComponent = c;
            return false;
          }
          return true;
        });
        return { ...col, components: filtered };
      })
    }));
    // Ajouter le composant à la nouvelle colonne/position
    if (movedComponent) {
      for (const row of newRows) {
        for (const col of row.columns) {
          if (col.id === toColId) {
            col.components.splice(toIndex, 0, movedComponent);
          }
        }
      }
    }
    return {
      grid: {
        ...state.grid,
        rows: newRows
      }
    };
  }),
  setColumnWidth: (colId: string, width: number) => set((state: BlogBuilderState) => {
    const safeRows = getSafeRows(state.grid);
    return {
      grid: {
        ...state.grid,
        rows: safeRows.map((row: any) => ({
          ...row,
          columns: row.columns.map((col: any) =>
            col.id === colId ? { ...col, width } : col
          )
        }))
      }
    };
  }),
  // Ajout d'une ligne
  addRow: () => set((state: BlogBuilderState) => {
    const safeRows = getSafeRows(state.grid);
    const newRowId = `row_${Date.now()}`;
    return {
      grid: {
        ...state.grid,
        rows: [
          ...safeRows,
          { id: newRowId, columns: [{ id: `${newRowId}_col_1`, components: [] }] }
        ]
      }
    };
  }),
  // Suppression d'une ligne
  removeRow: (rowId: string) => set((state: BlogBuilderState) => {
    const safeRows = getSafeRows(state.grid);
    return {
      grid: {
        ...state.grid,
        rows: safeRows.filter(row => row.id !== rowId)
      }
    };
  }),
  // Ajout d'une colonne
  addColumn: (rowId: string) => set((state: BlogBuilderState) => {
    const safeRows = getSafeRows(state.grid);
    return {
      grid: {
        ...state.grid,
        rows: safeRows.map((row: any) =>
          row.id === rowId
            ? {
                ...row,
                columns: [
                  ...row.columns,
                  { id: `${rowId}_col_${Date.now()}_${Math.floor(Math.random()*10000)}`, components: [] }
                ]
              }
            : row
        )
      }
    };
  }),
  // Suppression d'une colonne
  removeColumn: (rowId: string, colId: string) => set((state: BlogBuilderState) => {
    const safeRows = getSafeRows(state.grid);
    return {
      grid: {
        ...state.grid,
        rows: safeRows.map((row: any) =>
          row.id === rowId
            ? {
                ...row,
                columns: row.columns.filter((col: any) => col.id !== colId)
              }
            : row
        )
      }
    };
  }),
  // ...autres actions à implémenter
}));
