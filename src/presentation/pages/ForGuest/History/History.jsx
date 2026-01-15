import { useEffect, useState, useRef } from "react";
import { format, differenceInHours, differenceInDays } from "date-fns";
import { Link } from "react-router-dom";
import { vi } from "date-fns/locale";
import { Loader2 } from "lucide-react";
import "../../../../styles/font.css";
import HistoryService from "../../../../usecases/HistoryService";
import HistoryChapterService from "../../../../usecases/HistoryChapterService";
import MangaService from "../../../../usecases/MangaService";
import ChapterService from "../../../../usecases/ChapterService";

export default function App() {
    const [historyData, setHistoryData] = useState([]);
    const [loading, setLoading] = useState(false);

    const historyService = useRef(new HistoryService()).current;
    const historyChapterService = useRef(new HistoryChapterService()).current;
    const mangaService = useRef(new MangaService()).current;
    const chapterService = useRef(new ChapterService()).current;

    const getRelativeDate = (date) => {
        const now = new Date();
        const hoursDiff = differenceInHours(now, date);
        if (hoursDiff < 24) {
            return "Hôm nay";
        } else {
            const daysDiff = differenceInDays(now, date);
            return `${daysDiff} ngày trước`;
        }
    };

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        setLoading(true); // <-- Bật loading
        try {
            console.log("BẮT ĐẦU loadHistory() tối ưu - Nhóm theo ngày và manga");
            const userId = localStorage.getItem("userId");
            console.log("🆔 userId từ localStorage:", userId);

            if (!userId) {
                console.error("❌ Không tìm thấy userId trong localStorage");
                setHistoryData([]);
                return;
            }

            const histories = await historyService.getHistoriesByUserId(userId);
            console.log("Histories:", histories);

            if (histories.length === 0) {
                setHistoryData([]);
                return;
            }

            const allHistoryIds = histories.map(h => h.idHistory);
            const allHistoryChaptersResults = await Promise.all(
                allHistoryIds.map(id => historyChapterService.getHistoryChaptersByHistory(id))
            );
            const allHistoryChapters = allHistoryChaptersResults.flat();
            console.log("All History Chapters:", allHistoryChapters);

            const mangaCache = {};
            const chapterCache = {};

            const chapterEntries = await Promise.all(
                allHistoryChapters.map(async (chap) => {
                    const history = histories.find(h => h.idHistory === chap.idHistory);
                    if (!history || !history.mangaId) return null;

                    let manga = mangaCache[history.mangaId];
                    if (!manga) {
                        manga = await mangaService.getMangaById(history.mangaId);
                        if (!manga) return null;
                        mangaCache[history.mangaId] = manga;
                    }

                    let chapterInfo = chapterCache[chap.idChapter];
                    if (!chapterInfo) {
                        chapterInfo = await chapterService.getChapterById(chap.idChapter);
                        if (!chapterInfo) return null;
                        chapterCache[chap.idChapter] = chapterInfo;
                    }

                    const readAt = new Date(chap.readAt);
                    if (isNaN(readAt.getTime())) return null;

                    const dateKey = format(readAt, "yyyy-MM-dd", { locale: vi });

                    return {
                        dateKey,
                        readAt,
                        mangaId: history.mangaId,
                        title: manga.name,
                        cover: manga.bannerUrl,
                        chapterId: chap.idChapter,
                        chapterNumber: chapterInfo.chapterNumber,
                        chapterTitle: chapterInfo.title || "(Không có tiêu đề)",
                    };
                }).filter(Boolean)
            );

            if (chapterEntries.length === 0) {
                setHistoryData([]);
                return;
            }

            chapterEntries.sort((a, b) => new Date(b.readAt) - new Date(a.readAt));

            const sessionMap = new Map();
            chapterEntries.forEach(entry => {
                const sessionKey = `${entry.dateKey}_${entry.mangaId}`;
                if (!sessionMap.has(sessionKey)) {
                    sessionMap.set(sessionKey, {
                        date: new Date(entry.dateKey),
                        mangaId: entry.mangaId,
                        title: entry.title,
                        cover: entry.cover,
                        chapters: [],
                    });
                }
                const session = sessionMap.get(sessionKey);
                session.chapters.push({
                    id: entry.chapterId,
                    number: entry.chapterNumber,
                    title: entry.chapterTitle,
                    readAt: entry.readAt,
                });
            });

            Array.from(sessionMap.values()).forEach(session => {
                session.chapters.sort((a, b) => a.number - b.number);
            });

            const finalList = Array.from(sessionMap.values()).sort((a, b) => {
                const dateDiff = new Date(b.date) - new Date(a.date);
                if (dateDiff !== 0) return dateDiff;
                return a.title.localeCompare(b.title);
            });

            setHistoryData(finalList);
            console.log("🎉 FINAL (grouped by day-manga):", finalList);
        } catch (err) {
            console.error("Lỗi loadHistory:", err);
            setHistoryData([]);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="mt-15 quicksand-uniquifier min-h-screen bg-gray-50 py-8 lg:py-16">
            <div className="max-w-5xl mx-auto px-4">
                <div className="mb-8 lg:mb-12">
                    <h1 className="text-xl lg:text-2xl font-bold text-gray-700 uppercase tracking-wider">
                        Lịch sử đọc truyện
                    </h1>
                </div>
                <div className="relative">
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
                            <span className="ml-3 text-gray-500">Đang tải lịch sử...</span>
                        </div>
                    ) : historyData.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            Chưa có lịch sử đọc nào.
                        </div>
                    ) : (
                        historyData.map((item, index) => (
                            <div key={index} className="flex gap-3 md:gap-6 mb-12 last:mb-0">
                                <div className="hidden md:block w-48 text-right text-sm text-gray-600 pr-6 pt-1">
                                    {getRelativeDate(item.date)}
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-6 h-6 rounded-full bg-white border-4 border-gray-800 flex items-center justify-center z-10">
                                        <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                                    </div>
                                    {index < historyData.length - 1 && (
                                        <div className="w-0.5 bg-gray-800 flex-1 mt-2"></div>
                                    )}
                                </div>
                                <div className="flex-1 pb-8">
                                    <div className="flex gap-3 mb-3">
                                        {item.mangaId ? (
                                            <Link to={`/mangas/${item.mangaId}`} className="shrink-0">
                                                <img
                                                    src={item.cover}
                                                    alt={item.title}
                                                    className="w-16 h-20 object-cover rounded shadow"
                                                />
                                            </Link>
                                        ) : (
                                            <div className="shrink-0 w-16 h-20 bg-gray-200 rounded shadow flex items-center justify-center">
                                                <span className="text-xs text-gray-500">No Cover</span>
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            {item.mangaId ? (
                                                <Link
                                                    to={`/mangas/${item.mangaId}`}
                                                    className="block font-bold text-gray-900 hover:text-blue-600 transition text-base"
                                                >
                                                    {item.title}
                                                </Link>
                                            ) : (
                                                <div className="block font-bold text-gray-900 text-base">
                                                    {item.title || "Unknown Manga"}
                                                </div>
                                            )}
                                            <div className="md:hidden text-xs text-gray-600 mt-1">
                                                {getRelativeDate(item.date)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        {item.chapters.map((chap) => (
                                            <Link
                                                key={chap.id}
                                                to={`/mangas/${item.mangaId}/chapter/${chap.id}`}
                                                className={`block p-3 rounded-lg border transition-shadow ${item.mangaId ? 'bg-white border-gray-200 hover:border-gray-400' : 'bg-gray-100 border-gray-300 cursor-not-allowed'}`}
                                            >
                                                <div className="text-sm text-gray-700 mb-2">
                                                    <strong>Chương {chap.number}:</strong>{" "}
                                                    {chap.title || "(Không có tiêu đề)"}
                                                </div>
                                                <div className="text-xs text-gray-600">
                                                    {format(new Date(chap.readAt), "HH:mm dd/MM/yyyy", { locale: vi })}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
