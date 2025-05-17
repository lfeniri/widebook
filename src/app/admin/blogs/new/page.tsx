import React from "react";
import BlogForm from '@/components/BlogForm';

export default function NewBlogPage() {  return (
    <div className="w-full py-10 animate-fadeInUp">
      <h2 className="text-2xl font-bold mb-6">Créer un nouveau blog</h2>
      <BlogForm />
    </div>
  );
}
