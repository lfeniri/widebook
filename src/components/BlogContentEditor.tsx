"use client";
import React, { useState } from "react";
import EditorAIBuilder from "./EditorAIBuilder";
import FullscreenModal from "./FullscreenModal";
import { Button } from "./ui/button";
import BlogBuilderModal from "./BlogBuilderModal";

interface BlogContentEditorProps {
  value: string;
  onChange: (html: string) => void;
  blogId: string; // Ajout de la prop blogId
}

export default function BlogContentEditor({ value, onChange, blogId }: BlogContentEditorProps) {
  const [showAIModal, setShowAIModal] = useState(false);
  const [showVisualModal, setShowVisualModal] = useState(false);

  return (
    <div className="flex flex-col gap-4">
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
      <BlogBuilderModal open={showVisualModal} onClose={() => setShowVisualModal(false)} value={value} onChange={onChange} />
      <FullscreenModal open={showAIModal} onClose={() => setShowAIModal(false)}>
        <EditorAIBuilder initialHtml={value} onHtmlChange={html => {
          onChange(html);
        }} blogId={blogId} />
      </FullscreenModal>
    </div>
  );
}
