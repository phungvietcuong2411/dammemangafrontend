import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function formatDate(dateString) {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("vi-VN");
}

export default function MangaRow({ story, index, onViewDetail }) {
  return (
    <tr className="border-b border-gray-800 hover:bg-gray-800/50 transition duration-200">
      <td className="sticky left-0 bg-gray-900/90 py-4 px-5 text-sm text-gray-300 font-medium">
        {index + 1}
      </td>

      <td className="py-4 px-5">
        <div className="flex items-center gap-4">
          <img
            src={story.cover}
            alt={story.title}
            className="w-12 h-16 object-cover rounded-md shadow-md border border-gray-700"
          />
          <div>
            <p className="font-semibold text-gray-100">{story.title}</p>
            <p className="text-xs text-gray-400 mt-0.5">{story.author}</p>
          </div>
        </div>
      </td>

      {/* Create At */}
      <td className="py-4 px-5 text-sm text-gray-300">
        {formatDate(story.createdAt)}
      </td>

      {/* Update At */}
      <td className="py-4 px-5 text-sm text-gray-300 text-center">
        {formatDate(story.updatedAt)}
      </td>

      <td className="py-4 px-5 text-center text-gray-200 font-medium">
        {story.chapters}
      </td>

      <td className="py-4 px-5 text-center text-gray-200">
        {(story.views ?? 0).toLocaleString("vi-VN")}
      </td>

      <td className="py-4 px-5 text-center">
        <Link
          to={`/manga-detail-management/${story.id}`}
          onClick={() => onViewDetail(story.id)}
          className="inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-blue-600/20 text-blue-400 hover:text-blue-300 transition"
          title="Xem chi tiết"
        >
          <ChevronRight size={18} />
        </Link>
      </td>
    </tr>
  );
}
