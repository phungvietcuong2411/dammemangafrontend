import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MangaPoster from "./MangaPoster.jsx";
import MangaInfo from "./MangaInfo.jsx";
import MangaActions from "./MangaActions.jsx";
import MangaChapters from "./MangaChapters.jsx";
import MangaStats from "./MangaStats.jsx";
import MangaComments from "./MangaComments.jsx";
import { Helmet } from "react-helmet-async";

import MangaCategoryService from "../../../../usecases/MangaCategoryService";
import MangaDetailService from "../../../../usecases/MangaDetailService.js";
import toast from "react-hot-toast";

function MangaDetailPage() {
  const { id } = useParams();
  const [mangaInfo, setMangaInfo] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [comments, setComments] = useState([]);
  const [statsData, setStatsData] = useState({ chaptersCount: 0, views: 0 });
  const [newComment, setNewComment] = useState("");
  const [genres, setGenres] = useState([]);

  const service = new MangaDetailService();
  const mangaCategoryService = new MangaCategoryService();

  function timeAgo(timestamp) {
    const diff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    return `${days} ngày trước`;
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchData = async () => {
      try {
        const data = await service.getMangaWithChapters(id);

        setMangaInfo({
          title: data.name_manga,
          authors: data.author_id || "Đoán xem ai là Tác giả",
          posterUrl: data.banner_url,
          mainImageUrl: data.poster_url,
          description: data.description || "Không có mô tả.",
          lastUpdate: timeAgo(data.updated_at),
        });

        setChapters(
          [...data.chapters].sort((a, b) => b.chapterNumber - a.chapterNumber)
        );

        setStatsData({
          chaptersCount: data.chapters?.length || 0,
          views: data.count_view || 0,
        });

        const categories = await mangaCategoryService.getCategoriesByManga(id);
        setGenres(categories);
      } catch (err) {
        toast.error("Lỗi tải dữ liệu manga!");
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newItem = {
      id: comments.length + 1,
      user: "Bạn đọc",
      text: newComment,
      date: "Vừa xong",
    };
    setComments([newItem, ...comments]);
    setNewComment("");
  };

  if (!mangaInfo) return <div className="h-screen">Đang tải...</div>;

  return (
    <>
      <Helmet>
        <title>{mangaInfo.title}</title>
      </Helmet>

      <div className="quicksand-uniquifier">
        <div className="h-500 bg-gray-300 relative inset-0">
          <div className="mx-40 bg-white absolute inset-0 rounded-xl my-20 overflow-hidden">
            <div className="flex flex-col">
              <MangaPoster posterUrl={mangaInfo.posterUrl} />
              <MangaInfo info={mangaInfo} genres={genres} />
              <MangaActions />
              <div className="flex justify-between mx-5 my-10 gap-10">
                <MangaChapters idManga={id} chapters={chapters} />
                <div className="w-1/3">
                  <MangaStats stats={statsData} />
                  <MangaComments
                    comments={comments}
                    newComment={newComment}
                    setNewComment={setNewComment}
                    handleAddComment={handleAddComment}
                    key={comments.map((c) => c.id).join("-")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MangaDetailPage;
