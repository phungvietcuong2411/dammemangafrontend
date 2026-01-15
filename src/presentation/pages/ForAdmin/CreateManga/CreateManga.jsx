// src/pages/AddManga.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import MangaService from "../../../../usecases/MangaService";
import AuthorService from "../../../../usecases/AuthorService";
import CategoryService from "../../../../usecases/CategoryService";
import MangaCategoryService from "../../../../usecases/MangaCategoryService";
import UploadImageService from "../../../../usecases/UploadImageService";

import CreateMangaHeader from "./CreateMangaHeader";
import ImageUploader from "../EditManga/ImageUploader";
import AuthorDropdown from "../EditManga/AuthorDropdown";
import CategoryMultiSelect from "../EditManga/CategoryMultiSelect";
import DescriptionField from "../EditManga/DescriptionField";

export default function AddManga() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: null, // object {id, name}
    tags: [],
    description: "",
    cover: "",
    poster: "",
  });

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tempFiles, setTempFiles] = useState({ cover: null, poster: null });
  const now = new Date().toISOString();

  const uploadService = new UploadImageService();

  // Load authors & categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const authorList = await new AuthorService().getAllAuthors();
        setAuthors(authorList.map(a => ({ id: a.idAuthor, name: a.nameAuthor })));

        const categoryList = await new CategoryService().getAllCategories();
        setCategories(categoryList);
      } catch (err) {
        console.error(err);
        toast.error("Lỗi khi tải dữ liệu!");
      }
    };
    fetchData();
  }, []);

  // Thay đổi ảnh tạm
  const handleTempFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setTempFiles(prev => ({ ...prev, [type]: file }));
    setFormData(prev => ({ ...prev, [type]: URL.createObjectURL(file) }));
  };

  // Upload ảnh thật
  const uploadImageToBackend = async (file, type) => {
    try {
      const url = await uploadService.uploadImage(file);
      toast.success(`${type === "cover" ? "Cover" : "Poster"} upload thành công!`);
      return url;
    } catch (err) {
      console.error(err);
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
      // 1️⃣ Upload ảnh nếu có
      let coverUrl = formData.cover;
      let posterUrl = formData.poster;

      if (tempFiles.cover) {
        coverUrl = await uploadImageToBackend(tempFiles.cover, "cover");
      }
      if (tempFiles.poster) {
        posterUrl = await uploadImageToBackend(tempFiles.poster, "poster");
      }

      // 2️⃣ Tạo manga mới
      const mangaService = new MangaService();
      const mangaCategoryService = new MangaCategoryService();

      const payload = {
        nameManga: formData.title,
        author: { idAuthor: formData.author.id },
        description: formData.description,
        posterUrl: coverUrl,
        bannerUrl: posterUrl,
        status: "đang tiến hành",
        countView: 0,
      };

      const createdManga = await mangaService.createManga(payload);

      // 3️⃣ Lấy ID manga vừa tạo từ DTO
      const mangaId = createdManga.id; // ✅ Dùng đúng field DTO

      // 4️⃣ Gắn thể loại nếu có
      const categoryIds = formData.tags
        .map(tagName => categories.find(c => c.nameCategory === tagName)?.idCategory)
        .filter(Boolean);

      if (categoryIds.length > 0) {
        await mangaCategoryService.updateCategoriesToManga(mangaId, categoryIds);
      }

      toast.success("Thêm truyện thành công!");
      navigate(`/manga-detail-management/${mangaId}`);
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi thêm truyện!");
    } finally {
      setIsSaving(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <Toaster position="top-right" />

      <CreateMangaHeader
        onBack={() => navigate(-1)}
        onSave={handleSave}
        isSaving={isSaving}
      />

      <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ImageUploader
          cover={formData.cover}
          poster={formData.poster}
          onCoverChange={(e) => handleTempFileChange(e, "cover")}
          onPosterChange={(e) => handleTempFileChange(e, "poster")}
        />

        <div className="lg:col-span-2 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tên truyện</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Nhập tên truyện..."
            />
          </div>

          <AuthorDropdown
            selected={formData.author}
            options={authors}
            onSelect={author => setFormData(prev => ({ ...prev, author }))}
          />

          <CategoryMultiSelect
            selected={formData.tags}
            categories={categories}
            onToggle={tagName => setFormData(prev => ({
              ...prev,
              tags: prev.tags.includes(tagName)
                ? prev.tags.filter(t => t !== tagName)
                : [...prev.tags, tagName]
            }))}
          />

          <DescriptionField
            value={formData.description}
            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>
      </div>
    </div>
  );
}
