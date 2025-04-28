import dynamic from "next/dynamic";
import React from "react";

const VisualBlogBuilder = dynamic(() => import("../../visual-blog-builder-lib/VisualBlogBuilder"), { ssr: false });

export default function BlogBuilderModal({ open, onClose, value, onChange }: {
  open: boolean;
  onClose: () => void;
  value: any;
  onChange: (val: any) => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative z-10 w-full max-w-6xl h-[90vh] bg-white rounded-xl shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-bold">Éditeur visuel du blog</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-2xl">×</button>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <VisualBlogBuilder initialValue={value} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}
