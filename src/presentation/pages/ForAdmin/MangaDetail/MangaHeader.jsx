// src/components/manga-detail/MangaHeader.jsx
import React from "react";
import BackButton from "./common/BackButton";
import { Edit2, Trash2 } from "lucide-react";

export default function MangaHeader({ onBack, onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-900/90 backdrop-blur-sm sticky top-0 z-30">
      {/* Nút Quay lại */}
      <BackButton onClick={onBack} label="Quay lại danh sách" />

      {/* Nút Sửa + Xóa */}
      <div className="flex items-center gap-3">
        <button
          onClick={onEdit}
          className="flex items-center gap-2.5 px-5 py-2.5 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl border border-yellow-500/30"
        >
          <Edit2 size={17} />
          Sửa truyện
        </button>

        <button
          onClick={() => {
            onDelete();
          }}
          className="flex items-center gap-2.5 px-5 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl border border-red-500/30"
        >
          <Trash2 size={17} />
          Xóa truyện
        </button>
      </div>
    </div>
  );
}
