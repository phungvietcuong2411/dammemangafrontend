import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import DeleteConfirmModal from "./DeleteConfirmModal";

import ChapterHeader from "./ChapterHeader";
import ChapterForm from "./ChapterForm";
import ImageGrid from "./ImageGrid";
import StatsBox from "./StatsBox";

import ChapterService from "../../../../usecases/ChapterService";
import ImgChapterService from "../../../../usecases/ImgChapterService";

const IMGBB_API_KEY =
  import.meta.env.VITE_IMGBB_API_KEY;

export default function ChapterDetail() {
  const { id, idChapter } = useParams();
  const navigate = useNavigate();

  const chapterService = new ChapterService();
  const imgChapterService = new ImgChapterService();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showModel, setShowModel] = useState(false);

  const [chapterNumber, setChapterNumber] = useState("");
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!idChapter) return;
      try {
        setIsLoading(true);
        const [chapterRes, imgsRes] = await Promise.all([
          chapterService.getChapterById(idChapter),
          imgChapterService.getImgsByChapterId(idChapter),
        ]);

        if (chapterRes) {
          const finalChapter = chapterRes.data || chapterRes;
          setChapterNumber(finalChapter.chapterNumber);
          setTitle(finalChapter.title);
        }

        if (imgsRes) {
          const rawImages = Array.isArray(imgsRes)
            ? imgsRes
            : imgsRes.data || [];
          const sortedImages = rawImages
            .sort((a, b) => a.stt - b.stt)
            .map((img) => ({
              id: img.idImgChapter,
              url: img.imgLink,
              preview: img.imgLink,
              isNew: false,
            }));
          setImages(sortedImages);
        }
      } catch (error) {
        toast.error("Không thể tải thông tin.", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [idChapter]);

  const uploadToImgBB = async (file) => {
    const form = new FormData();
    form.append("image", file);
    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        { method: "POST", body: form }
      );
      const data = await res.json();
      return data.success ? data.data.url : null;
    } catch (error) {
      toast.error("Không thể tải thông tin.", error);
    }
  };

  const handleSave = async () => {
    if (!chapterNumber || images.length === 0) {
      toast.error("Thiếu thông tin hoặc ảnh!");
      return;
    }

    setIsSaving(true);
    setUploading(true);

    try {
      const chapterIdInt = Number(idChapter);

      await chapterService.updateChapter(idChapter, {
        idManga: id,
        chapterNumber: Number(chapterNumber),
        title: title || `Không có tiêu đề`,
      });

      const newImageFiles = images.filter((img) => img.isNew);
      const uploadedMap = {};

      if (newImageFiles.length > 0) {
        await Promise.all(
          newImageFiles.map(async (img) => {
            const url = await uploadToImgBB(img.file);
            if (url) uploadedMap[img.id] = url;
          })
        );
      }
      setUploading(false);

      const currentDbImages = await imgChapterService.getImgsByChapterId(
        idChapter
      );
      const listToDelete = Array.isArray(currentDbImages)
        ? currentDbImages
        : currentDbImages.data || [];

      if (listToDelete.length > 0) {
        await Promise.all(
          listToDelete.map((img) =>
            imgChapterService.deleteImgChapter(img.idImgChapter)
          )
        );
      }

      const validRequests = [];
      images.forEach((img, index) => {
        const finalUrl = img.isNew ? uploadedMap[img.id] : img.url;

        if (finalUrl) {
          validRequests.push({
            chapterId: chapterIdInt,
            imgLink: finalUrl,
            stt: index + 1,
          });
        }
      });

      await Promise.all(
        validRequests.map(async (item) => {
          return imgChapterService.createImgChapters([item]);
        })
      );

      toast.success("Cập nhật thành công!");

      const refreshedImages = validRequests.map((req, i) => ({
        id: `saved-${Date.now()}-${i}`,
        url: req.imgLink,
        preview: req.imgLink,
        isNew: false,
      }));
      setImages(refreshedImages);

      navigate(-1);
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      toast.error("Lỗi: " + msg);
    } finally {
      setIsSaving(false);
      setUploading(false);
    }
  };

  const handleDeleteChapter = async () => {
    console.log(idChapter);
    try {
      const data = await chapterService.deleteChapter(idChapter);
      toast.success(data.message);
      navigate(-1);
    } catch (error) {
      toast.error("Lỗi: " + error);
    }
  };

  if (isLoading)
    return <div className="text-white p-10 text-center">Đang tải...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <Toaster position="top-right" />
      <ChapterHeader
        chapterNumber={chapterNumber}
        onBack={() => navigate(-1)}
        onSave={handleSave}
        onDelete={() => setShowModel(true)}
        isSaving={isSaving || uploading}
      />
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <ChapterForm
              chapterNumber={chapterNumber}
              setChapterNumber={setChapterNumber}
              title={title}
              setTitle={setTitle}
              onImagesSelect={(files) => {
                const newImgs = files.map((file) => ({
                  id: `new-${Date.now()}-${Math.random()}`,
                  preview: URL.createObjectURL(file),
                  file: file,
                  isNew: true,
                }));
                setImages((prev) => [...prev, ...newImgs]);
              }}
            />
            <StatsBox totalPages={images.length} />
          </div>
          <div className="lg:col-span-2">
            <ImageGrid
              images={images}
              onRemove={(id) =>
                setImages((prev) => prev.filter((img) => img.id !== id))
              }
              onReorder={setImages}
            />
          </div>
        </div>
      </div>
      <DeleteConfirmModal
        isOpen={showModel}
        onClose={() => setShowModel(false)}
        onDelete={handleDeleteChapter}
      />
    </div>
  );
}
