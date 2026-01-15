// ImageGrid.jsx
import { Upload } from "lucide-react";
import ImagePreviewCard from "./ImagePreviewCard";

export default function ImageGrid({ images, onRemove, onReorder }) {
  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = Number(e.dataTransfer.getData("text/plain"));
    if (dragIndex === dropIndex) return;

    const newImages = [...images];
    const [moved] = newImages.splice(dragIndex, 1);
    newImages.splice(dropIndex, 0, moved);
    onReorder(newImages);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-300 mb-5">
        Sắp xếp trang (kéo thả để đổi thứ tự)
      </h3>

      {images.length === 0 ? (
        <div className="text-center py-24 text-gray-500">
          <Upload size={64} className="mx-auto mb-4 opacity-40" />
          <p className="text-lg">Chưa có trang nào</p>
        </div>
      ) : (
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-4 bg-gray-800/30 rounded-xl border border-gray-700"
          onDragOver={(e) => e.preventDefault()}
        >
          {images.map((img, index) => (
            <ImagePreviewCard
              key={img.id}
              img={img}
              index={index}
              onRemove={onRemove}
              onDrop={handleDrop}
            />
          ))}
        </div>
      )}
    </div>
  );
}