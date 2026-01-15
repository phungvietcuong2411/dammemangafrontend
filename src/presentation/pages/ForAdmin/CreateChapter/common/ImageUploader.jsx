// src/components/common/ImageUploader.jsx
import React from "react";
import { Upload, Image as ImageIcon } from "lucide-react";

export default function ImageUploader({ onFilesSelect, multiple = true, accept = "image/*" }) {
  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) onFilesSelect(files);
  };

  return (
    <label className="block cursor-pointer">
      <input
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
      <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-600 rounded-xl hover:border-green-500 hover:bg-gray-800/40 transition-all duration-300 bg-gray-800/60">
        <Upload size={40} className="text-gray-400 mb-3" />
        <p className="text-sm font-medium text-gray-300">Click hoặc kéo thả ảnh vào đây</p>
        <p className="text-xs text-gray-500 mt-1">Hỗ trợ nhiều ảnh • Xem trước ngay lập tức</p>
      </div>
    </label>
  );
}