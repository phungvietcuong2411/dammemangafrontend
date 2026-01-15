import { Link } from "react-router-dom";

function MangaChapters({ idManga, chapters }) {
  return (
    <div className="w-2/3">
      <div className="text-xs font-bold text-gray-600 uppercase mb-3">
        Danh sách chương
      </div>
      <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 max-h-[600px] overflow-y-scroll">
        {chapters.map((ch) => (
          <Link
            key={ch.idChapter}
            to={`/mangas/${idManga}/chapter/${ch.idChapter}`}
            className="flex justify-between items-center bg-white hover:bg-blue-50 p-3 mb-2 rounded-lg border border-gray-100 transition"
          >
            <span className="font-semibold text-gray-700">
              Chapter {ch.chapterNumber}: {ch.title}
            </span>
            <span className="text-xs text-gray-500">{ch.date}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MangaChapters;
