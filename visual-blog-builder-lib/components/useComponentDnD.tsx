import { useDraggable, useDroppable, DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';

export function useComponentDnD(id: string) {
  const draggable = useDraggable({ id });
  const droppable = useDroppable({ id });
  return { ...draggable, ...droppable };
}

export function BlogBuilderDndProvider({ children, onDragEnd }: { children: React.ReactNode, onDragEnd: (event: DragEndEvent) => void }) {
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      {children}
    </DndContext>
  );
}
