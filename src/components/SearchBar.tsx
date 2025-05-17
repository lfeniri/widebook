import React from "react";

export default function SearchBar() {
  return (
    <form className="w-full flex items-center gap-2 bg-white rounded-full shadow px-4 py-2 border focus-within:ring-2 focus-within:ring-primary transition-all">
      <input
        type="text"
        placeholder="Rechercher un blog, une catégorie..."
        className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 px-2 py-1"
        aria-label="Rechercher"
      />
      <button
        type="submit"
        className="bg-primary text-white rounded-full px-4 py-1 font-semibold hover:bg-primary/90 transition-colors"
      >
        Rechercher
      </button>
    </form>
  );
}
