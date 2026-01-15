// src/components/author-management/AuthorStats.jsx
export default function AuthorStats({ total, filtered }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
      <h2 className="text-lg font-medium">Danh sách tác giả</h2>
      <div className="text-sm text-gray-400">
        Tổng: <span className="font-semibold text-white">{total}</span> | 
        Hiển thị: <span className="font-semibold text-white">{filtered}</span> kết quả
      </div>
    </div>
  );
}