// src/components/create-chapter/ChapterForm.jsx (phiên bản đã hoàn thiện)
import ImageUploader from "./common/ImageUploader";

export default function ChapterForm({
  chapterNumber,
  setChapterNumber,
  title,
  setTitle,
  onImagesSelect,
}) {
  return (
    <div className="space-y-6 bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-xl">
      {/* Số chapter */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Số chapter <span className="text-green-400">(tự động tăng)</span>
        </label>
        <input
          type="number"
          value={chapterNumber}
          onChange={(e) => setChapterNumber(e.target.value)}
          className="w-full px-5 py-3.5 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition text-lg font-medium"
          placeholder="31"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Tiêu đề chapter
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-5 py-3.5 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition text-lg font-medium"
          placeholder="Hãy nhập nội dung"
        />
      </div>

      {/* Upload ảnh */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Thêm ảnh trang chapter
        </label>
        <ImageUploader onFilesSelect={onImagesSelect} />
      </div>
    </div>
  );
}
