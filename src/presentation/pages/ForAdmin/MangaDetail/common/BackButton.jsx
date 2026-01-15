// src/components/common/BackButton.jsx
import React from "react";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ onClick, label = "Quay lại" }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium text-gray-200 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-700"
    >
      <ArrowLeft size={18} />
      {label}
    </button>
  );
}