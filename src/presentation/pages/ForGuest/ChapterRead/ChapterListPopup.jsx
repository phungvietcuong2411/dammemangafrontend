import { useNavigate } from "react-router-dom";

export default function ChapterListPopup({
  mangaId,
  allChapters,
  chapterNumber,
  setShowChapterList,
}) {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-center">Danh sách Chap</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-3">
            {allChapters.map((chap, index) => (
              <button
                key={index}
                onClick={() => {
                  setShowChapterList(false);
                  navigate(`/mangas/${mangaId}/chapter/${chap.idChapter}`);
                }}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition ${
                  Number(chapterNumber) === chap.idChapter
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                }`}
              >
                Chap {chap.chapterNumber}
              </button>
            ))}
          </div>
        </div>
        <div className="p-4 border-t">
          <button
            onClick={() => setShowChapterList(false)}
            className="w-full py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg font-medium transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
