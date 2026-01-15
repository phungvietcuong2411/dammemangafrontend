import { BookOpenText, Eye } from "lucide-react";

export default function StatsCard({ chapters, views }) {
  return (
    <div>
      <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">
        Thống kê
      </h3>
      <div className="grid gap-4">
        <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <BookOpenText size={20} className="text-blue-400" />
            <span className="text-sm text-gray-400">Số chương</span>
          </div>
          <div className="text-2xl font-bold text-white mt-2">{chapters}</div>
        </div>
        <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <Eye size={20} className="text-green-400" />
            <span className="text-sm text-gray-400">Lượt xem</span>
          </div>
          <div className="text-2xl font-bold text-white mt-2">
            {(views / 1000).toFixed(1)}K
          </div>
        </div>
      </div>
    </div>
  );
}