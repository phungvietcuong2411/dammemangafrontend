// DeleteConfirmModal.jsx
export default function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-sm mx-4">
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 border border-red-700 rounded-lg shadow-lg p-6">
          <h4 className="text-lg font-semibold text-red-400 mb-2">Xác nhận xóa</h4>
          <p className="text-sm text-gray-300 mb-4">
            Bạn có chắc chắn muốn xóa thể loại này? Hành động này không thể hoàn tác.
          </p>
          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 rounded-md border border-gray-700 text-gray-300 hover:bg-gray-800">
              Hủy
            </button>
            <button onClick={onConfirm} className="px-4 py-2 rounded-md bg-red-700 hover:bg-red-600 text-white border border-red-600">
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}