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
      <ul className="space-y-4 mt-4">
        {comments?.map(comment => (
          <li key={comment.id} className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex gap-3 items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
              {comment.author?.name?.[0]?.toUpperCase() || comment.author?.email?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-900 text-sm">{comment.author?.name || comment.author?.email}</span>
                <span className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="text-gray-700 text-base leading-relaxed">{comment.content}</div>
            </div>
          </li>
        ))}
      </ul>
      { <CommentForm blogId={blogId} onCommented={() => setRefresh(r => r + 1)} />}
    </section>
  );
}
