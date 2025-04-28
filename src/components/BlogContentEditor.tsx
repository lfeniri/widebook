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
      <BlogBuilderModal
        key={showVisualModal ? `visual-open-${blogId}` : `visual-closed-${blogId}`}
        open={showVisualModal}
        onClose={() => setShowVisualModal(false)}
        value={value}
        onChange={onChange}
      />
      <FullscreenModal
        key={showAIModal ? `ai-open-${blogId}` : `ai-closed-${blogId}`}
        open={showAIModal}
        onClose={() => setShowAIModal(false)}
      >
        <EditorAIBuilder
          initialContentConfig={value || []}
          onContentConfigChange={onChange}
          blogId={blogId}
        />
      </FullscreenModal>
    </div>
  );
}
