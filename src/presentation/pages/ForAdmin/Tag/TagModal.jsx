// src/components/tag-management/TagModal.jsx
export default function TagModal({ isOpen, mode, genre, onClose, onSave, onChange }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-xl mx-4">
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold">
              {mode === "add" ? "Thêm thể loại" : "Chỉnh sửa thể loại"}
            </h4>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-200 text-xl">X</button>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-300 block mb-1">Tên</label>
              <input
                value={genre?.name || ""}
                onChange={(e) => onChange({ ...genre, name: e.target.value })}
                className="w-full bg-gray-800 text-gray-100 rounded-md px-3 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300 block mb-1">Mô tả (tuỳ chọn)</label>
              <textarea
                value={genre?.description || ""}
                onChange={(e) => onChange({ ...genre, description: e.target.value })}
                className="w-full bg-gray-800 text-gray-100 rounded-md px-3 py-2 border border-gray-700 focus:outline-none resize-none"
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={onClose} className="px-4 py-2 rounded-md border border-gray-700 text-gray-300 hover:bg-gray-800">
                Hủy
              </button>
              <button onClick={onSave} className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-100 border border-gray-700">
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}