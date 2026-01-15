import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react"; // icon loading

import ChapterPages from "./ChapterPages";
import ChapterNavigation from "./ChapterNavigation";
import ChapterListPopup from "./ChapterListPopup";
import CommentSidebar from "./CommentSidebar";

import ImgChapterService from "../../../../usecases/ImgChapterService";
import ChapterService from "../../../../usecases/ChapterService";
import HistoryService from "../../../../usecases/HistoryService";
import HistoryChapterService from "../../../../usecases/HistoryChapterService";
import MangaService from "../../../../usecases/MangaService";

const imgChapterService = new ImgChapterService();
const chapterService = new ChapterService();
const historyService = new HistoryService();
const historyChapterService = new HistoryChapterService();
const mangaService = new MangaService();

function ChapterReadPage() {
  const { id, chapterId } = useParams();
  const navigate = useNavigate();

  const [dataImgChapter, setDataImgChapter] = useState([]);
  const [allChapters, setAllChapter] = useState([]);
  const [showUI, setShowUI] = useState(true);
  const [showChapterList, setShowChapterList] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isLoadingChapter, setIsLoadingChapter] = useState(false);

  const containerRef = useRef(null);
  const lastScrollY = useRef(0);

  // Hàm scroll lên đầu
  const scrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Khi chuyển chapter mới → scroll lên đầu và load ảnh
  useEffect(() => {
    const fetchChapterData = async () => {
      setIsLoadingChapter(true);
      scrollToTop();

      try {
        // Lấy ảnh chapter
        const data = await imgChapterService.getImgsByChapterId(chapterId);
        const sortedData = (data.length ? data : []).sort((a, b) => a.stt - b.stt);
        setDataImgChapter(sortedData);

        // Lấy history user
        const userId = localStorage.getItem("userId");
        if (userId) {
          const history = await historyService.recordHistory(userId, id);
          const historyId = history?.idHistory;
          if (historyId) {
            await historyChapterService.recordHistoryChapter(historyId, chapterId);
          }
        }

        // Tăng countView
        const manga = await mangaService.getMangaById(id);
        const newCountView = (manga.countView || 0) + 1;
        await mangaService.patchManga(id, { countView: newCountView });
      } catch (err) {
        console.error("🔥 Lỗi fetchChapterData:", err);
      } finally {
        setIsLoadingChapter(false);
      }
    };

    fetchChapterData();
  }, [id, chapterId]);

  // Lấy tất cả chapter (dùng để navigation)
  useEffect(() => {
    const fetchAllChapter = async () => {
      try {
        const dataAllChapter = await chapterService.getChaptersByMangaId(id);
        dataAllChapter.sort(
          (a, b) => Number(a.chapterNumber) - Number(b.chapterNumber)
        );
        setAllChapter(dataAllChapter);
      } catch (err) {
        console.error("🔥 Lỗi fetchAllChapter:", err);
      }
    };
    fetchAllChapter();
  }, [id]);

  // Ẩn/hiện UI khi scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const currentY = container.scrollTop;
      if (currentY > lastScrollY.current + 10) setShowUI(false);
      else if (currentY < lastScrollY.current - 10) setShowUI(true);
      lastScrollY.current = currentY;
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Chuyển chapter
  const handleNavigateChapter = (chapterIdToNavigate) => {
    if (!chapterIdToNavigate) return;
    navigate(`/mangas/${id}/chapter/${chapterIdToNavigate}`);
  };

  return (
    <div className="quicksand-uniquifier relative h-screen w-screen overflow-hidden bg-gray-200">
      <ChapterPages
        pages={dataImgChapter}
        containerRef={containerRef}
        showUI={showUI}
      />

      <CommentSidebar
        isOpen={showComments}
        onClose={() => setShowComments(false)}
      />

      <motion.div
        initial={{ y: 0 }}
        animate={{ y: showUI ? 0 : 100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute bottom-0 w-full"
      >
        <ChapterNavigation
          mangaId={id}
          chapterNumber={
            allChapters.find((ch) => ch.idChapter === Number(chapterId))
              ?.chapterNumber
          }
          allChapters={allChapters}
          scrollToTop={scrollToTop}
          setShowChapterList={setShowChapterList}
          setShowComments={setShowComments}
          onNavigateChapter={handleNavigateChapter}
        />
      </motion.div>

      {showChapterList && (
        <ChapterListPopup
          mangaId={id}
          allChapters={allChapters}
          chapterNumber={chapterId}
          setShowChapterList={setShowChapterList}
        />
      )}

      {/* Overlay loading khi fetch chapter */}
      {isLoadingChapter && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <Loader2 className="animate-spin text-white" size={48} />
        </div>
      )}
    </div>
  );
}

export default ChapterReadPage;
