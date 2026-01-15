import { Link } from "react-router-dom";

export default function ChapterList({
  chapters,
  onCreateChapter,
  onDeleteChapter,
}) {
  const sortedChapters = (chapters || []).sort(
    (a, b) => b.chapterNumber - a.chapterNumber
  );

  const handleDelete = (e, chapterId) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDeleteChapter) {
      onDeleteChapter(chapterId);
    }
  };

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Danh sách chương
        </h3>
        <button
          onClick={onCreateChapter}
          className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium text-white transition shadow-md"
        >
          Thêm chapter
        </button>
      </div>

      <div className="border border-gray-700 rounded-lg p-4 bg-gray-900/80 max-h-96 overflow-y-auto">
        {sortedChapters.map((ch) => (
          <Link
            key={ch.idChapter}
            to={`/manga-detail-management/${ch.id_manga}/chapter-detail/${ch.idChapter}`}
            className="w-full flex justify-between items-center bg-gray-800/70 hover:bg-gray-700 p-4 mb-2 rounded-lg border border-gray-700 transition-all hover:shadow-md text-left group"
          >
            <span className="font-semibold text-gray-100 flex-1">
              Chapter {ch.chapterNumber}: {ch.title}
            </span>

            <button
              onClick={(e) => {
                handleDelete(e, ch.idChapter);
              }}
              className="ml-4 p-2 bg-red-700 hover:bg-red-800 rounded-md text-sm font-medium text-white transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
              title="Xóa chương này"
            >
              Xóa
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
