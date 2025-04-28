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

// Ce composant a été retiré suite à la suppression du mode WYSIWYG.
export default function Editor() {
  return null;
}
