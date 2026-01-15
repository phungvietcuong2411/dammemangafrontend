// ChapterForm.jsx
import ImageUploader from "./ImageUploader";

export default function ChapterForm({
  chapterNumber,
  setChapterNumber,
  title,
  setTitle,
  onImagesSelect,
}) {
  return (
    <div className="space-y-6 bg-gray-800/60 p-6 rounded-xl border border-gray-700">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Số chapter
        </label>
        <input
          type="number"
          value={chapterNumber}
          onChange={(e) => setChapterNumber(e.target.value)}
          className="w-full px-5 py-3.5 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg font-medium"
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
          className="w-full px-5 py-3.5 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg font-medium"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Thêm trang mới
        </label>
        <ImageUploader onFilesSelect={onImagesSelect} />
      </div>
    </div>
  );
}
