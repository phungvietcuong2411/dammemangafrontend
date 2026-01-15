// src/components/edit-manga/ImageUploader.jsx
import { Upload } from "lucide-react";

export default function ImageUploader({ cover, poster, onCoverChange, onPosterChange }) {
  return (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">Cover</label>
        <div className="relative group">
          <img src={cover} alt="Cover" className="w-full h-96 object-cover rounded-xl shadow-2xl border-2 border-gray-700" />
          <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-all rounded-xl cursor-pointer">
            <Upload size={32} className="text-white" />
            <input type="file" accept="image/*" onChange={onCoverChange} className="hidden" />
          </label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">Poster</label>
        <div className="relative group">
          <img src={poster} alt="Poster" className="w-full h-56 object-cover rounded-xl shadow-2xl border-2 border-gray-700" />
          <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-all rounded-xl cursor-pointer">
            <Upload size={32} className="text-white" />
            <input type="file" accept="image/*" onChange={onPosterChange} className="hidden" />
          </label>
        </div>
      </div>

    </div>
  );
}
