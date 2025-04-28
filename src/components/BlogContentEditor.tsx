"use client";
import React, { useState } from "react";
import EditorAIBuilder from "./EditorAIBuilder";
import FullscreenModal from "./FullscreenModal";
import { Button } from "./ui/button";
import BlogBuilderModal from "./BlogBuilderModal";
import { BlogContentBlock } from "@/types/blog";

interface BlogContentEditorProps {
  value: BlogContentBlock[] | undefined;
  onChange: (blocks: BlogContentBlock[]) => void;
  blogId: string;
  isAdmin: boolean; // New prop to indicate admin context
}

export default function BlogContentEditor({ value, onChange, blogId, isAdmin }: BlogContentEditorProps) {
  const [showAIModal, setShowAIModal] = useState(false);
  const [showVisualModal, setShowVisualModal] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {isAdmin && (
        <div className="flex gap-2 mb-2">
          <Button
            type="button"
            variant={showVisualModal ? "default" : "outline"}
            onClick={() => setShowVisualModal(true)}
          >
            Mode Builder Visuel
          </Button>
          <Button
            type="button"
            variant={showAIModal ? "default" : "outline"}
            onClick={() => setShowAIModal(true)}
          >
            Mode AI Builder
          </Button>
        </div>
      )}
      <BlogBuilderModal
        key={showVisualModal ? `visual-open-${blogId}` : `visual-closed-${blogId}`}
        open={showVisualModal}
        onClose={() => setShowVisualModal(false)}
        value={value}
        onChange={onChange}
        aria-label="Ouvrir le mode Builder Visuel"
      />
      <FullscreenModal
        key={showAIModal ? `ai-open-${blogId}` : `ai-closed-${blogId}`}
        open={showAIModal}
        onClose={() => setShowAIModal(false)}
        aria-label="Ouvrir le mode AI Builder"
      >
        <div className="p-4">
          <h2 className="text-lg font-bold">Mode AI Builder</h2>
          <p className="text-sm text-gray-500">Utilisez l'AI pour générer du contenu de blog.</p>
        </div>
      </FullscreenModal>
      {showAIModal && !value && (
        <p className="text-sm text-gray-500">Chargement du contenu AI...</p>
      )}
      <EditorAIBuilder
        initialContentConfig={value || []}
        onContentConfigChange={onChange}
        blogId={blogId}
      />
    </div>
  );
}
