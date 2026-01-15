import { ArrowLeft, Trash2 } from "lucide-react";

export default function ChapterHeader({
  chapterNumber,
  onBack,
  onSave,
  onDelete,
  isSaving,
}) {
  return (
    <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur sticky top-0 z-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-6">
        {/* Nút Quay lại (Bên trái) */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition text-gray-200"
        >
          <ArrowLeft size={18} /> Quay lại
        </button>

        {/* Tiêu đề (Ở giữa) */}
        <h1 className="text-2xl font-bold text-gray-100">
          Chi tiết Chapter {chapterNumber}
        </h1>

        {/* Nhóm nút hành động (Bên phải) */}
        <div className="flex items-center gap-3">
          {/* Nút Xóa Mới Thêm */}
          <button
            onClick={onDelete}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-3 bg-red-600/90 hover:bg-red-600 text-white rounded-lg font-medium transition shadow-lg hover:shadow-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 size={18} />
            <span className="hidden sm:inline">Xóa</span>
          </button>

          {/* Nút Lưu (Giữ nguyên) */}
          <button
            onClick={onSave}
            disabled={isSaving}
            className={`px-7 py-3 rounded-lg font-medium transition shadow-lg ${
              isSaving
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-900/20"
            }`}
          >
            {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </div>
    </div>
  );
}
