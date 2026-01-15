// src/components/edit-manga/EditManga.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import EditMangaHeader from "./EditMangaHeader";
import ImageUploader from "./ImageUploader";
import AuthorDropdown from "./AuthorDropdown";
import CategoryMultiSelect from "./CategoryMultiSelect";
import DescriptionField from "./DescriptionField";

import MangaService from "../../../../usecases/MangaService";
import AuthorService from "../../../../usecases/AuthorService";
import CategoryService from "../../../../usecases/CategoryService";
import MangaCategoryService from "../../../../usecases/MangaCategoryService";
import UploadImageService from "../../../../usecases/UploadImageService";

export default function EditManga() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    authorId: "",
    authorName: "",
    description: "",
    tags: [],
    cover: "",
    poster: "",
  });

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tempFiles, setTempFiles] = useState({
    cover: null,
    poster: null,
  });

  const uploadService = new UploadImageService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const mangaService = new MangaService();
        const authorService = new AuthorService();
        const categoryService = new CategoryService();
        const mangaCategoryService = new MangaCategoryService();

        // Load manga
        const mangaData = await mangaService.getMangaById(id);
        setFormData({
          title: mangaData.name,
          author: {
            id: mangaData.authorId,
            name: mangaData.authorName,
          },
          description: mangaData.description,
          tags: [],
          cover: mangaData.posterUrl,
          poster: mangaData.bannerUrl,
        });


        // Load authors
        const authorList = await authorService.getAllAuthors();
        setAuthors(authorList.map(a => ({ id: a.idAuthor, name: a.nameAuthor })));

        // Load all categories
        const categoryList = await categoryService.getAllCategories();
        setCategories(categoryList);

        // Load categories của manga
        const mangaCategories = await mangaCategoryService.getCategoriesByManga(id);
        setFormData(prev => ({
          ...prev,
          tags: mangaCategories.map(c => c.nameCategory),
        }));

      } catch (err) {
        console.error("Lỗi load dữ liệu:", err);
        toast.error("Lỗi khi load dữ liệu!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleTempFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setTempFiles(prev => ({ ...prev, [type]: file }));

    setFormData(prev => ({
      ...prev,
      [type]: URL.createObjectURL(file),
    }));
  };

  const uploadImageToBackend = async (file, type) => {
    try {
      const url = await uploadService.uploadImage(file);
      toast.success(`${type === "cover" ? "Cover" : "Poster"} upload thành công!`);
      return url;
    } catch (err) {
      console.error("Upload ảnh lỗi:", err);
      toast.error(`${type === "cover" ? "Cover" : "Poster"} upload thất bại!`);
      return null;
    }
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.author) {
      toast.error("Vui lòng nhập tên truyện và chọn tác giả!");
      return;
    }

    setIsSaving(true);

    try {
      if (tempFiles.cover) {
        formData.cover = await uploadImageToBackend(tempFiles.cover, "cover");
      }
      if (tempFiles.poster) {
        formData.poster = await uploadImageToBackend(tempFiles.poster, "poster");
      }

      const mangaService = new MangaService();
      const mangaCategoryService = new MangaCategoryService();

      const payload = {
        name: formData.title,
        authorId: formData.author?.id,
        description: formData.description,
        bannerUrl: formData.poster,
        posterUrl: formData.cover,
      };

      await mangaService.patchManga(id, payload);

      const uniqueTags = [...new Set(formData.tags)];

      const categoryIds = uniqueTags
        .map(tagName => categories.find(c => c.nameCategory === tagName)?.idCategory)
        .filter(Boolean);

      await mangaCategoryService.updateCategoriesToManga(id, categoryIds);

      toast.success("Cập nhật truyện thành công!");
      navigate(`/manga-detail-management/${id}`);

    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi cập nhật truyện!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Bạn có chắc muốn xóa truyện này?")) return;

    setIsSaving(true); // Dùng cùng trạng thái saving để disable UI nếu muốn
    try {
      const mangaCategoryService = new MangaCategoryService();
      const mangaService = new MangaService();

      // 1️⃣ Xóa hết thể loại
      await mangaCategoryService.updateCategoriesToManga(id, []);

      // 2️⃣ Xóa manga
      await mangaService.deleteManga(id);

      toast.success("Xóa truyện thành công!");
      navigate("/manga-management"); // điều hướng về danh sách manga
    } catch (err) {
      console.error("Xóa truyện lỗi:", err);
      toast.error("Xóa truyện thất bại!");
    } finally {
      setIsSaving(false);
    }
  };



  if (isLoading)
    return (
      <div className="fixed inset-0 bg-black/50 bg-opacity-60 flex items-center justify-center z-50">
        <Loader2 className="animate-spin text-white" size={48} />
      </div>
    );

  if (!formData.title)
    return <div className="text-red-400 text-center py-20">Không tìm thấy truyện!</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <Toaster position="top-right" />

      <EditMangaHeader
        onBack={() => navigate(-1)}
        onSave={handleSave}
        isSaving={isSaving}
      />

      <div className="max-w-5xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <ImageUploader
            cover={formData.cover}
            poster={formData.poster}
            onCoverChange={(e) => handleTempFileChange(e, "cover")}
            onPosterChange={(e) => handleTempFileChange(e, "poster")}
          />

          <div className="lg:col-span-2 space-y-7">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tên truyện
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg"
                placeholder="Nhập tên truyện..."
              />
            </div>

            <AuthorDropdown
              selected={formData.author}
              options={authors}
              onSelect={(author) => setFormData(prev => ({ ...prev, author }))}
            />

            <CategoryMultiSelect
              selected={formData.tags}
              categories={categories}
              onToggle={(categoryName) =>
                setFormData(prev => {
                  const newTags = prev.tags.includes(categoryName)
                    ? prev.tags.filter(t => t !== categoryName)
                    : [...prev.tags, categoryName];
                  return {
                    ...prev,
                    tags: newTags,
                  };
                })
              }
            />

            <DescriptionField
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
