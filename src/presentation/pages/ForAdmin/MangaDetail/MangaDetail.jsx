import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import MangaHeader from "./MangaHeader";
import MangaPoster from "./MangaPoster";
import MangaInfo from "./MangaInfo";
import ChapterList from "./ChapterList";
import StatsCard from "./StatsCard";
import CommentSection from "./CommentSection";
import DeleteConfirmModal from "./DeleteConfirmModal";
import MangaService from "../../../../usecases/MangaService";
import MangaCategoryService from "../../../../usecases/MangaCategoryService";
import MangaDetailRepository from "../../../../infrastructure/repositories/MangaDetailRepository";
import ChapterService from "../../../../usecases/ChapterService";
import { Loader2 } from "lucide-react";

export default function MangaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [activity, setActivity] = useState("");
  const [idChapter, setIdChapter] = useState("");

  function timeAgo(timestamp) {
    const diff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    return `${days} ngày trước`;
  }

  const fetchData = async () => {
    try {
      const mangaService = new MangaDetailRepository();
      const mangaData = await mangaService.getMangaWithChapters(id);

      if (!mangaData) {
        setStory(null);
        return;
      }

      // Lấy genres trực tiếp theo idManga
      const categoryService = new MangaCategoryService();
      const mangaCategories = await categoryService.getCategoriesByManga(id);

      const mapped = {
        id: mangaData.id_manga,
        title: mangaData.name_manga,
        author: mangaData.author_id,
        description: mangaData.description,
        chapters: mangaData.chapters.length,
        views: mangaData.count_view,
        cover: mangaData.poster_url,
        poster: mangaData.banner_url,
        genres: mangaCategories.length > 0 ? mangaCategories : ["Updating..."],
        lastUpdate: mangaData.updated_at
          ? timeAgo(mangaData.updated_at)
          : "Updating...",
        chaptersList: mangaData.chapters,
        comments: [],
      };

      setStory(mapped);
    } catch (e) {
      console.error("Lỗi load manga:", e);
      setStory(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteStory = async () => {
    try {
      const mangaCategoryService = new MangaCategoryService();
      const mangaService = new MangaService();

      await mangaCategoryService.updateCategoriesToManga(id, []);

      await mangaService.deleteManga(id);

      toast.success("Xóa truyện thành công!");
      setShowDeleteConfirm(false);
      setTimeout(() => navigate("/manga-management"), 1000);
    } catch (err) {
      console.error("Xóa truyện lỗi:", err);
      toast.error("Xóa truyện thất bại!");
    }
  };

  const handleDeleteChapter = async () => {
    try {
      const chapterService = new ChapterService();

      const data = await chapterService.deleteChapter(idChapter);

      toast.success(data.message);
      setShowDeleteConfirm(false);
      fetchData();
    } catch (err) {
      console.error("Xóa chapter lỗi:", err);
      toast.error("Xóa chapter thất bại!");
    }
  };

  const goToEdit = () => navigate(`/edit-manga/${id}`);
  const goToCreateChapter = () => navigate(`/create-chapter/${id}`);

  if (isLoading)
    return (
      <div className="fixed inset-0 bg-black/50 bg-opacity-60 flex items-center justify-center z-50">
        <Loader2 className="animate-spin text-white" size={48} />
      </div>
    );

  if (!story)
    return (
      <div className="text-center py-20 text-red-400 text-xl">
        Không tìm thấy truyện!
      </div>
    );

  return (
    <div className="quicksand-uniquifier bg-gray-900 text-gray-200 min-h-screen overflow-y-auto">
      <Toaster position="top-right" />

      <MangaHeader
        onBack={() => navigate("/manga-management")}
        onEdit={goToEdit}
        onDelete={() => {
          setShowDeleteConfirm(true);
          setActivity("deleteManga");
        }}
      />

      <div className="mx-auto max-w-6xl my-8">
        <div className="bg-gray-800 relative rounded-xl shadow-2xl overflow-hidden">
          <MangaPoster poster={story.poster} />
          <MangaInfo story={story} />

          <div className="mt-50 p-8 pb-16">
            <div className="flex gap-10">
              <ChapterList
                chapters={story.chaptersList}
                onCreateChapter={goToCreateChapter}
                onDeleteChapter={(idChapter) => {
                  setShowDeleteConfirm(true);
                  setActivity("deleteChapter");
                  setIdChapter(idChapter);
                }}
              />
              <div className="w-80 space-y-8">
                <StatsCard chapters={story.chapters} views={story.views} />
                <CommentSection comments={story.comments} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmModal
        activity={activity}
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteStory}
        idChapter={idChapter}
        onConfirmDeleteChapter={handleDeleteChapter}
      />
    </div>
  );
}
