import { ArrowLeft } from "lucide-react";

export default function EditMangaHeader({ onBack, onSave, isSaving }) {
  return (
    <div className="border-b border-gray-700 bg-gray-900/80 backdrop-blur">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2.5 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium text-gray-200 transition"
        >
          <ArrowLeft size={18} /> Quay lại
        </button>

        <h1 className="text-2xl font-bold">Thêm truyện</h1>

        <button
          onClick={onSave}
          disabled={isSaving}
          className={`flex items-center gap-2.5 px-7 py-2.5 rounded-lg text-sm font-semibold transition ${
            isSaving
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
          }`}
        >
          {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </div>
    </div>
  );
}