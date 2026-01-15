import { Link, useParams } from "react-router-dom";
import { Heart, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import FollowService from "../../../../usecases/FollowService";
import ChapterService from "../../../../usecases/ChapterService";
import toast from "react-hot-toast";

function MangaActions() {
  const { id } = useParams();
  const userId = localStorage.getItem("userId");

  const [isFollowed, setIsFollowed] = useState(false);
  const [followId, setFollowId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [firstChapterId, setFirstChapterId] = useState(null);

  const chapterService = new ChapterService();
  const followService = new FollowService();

  /* ================== LẤY CHAPTER ĐẦU TIÊN ================== */
  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const chapter = await chapterService.getFirstChapterByMangaId(id);

        if (chapter?.idChapter) {
          setFirstChapterId(chapter.idChapter);
        }
      } catch (err) {
        console.error("❌ Lỗi lấy chapter đầu tiên:", err);
      }
    })();
  }, [id]);

  /* ================== KIỂM TRA THEO DÕI ================== */
  useEffect(() => {
    if (!userId) return;

    (async () => {
      try {
        const follows = await followService.getFollowsByUser(userId);
        const record = follows.find((f) => f.mangaId === id);

        setIsFollowed(!!record);
        setFollowId(record?.followId || null);
      } catch {
        toast.error("Lỗi tải trạng thái theo dõi!");
      }
    })();
  }, [id, userId]);

  /* ================== FOLLOW / UNFOLLOW ================== */
  const handleFollowToggle = async () => {
    if (!userId) {
      toast.error("Vui lòng đăng nhập để theo dõi truyện!");
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    try {
      if (isFollowed) {
        await followService.deleteFollow(followId);
        setIsFollowed(false);
        setFollowId(null);
        toast.success("Đã hủy theo dõi truyện!");
      } else {
        await followService.createFollow(userId, id);
        const follows = await followService.getFollowsByUser(userId);
        const record = follows.find((f) => f.mangaId === id);

        setIsFollowed(true);
        setFollowId(record?.followId || null);
        toast.success("Đã theo dõi truyện!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi thay đổi trạng thái theo dõi!");
    } finally {
      setIsLoading(false);
    }
  };

  /* ================== UI ================== */
  return (
    <div className="flex gap-4 mx-20 mb-5">
      {firstChapterId ? (
        <Link
          to={`/mangas/${id}/chapter/${firstChapterId}`}
          className="mt-10 bg-gray-400 hover:bg-gray-600 transition px-5 py-2 rounded-xl text-white font-bold"
        >
          ĐỌC TỪ ĐẦU
        </Link>
      ) : (
        <button
          disabled
          className="mt-10 bg-gray-300 px-5 py-2 rounded-xl text-white font-bold cursor-not-allowed"
        >
          ĐANG TẢI...
        </button>
      )}

      <button
        onClick={handleFollowToggle}
        disabled={isLoading}
        className={`mt-10 px-5 py-2 rounded-xl text-white font-bold flex items-center gap-2 transition
          ${isFollowed ? "bg-red-400 hover:bg-red-600" : "bg-blue-400 hover:bg-blue-600"}
          ${isLoading ? "opacity-60 cursor-not-allowed" : ""}
        `}
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            ĐANG XỬ LÝ
          </>
        ) : (
          <>
            <Heart size={18} />
            {isFollowed ? "ĐÃ THEO DÕI" : "THEO DÕI TRUYỆN"}
          </>
        )}
      </button>
    </div>
  );
}

export default MangaActions;
