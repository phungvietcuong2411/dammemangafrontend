// src/components/create-chapter/CreateChapter.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ChapterHeader from "./ChapterHeader";
import ChapterForm from "./ChapterForm";
import ImageGrid from "./ImageGrid";
import StatsBox from "./StatsBox";

import ChapterService from "../../../../usecases/ChapterService";
import ImgChapterService from "../../../../usecases/ImgChapterService";

const chapterService = new ChapterService();
const imgChapterService = new ImgChapterService();

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export default function CreateChapter() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [chapterNumber, setChapterNumber] = useState("");
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await chapterService.getChaptersByMangaId(id);

      if (data && data.length > 0) {
        const maxNumber = data.reduce((max, chapter) => {
          return chapter.chapterNumber > max ? chapter.chapterNumber : max;
        }, 0);

        setChapterNumber(maxNumber + 1);
      } else {
        setChapterNumber(1);
      }
    };
    fetchData();
  }, [id, chapterService]);

  const uploadToImgBB = async (file) => {
    const form = new FormData();
    form.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: form,
        }
      );
      const data = await res.json();
      return data.success ? data.data.url : null;
    } catch (err) {
      console.error("Upload error:", err);
      return null;
    }
  };

  const handleSave = async () => {
    if (!chapterNumber || images.length === 0) {
      toast.error("Vui lòng nhập số chapter và thêm ít nhất 1 ảnh!");
      return;
    }

    setIsSaving(true);
    setUploading(true);

    try {
      const uploadedURLs = [];
      for (const img of images) {
        const url = await uploadToImgBB(img.file);
        if (url) uploadedURLs.push(url);
      }

      setUploading(false);

      if (uploadedURLs.length !== images.length) {
        toast.error("Một số ảnh không thể upload! Vui lòng thử lại.");
        return;
      }

      // --- TẠO CHAPTER ---
      const response = await chapterService.createChapter({
        idManga: id,
        chapterNumber: chapterNumber,
        title: title || `Không có tiêu đề`,
      });

      // Lấy ID từ response
      const newChapterId = response?.data?.idChapter;

      if (!newChapterId) {
        throw new Error("API không trả về ID Chapter!");
      }

      console.log("Đã tạo Chapter ID:", newChapterId);

      // --- LƯU ẢNH VÀO DB ---
      const imgRequests = uploadedURLs.map((url, index) => ({
        chapterId: newChapterId,
        stt: index + 1,
        imgLink: url,
      }));

      console.log(imgRequests);

      await imgChapterService.createImgChapters(imgRequests);

      toast.success("Thêm chapter thành công!");

      setTimeout(() => {
        navigate(`/manga-detail-management/${id}`);
      }, 1000);
    } catch (error) {
      console.error("Lỗi quy trình lưu:", error);
      toast.error("Có lỗi xảy ra! Vui lòng kiểm tra lại server.");
    } finally {
      setIsSaving(false);
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <Toaster position="top-right" />

      <ChapterHeader
        onBack={() => navigate(-1)}
        onSave={handleSave}
        isSaving={isSaving || uploading}
      />

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Form + Stats */}
          <div className="space-y-6">
            <ChapterForm
              chapterNumber={chapterNumber}
              setChapterNumber={setChapterNumber}
              title={title}
              setTitle={setTitle}
              onImagesSelect={(files) => {
                const newImgs = files.map((file) => ({
                  id: Date.now() + Math.random(),
                  preview: URL.createObjectURL(file),
                  file,
                }));
                setImages((prev) => [...prev, ...newImgs]);
                toast.success(`Đã thêm ${newImgs.length} ảnh!`);
              }}
            />
            <StatsBox totalPages={images.length} />
          </div>

          {/* Right: Preview Grid */}
          <div className="lg:col-span-2">
            <ImageGrid
              images={images}
              onRemove={(id) => {
                setImages((prev) => prev.filter((img) => img.id !== id));
                toast.success("Đã xóa ảnh!");
              }}
              onReorder={(newOrder) => setImages(newOrder)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
