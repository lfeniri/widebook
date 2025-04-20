import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="pt-8 pb-16 min-h-screen bg-gray-50">
      {children}
    </main>
  );
}
