import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ChapterNavigation({
  mangaId,
  // chapterId,
  allChapters,
  chapterNumber,
  scrollToTop,
  setShowChapterList,
  setShowComments,
}) {
  const navigate = useNavigate();

  const currentNum = Number(chapterNumber) || 0;

  const maxChapterNumber =
    allChapters?.length > 0
      ? [...allChapters].sort((a, b) => b.chapterNumber - a.chapterNumber)[0]
          ?.chapterNumber
      : 0;

  const prevChapterId =
    currentNum > 1
      ? allChapters.find((ch) => Number(ch.chapterNumber) === currentNum - 1)
          ?.idChapter
      : null;

  const nextChapterId =
    currentNum < maxChapterNumber
      ? allChapters.find((ch) => Number(ch.chapterNumber) === currentNum + 1)
          ?.idChapter
      : null;

  const handleNavigate = (targetId) => {
    if (targetId) {
      navigate(`/mangas/${mangaId}/chapter/${targetId}`);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md bg-gray-900/90 text-white flex items-center justify-center gap-3 px-4 py-3 shadow-lg border-t border-gray-700">
      {/* Quay lại trang manga */}
      <button
        onClick={() => navigate(`/mangas/${mangaId}`)}
        className="bg-gray-700 hover:bg-gray-600 active:bg-gray-500 px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1"
        title="Quay lại truyện"
      >
        <ArrowLeft size={18} /> <span className="hidden sm:inline">Back</span>
      </button>

      {/* Chap trước */}
      <button
        onClick={() => handleNavigate(prevChapterId)}
        disabled={!prevChapterId}
        className={`px-4 py-2 rounded-lg transition flex items-center ${
          !prevChapterId
            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
            : "bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white"
        }`}
        title="Chapter trước"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Nút hiển thị chap hiện tại */}
      <button
        onClick={() => setShowChapterList(true)}
        className="min-w-[100px] px-4 py-2 bg-yellow-600 hover:bg-yellow-500 active:bg-yellow-700 rounded-lg font-bold text-sm transition shadow-md"
      >
        Chap {currentNum}
      </button>

      {/* Chap tiếp theo */}
      <button
        onClick={() => handleNavigate(nextChapterId)}
        disabled={!nextChapterId}
        className={`px-4 py-2 rounded-lg transition flex items-center ${
          !nextChapterId
            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
            : "bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white"
        }`}
        title="Chapter tiếp theo"
      >
        <ChevronRight size={20} />
      </button>

      {/* Nút bình luận */}
      <button
        onClick={() => setShowComments(true)}
        className="bg-green-600 hover:bg-green-700 active:bg-green-800 px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1"
      >
        <MessageCircle size={18} />
      </button>

      {/* Nút scroll lên đầu trang */}
      <button
        onClick={scrollToTop}
        className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1"
        title="Lên đầu trang"
      >
        <ChevronUp size={20} />
      </button>
    </div>
  );
}
