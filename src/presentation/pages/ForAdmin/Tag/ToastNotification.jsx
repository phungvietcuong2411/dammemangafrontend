// ToastNotification.jsx
export default function ToastNotification({ toast, onClose }) {
  if (!toast.show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border text-sm font-medium ${
        toast.type === "success"
          ? "bg-green-900/90 border-green-700 text-green-200"
          : "bg-red-900/90 border-red-700 text-red-200"
      }`}>
        <span>{toast.type === "success" ? "Check" : "Warning"}</span>
        <span>{toast.message}</span>
        <button onClick={onClose} className="ml-2 text-gray-400 hover:text-white">X</button>
      </div>
    </div>
  );
}