export default function DeleteConfirmModal({ isOpen, onClose, onDelete }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-gray-800 rounded-xl p-8 w-full max-w-md mx-4 border border-red-700 shadow-2xl">
        <h3 className="text-2xl font-bold text-red-400 mb-4">Xóa truyện?</h3>
        <p className="text-gray-300 mb-8">
          Hành động này <strong>không thể hoàn tác</strong>. Chương này sẽ bị
          xóa dữ liệu vĩnh viễn.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition"
          >
            Hủy
          </button>
          <button
            onClick={onDelete}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition shadow-lg"
          >
            Xóa vĩnh viễn
          </button>
        </div>
      </div>
    </div>
  );
}
