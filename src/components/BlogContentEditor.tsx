"use client";
import React, { useState } from "react";
import Editor from "./Editor";
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
  const [mode, setMode] = useState<'wysiwyg' | 'ai'>("wysiwyg");
  const [showAIModal, setShowAIModal] = useState(false);
  const [showVisualModal, setShowVisualModal] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 mb-2">
        <Button
          type="button"
          variant={mode === "wysiwyg" ? "default" : "outline"}
          onClick={() => setMode("wysiwyg")}
        >
          Mode Éditeur
        </Button>
        <Button
          type="button"
          variant={showVisualModal ? "default" : "outline"}
          onClick={() => setShowVisualModal(true)}
        >
          Mode Builder Visuel
        </Button>
        <Button
          type="button"
          variant={mode === "ai" ? "default" : "outline"}
          onClick={() => setShowAIModal(true)}
        >
          Mode AI Builder
        </Button>
      </div>
      {mode === "wysiwyg" && <Editor value={value} onChange={onChange} />}
      <BlogBuilderModal open={showVisualModal} onClose={() => setShowVisualModal(false)} value={value} onChange={onChange} />
      <FullscreenModal open={showAIModal} onClose={() => setShowAIModal(false)}>
        <EditorAIBuilder initialHtml={value} onHtmlChange={html => {
          onChange(html);
          // Optionnel : fermer la popup après génération
          // setShowAIModal(false);
        }} blogId={blogId} />
      </FullscreenModal>
    </div>
  );
}
