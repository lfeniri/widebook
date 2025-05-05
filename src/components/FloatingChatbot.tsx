"use client";
import React, { useState, useEffect } from "react";

interface FloatingChatbotProps {
  open: boolean;
  onClose: () => void;
  initialExpanded?: boolean;
  onExpandChange?: (isExpanded: boolean) => void;
  unreadCount?: number;
  children: React.ReactNode;
}

export default function FloatingChatbot({ 
  open, 
  // onClose est toujours requis pour la compatibilité mais ignoré
  onClose, 
  initialExpanded = false,
  onExpandChange,
  unreadCount = 0,
  children 
}: FloatingChatbotProps) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [localUnreadCount, setLocalUnreadCount] = useState(unreadCount);
    // Reset unread count when expanded
  useEffect(() => {
    if (isExpanded) {
      setLocalUnreadCount(0);
    }
  }, [isExpanded]);
  
  // Update local unread count when prop changes
  useEffect(() => {
    if (!isExpanded) {
      setLocalUnreadCount(unreadCount);
    }
  }, [unreadCount, isExpanded]);

  if (!open) return null;

  return (    <div className={`fixed top-20 right-4 z-50 flex flex-col ${isExpanded ? 'h-[450px] w-[320px]' : 'h-14 w-14'} transition-all duration-300`}>
      <div className={`relative z-10 flex flex-col bg-white ${isExpanded ? 'rounded-lg shadow-xl' : 'rounded-full shadow-lg'} overflow-hidden ${isExpanded ? 'h-full w-full' : 'h-14 w-14'}`}>
        {/* Minimized state - chat icon */}        {!isExpanded && (
          <div className="relative">
            <button 
              className="w-full h-full bg-blue-600 text-white flex items-center justify-center rounded-full hover:bg-blue-700"
              onClick={() => {
                setIsExpanded(true);
                if (onExpandChange) {
                  onExpandChange(true);
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </button>
            {localUnreadCount > 0 && (              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {localUnreadCount > 9 ? '9+' : localUnreadCount}
              </span>
            )}
          </div>
        )}
        
        {/* Expanded state */}
        {isExpanded && (
          <>
            {/* Header with toggle and close buttons */}
            <div className="flex justify-between items-center bg-blue-600 text-white p-2">
              <div className="font-medium text-sm">Assistant d'édition</div>
              <div className="flex ml-auto">
                <button
                  className="p-1 hover:bg-blue-700 rounded mr-1 text-sm"
                  onClick={() => setIsExpanded(false)}
                  aria-label="Réduire"
                >
                  −
                </button>
                <button
                  className="p-1 hover:bg-blue-700 rounded text-sm"
                  onClick={onClose}
                  aria-label="Fermer"
                >
                  ×
                </button>
              </div>
            </div>
            
            {/* Content area */}
            <div className="flex-1 flex flex-col overflow-auto">
              {children}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
