import { BookOpenText, Eye } from "lucide-react";

function MangaStats({ stats }) {
  return (
    <div>
      <div className="text-xs font-bold text-gray-600 uppercase mb-3">Thống kê</div>
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="flex items-center gap-2">
            <BookOpenText size={16} className="text-gray-500" />
            <span className="text-xs text-gray-500">Số chương</span>
          </div>
          <div className="font-bold text-gray-800 mt-1">{stats.chaptersCount}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="flex items-center gap-2">
            <Eye size={16} className="text-gray-500" />
            <span className="text-xs text-gray-500">Lượt xem</span>
          </div>
          <div className="font-bold text-gray-800 mt-1">{stats.views}</div>
        </div>
      </div>
    </div>
  );
}

export default MangaStats;
