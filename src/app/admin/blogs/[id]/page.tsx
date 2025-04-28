"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { BlogContentBlock, Blog } from '@/types/blog';
import { VisualBlogBuilder } from 'visual-blog-builder-lib/VisualBlogBuilder';
import EditorAIBuilder from '@/components/EditorAIBuilder';

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const [mode, setMode] = useState<'visual' | 'ai'>('visual');
  const [contentConfig, setContentConfig] = useState<BlogContentBlock[]>([]);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    params.then(p => setId(p.id));
  }, [params]);

  useEffect(() => {
    if (!id) return;
    async function fetchBlog() {
      const response = await fetch(`/api/blogs/${id}`);
      if (response.ok) {
        const data = await response.json();
        setBlog(data);
        setContentConfig(data.contentConfig || []);
      }
    }
    fetchBlog();
  }, [id]);

  return (
    <div>
      <button onClick={() => setMode('visual')}>Visual Builder</button>
      <button onClick={() => setMode('ai')}>AI Builder</button>
      {mode === 'visual' ? (
        <VisualBlogBuilder
          initialValue={contentConfig}
          onChange={(newConfig: BlogContentBlock[]) => setContentConfig(newConfig)}
        />
      ) : (
        <EditorAIBuilder
          initialContentConfig={contentConfig}
          onContentConfigChange={(newConfig: BlogContentBlock[]) => setContentConfig(newConfig)}
          blogId={id || ''}
        />
      )}
    </div>
  );
}
