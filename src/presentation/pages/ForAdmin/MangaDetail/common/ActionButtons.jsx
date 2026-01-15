// src/components/manga-detail/ActionButtons.jsx
import React from "react";
import { Edit2, Trash2 } from "lucide-react";

export default function ActionButtons({ onEdit, onDelete }) {
  return (
    <div className="fixed top-6 right-6 z-40 flex gap-3">
      {/* Nút Sửa */}
      <button
        onClick={onEdit}
        className="flex items-center gap-2.5 px-5 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm font-semibold text-white shadow-xl transition-all duration-200 hover:shadow-2xl border border-yellow-500/30"
        title="Sửa thông tin truyện"
      >
        <Edit2 size={18} />
        Sửa truyện
      </button>

      {/* Nút Xóa */}
      <button
        onClick={onDelete}
        className="flex items-center gap-2.5 px-5 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold text-white shadow-xl transition-all duration-200 hover:shadow-2xl border border-red-500/30"
        title="Xóa truyện vĩnh viễn"
      >
        <Trash2 size={18} />
        Xóa truyện
      </button>
    </div>
  );
}