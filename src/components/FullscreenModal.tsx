"use client";
import React from "react";

interface FullscreenModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function FullscreenModal({ open, onClose, children }: FullscreenModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative z-10 w-full h-full flex flex-col bg-white rounded-none shadow-xl overflow-auto">
        <button
          className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 rounded-full p-2 text-xl font-bold z-20"
          onClick={onClose}
          aria-label="Fermer"
        >
          ×
        </button>
        <div className="flex-1 flex flex-col p-6 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
