import React from "react";
import { componentRegistry } from "./componentRegistry";
import { BlogComponentType } from "../types/blogBuilderTypes";
import { Modal } from "./Modal";

interface AddComponentModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (type: BlogComponentType) => void;
}

export const AddComponentModal: React.FC<AddComponentModalProps> = ({ open, onClose, onSelect }) => {
  return (
    <Modal open={open} onClose={onClose} title="Ajouter un composant">
      <div className="max-w-lg w-full mx-auto bg-white rounded-xl shadow-2xl border border-gray-200 p-4">
        <div className="max-h-[60vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Object.entries(componentRegistry).map(([type, meta]) => (
              <button
                key={type}
                className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-primary/10 border border-gray-200 hover:border-primary transition focus:outline-none focus:ring-2 focus:ring-primary/30"
                onClick={() => onSelect(type as BlogComponentType)}
                type="button"
              >
                <span className="text-2xl mb-2">{meta.icon}</span>
                <span className="font-semibold text-sm mb-1 text-gray-800">{meta.label}</span>
                <span className="text-xs text-gray-500 text-center line-clamp-2">{meta.description}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
