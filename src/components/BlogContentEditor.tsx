"use client";
import React, { useState } from "react";
import Editor from "./Editor";
import EditorAIBuilder from "./EditorAIBuilder";
import FullscreenModal from "./FullscreenModal";
import { Button } from "./ui/button";

interface BlogContentEditorProps {
  value: string;
  onChange: (html: string) => void;
}

export default function BlogContentEditor({ value, onChange }: BlogContentEditorProps) {
  const [mode, setMode] = useState<'wysiwyg' | 'ai'>("wysiwyg");
  const [showAIModal, setShowAIModal] = useState(false);

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
          variant={mode === "ai" ? "default" : "outline"}
          onClick={() => setShowAIModal(true)}
        >
          Mode AI Builder
        </Button>
      </div>
      <Editor value={value} onChange={onChange} />
      <FullscreenModal open={showAIModal} onClose={() => setShowAIModal(false)}>
        <EditorAIBuilder initialHtml={value} onHtmlChange={html => {
          onChange(html);
          // Optionnel : fermer la popup après génération
          // setShowAIModal(false);
        }} />
      </FullscreenModal>
    </div>
  );
}
