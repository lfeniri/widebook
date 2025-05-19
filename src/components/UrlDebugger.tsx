// Composant pour aider à debugger les paramètres d'URL
import React from 'react';

export default function UrlDebugger() {
  // Ce composant ne sera utilisé que pendant le développement
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const debugInfo = {
    fullUrl: typeof window !== 'undefined' ? window.location.href : 'N/A',
    pathname: typeof window !== 'undefined' ? window.location.pathname : 'N/A',
    search: typeof window !== 'undefined' ? window.location.search : 'N/A',
    hash: typeof window !== 'undefined' ? window.location.hash : 'N/A',
  };

  return (
    <div className="text-xs border border-gray-300 p-3 rounded mt-5 bg-gray-50 max-w-xs overflow-hidden">
      <h3 className="font-bold mb-2 text-gray-700">Informations de débogage URL:</h3>
      <pre className="text-xs overflow-auto">
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
    </div>
  );
}
