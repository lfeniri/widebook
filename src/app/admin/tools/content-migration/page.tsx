"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_PATHS } from '@/lib/constants';

export default function ContentMigrationTool() {
  const [migrating, setMigrating] = useState(false);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const router = useRouter();

  const runMigration = async () => {
    setMigrating(true);
    setError(null);
    setLogs([]);
    
    try {
      addLog('Starting migration...');
        // First, get all blogs
      addLog('Fetching all blogs...');
      const blogsRes = await fetch(API_PATHS.ADMIN.BLOGS.BASE);
      if (!blogsRes.ok) throw new Error('Failed to fetch blogs');
      const blogs = await blogsRes.json();
      addLog(`Found ${blogs.length} blogs`);
      
      // Process each blog
      let updated = 0;
      for (const blog of blogs) {
        if (blog.content) {
          if (!blog.content.js) {
            addLog(`Updating blog: ${blog.title} (${blog.id})`);
            
            // Add empty JS field
            const updatedContent = {
              ...blog.content,
              js: ''
            };
              // Update the blog
            const updateRes = await fetch(API_PATHS.ADMIN.BLOGS.CONTENT(blog.id), {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ content: updatedContent }),
            });
            
            if (!updateRes.ok) {
              addLog(`Failed to update blog ${blog.id}: ${updateRes.statusText}`);
            } else {
              addLog(`✓ Successfully updated blog ${blog.id}`);
              updated++;
            }
          } else {
            addLog(`Blog ${blog.id} already has JS field, skipping`);
          }
        } else {
          addLog(`Blog ${blog.id} has no content, skipping`);
        }
      }
      
      addLog(`Migration complete. Updated ${updated} blogs.`);
      setFinished(true);
    } catch (e: any) {
      setError(e.message);
      addLog(`Error: ${e.message}`);
    } finally {
      setMigrating(false);
    }
  };
  
  const addLog = (message: string) => {
    setLogs(prev => [...prev, message]);
  };
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Blog Content Migration Tool</h1>
      <p className="mb-4">
        This tool will update all blog content to include JavaScript support for the new SolumindEditor.
      </p>
      
      <div className="mb-6">
        <button
          onClick={runMigration}
          disabled={migrating}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {migrating ? "Running Migration..." : "Run Migration"}
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {logs.length > 0 && (
        <div className="border rounded p-4 bg-gray-50 mb-4">
          <h2 className="font-semibold mb-2">Migration Log:</h2>
          <div className="bg-black text-green-400 p-3 rounded font-mono text-sm overflow-auto max-h-[400px]">
            {logs.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
          </div>
        </div>
      )}
      
      {finished && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Migration completed successfully!
        </div>
      )}
    </div>
  );
}
