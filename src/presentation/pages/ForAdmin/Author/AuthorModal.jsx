import React from "react";

export default function AuthorModal({
  isOpen,
  mode,
  author,
  onClose,
  onSave,
  onChange,
}) {
  if (!isOpen) return null;

  const isAddMode = mode === "add";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 animate-fade-in">
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <h4 className="text-lg font-semibold text-gray-100">
              {isAddMode ? "Thêm tác giả mới" : "Chỉnh sửa tác giả"}
            </h4>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 transition text-2xl font-light leading-none"
            >
              ×
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tên tác giả <span className="text-red-400">*</span>
              </label>

              {/* FIXED: dùng nameAuthor */}
              <input
                type="text"
                value={author?.nameAuthor || ""}
                onChange={(e) =>
                  onChange({ ...author, nameAuthor: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-gray-800/70 border border-gray-700 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition"
                placeholder="Ví dụ: Eiichiro Oda"
                autoFocus
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 py-4 bg-gray-800/50 border-t border-gray-700">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-md border border-gray-600 text-gray-300 hover:bg-gray-700/60 transition"
            >
              Hủy
            </button>
            <button
              onClick={onSave}
              className="px-6 py-2.5 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-100 font-medium border border-gray-600 shadow-sm transition hover:shadow-md"
            >
              {isAddMode ? "Thêm tác giả" : "Lưu thay đổi"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
