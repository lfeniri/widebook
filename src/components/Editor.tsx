"use client";
import React, { useCallback, useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight";
import { supabase } from "@/lib/supabaseClient";

interface EditorProps {
  value: string;
  onChange: (html: string) => void;
}

export default function Editor({ value, onChange }: EditorProps) {
  const [mode, setMode] = useState<'wysiwyg' | 'html'>("wysiwyg");
  const [html, setHtml] = useState(value);
  const lowlight = createLowlight();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link,
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setHtml(html);
      onChange(html);
    },
  });

  useEffect(() => {
    if (editor && mode === "wysiwyg" && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
    if (mode === "html") setHtml(value);
    // eslint-disable-next-line
  }, [value, mode]);

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    // Upload vers Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const { data, error } = await supabase.storage.from('blog-images').upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });
    if (error) {
      alert('Erreur upload image: ' + error.message);
      return;
    }
    const { data: publicUrlData } = supabase.storage.from('blog-images').getPublicUrl(fileName);
    const url = publicUrlData?.publicUrl;
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  return (
    <div className="border rounded-md p-2 bg-white">
      <div className="flex gap-2 mb-2">
        <button type="button" onClick={() => setMode("wysiwyg")}
          className={mode === "wysiwyg" ? "font-bold underline" : ""}>Visuel</button>
        <button type="button" onClick={() => setMode("html")}
          className={mode === "html" ? "font-bold underline" : ""}>HTML</button>
        {mode === "wysiwyg" && (
          <label className="ml-auto cursor-pointer">
            <span className="px-2 py-1 bg-gray-100 rounded">Image</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
        )}
      </div>
      {mode === "wysiwyg" ? (
        <EditorContent editor={editor} className="min-h-[200px]" />
      ) : (
        <textarea
          className="w-full min-h-[200px] border p-2 font-mono"
          value={html}
          onChange={e => {
            setHtml(e.target.value);
            onChange(e.target.value);
            editor?.commands.setContent(e.target.value);
          }}
        />
      )}
    </div>
  );
}
