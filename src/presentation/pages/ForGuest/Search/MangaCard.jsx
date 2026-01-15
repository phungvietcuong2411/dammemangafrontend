import React from "react";
import { BookOpen, Eye } from "lucide-react";

const MangaCard = ({ manga, onClick }) => {
  const id = manga.id || manga.id_manga;
  const title = manga.name || manga.nameManga || "Tên truyện";
  const author = manga.authorName || manga.author || "Đang cập nhật";
  const status = manga.status || "Đang cập nhật";
  const views = manga.countView ?? 0;
  const image = manga.posterUrl || manga.bannerUrl;

  return (
    <div
      onClick={() => onClick && id && onClick(id)}
      className="group h-full cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-xl shadow-md bg-gray-50 border border-gray-100">
        <div className="aspect-2/3 bg-linear-to-br from-gray-100 to-gray-200">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              Không có ảnh
            </div>
          )}
        </div>

        <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-800 border border-gray-200">
          {status}
        </span>
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="font-semibold text-gray-900 text-base leading-tight line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-1">{author}</p>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <BookOpen size={14} /> {status}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={14} /> {Number(views).toLocaleString("vi-VN")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MangaCard;
