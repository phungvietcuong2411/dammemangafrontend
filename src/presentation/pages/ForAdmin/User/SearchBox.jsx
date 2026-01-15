// src/components/user-management/SearchBox.jsx
import React from "react";

export default function SearchBox({ query, onQueryChange }) {
  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="w-64 bg-gray-800 placeholder-gray-400 text-gray-100 rounded-md py-2 pl-3 pr-10 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
        placeholder="Tìm theo username / gmail..."
      />
      <span className="absolute right-3 top-2.5 text-gray-400 text-sm pointer-events-none">
        Search
      </span>
    </div>
  );
}