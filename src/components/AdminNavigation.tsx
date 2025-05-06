"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function AdminNavigation() {
  const [isToolsExpanded, setIsToolsExpanded] = useState(false);
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 p-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <Link href="/admin" className="font-bold text-xl text-primary">
            Solumind Admin
          </Link>
        </div>
        
        <div className="flex space-x-4">
          <Link 
            href="/admin/blogs" 
            className={`px-3 py-2 rounded ${isActive('/admin/blogs') ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Blogs
          </Link>
          
          <div className="relative">
            <button
              onClick={() => setIsToolsExpanded(!isToolsExpanded)}
              className={`px-3 py-2 rounded flex items-center ${
                pathname.startsWith('/admin/tools') ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Tools
              <svg 
                className={`ml-1 w-4 h-4 transition-transform ${isToolsExpanded ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isToolsExpanded && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <Link 
                  href="/admin/tools/content-migration" 
                  className={`block px-4 py-2 text-sm ${
                    isActive('/admin/tools/content-migration') 
                      ? 'bg-gray-100 text-primary font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsToolsExpanded(false)}
                >
                  Content Migration Tool
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
