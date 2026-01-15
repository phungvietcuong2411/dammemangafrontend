// src/components/manga-management/MangaTable.jsx
import React from "react";
import MangaRow from "./MangaRow";

export default function MangaTable({
  stories,
  currentPage,
  itemsPerPage,
  onViewDetail,
}) {
  return (
    <table className="w-full">
      <thead className="bg-gray-800/70 border-b border-gray-700">
        <tr className="text-left text-sm text-gray-300">
          <th className="sticky left-0 bg-gray-800/90 py-4 px-5 font-medium">
            #
          </th>
          <th className="py-4 px-5 min-w-56 font-medium">Tên truyện</th>
          <th className="py-4 px-5 min-w-30 font-medium">Thời gian tạo</th>
          <th className="py-4 px-5 text-center font-medium">Thời gian cập nhật</th>
          <th className="py-4 px-5 text-center font-medium">Chapter</th>
          <th className="py-4 px-5 text-center font-medium">Lượt xem</th>
          <th className="py-4 px-5 text-center font-medium">Chi tiết</th>
        </tr>
      </thead>
      <tbody>
        {stories.map((story, index) => (
          <MangaRow
            key={story.id}
            story={story}
            index={(currentPage - 1) * itemsPerPage + index}
            onViewDetail={onViewDetail}
          />
        ))}
        {stories.length === 0 && (
          <tr>
            <td colSpan={6} className="py-12 text-center text-gray-500">
              Không tìm thấy truyện nào.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
