"use client";
import React, { useState, useEffect } from "react";
import CommentForm from '@/components/CommentForm';
import { Comment } from '@/types/blog';
import { supabase } from '@/lib/supabaseClient';

export default function BlogComments({ blogId, comments: initialComments }: { blogId: string, comments: Comment[] }) {
  const [comments, setComments] = useState(initialComments);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    async function fetchUser() {
      const { data: { session } } = await supabase.auth.getSession();
    }
    fetchUser();
    const { data: listener } = supabase.auth.onAuthStateChange(() => fetchUser());
    return () => { listener?.subscription.unsubscribe(); };
  }, []);

  const fetchComments = async () => {
    const res = await fetch(`/client/api/comments?blogId=${blogId}`);
    if (res.ok) {
      const data = await res.json();
      setComments(data);
    }
  };

  React.useEffect(() => {
    if (refresh > 0) fetchComments();
    // eslint-disable-next-line
  }, [refresh]);

  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">Commentaires</h2>
      <ul className="space-y-2">
        {comments?.map(comment => (
          <li key={comment.id} className="bg-gray-100 rounded p-2">
            <div className="text-sm text-gray-700">{comment.content}</div>
            <div className="text-xs text-gray-400">par {comment.author?.email} le {new Date(comment.createdAt).toLocaleDateString()}</div>
          </li>
        ))}
      </ul>
      { <CommentForm blogId={blogId} onCommented={() => setRefresh(r => r + 1)} />}
    </section>
  );
}
