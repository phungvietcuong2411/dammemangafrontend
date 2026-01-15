// ImagePreviewCard.jsx
import { GripVertical, X } from "lucide-react";

export default function ImagePreviewCard({ img, index, onRemove, onDrop }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", index);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDrop={(e) => onDrop(e, index)}
      onDragOver={(e) => e.preventDefault()}
      className="relative group rounded-lg overflow-hidden border-2 border-gray-700 hover:border-green-500 transition-all cursor-move shadow-lg"
    >
      <img
        src={img.preview}
        alt={`Trang ${index + 1}`}
        className="w-full h-56 object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(img.id);
          }}
          className="p-3 bg-red-600 hover:bg-red-700 rounded-full shadow-lg"
        >
          <X size={20} />
        </button>
      </div>

      {/* Thứ tự */}
      <div className="absolute top-2 left-2 bg-black/80 px-3 py-1 rounded text-sm font-bold text-green-400">
        {index + 1}
      </div>

      {/* Icon kéo */}
      <div className="absolute top-2 right-2 bg-black/80 p-2 rounded opacity-0 group-hover:opacity-100 transition">
        <GripVertical size={18} className="text-gray-400" />
      </div>
    </div>
  );
}