import React from "react";
import SearchBar from "@/components/SearchBar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="pt-8 pb-16 min-h-screen bg-gray-50">
      <div className="mb-8">
        <SearchBar />
      </div>
      {children}
    </main>
  );
}
