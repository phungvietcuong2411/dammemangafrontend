// src/components/common/SearchAndAddBar.jsx  ← Tạo chung để dùng lại
import { Link } from "react-router-dom";


export default function SearchAndAddBar({ query, onQueryChange, onAdd, placeholder = "Tìm kiếm..." }) {
  return (
    <div className="flex gap-3 items-center">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={placeholder}
          className="w-64 bg-gray-800 placeholder-gray-400 text-gray-100 rounded-md py-2.5 pl-4 pr-10 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>
      {onAdd && (
        <Link to= "/create-manga"
          onClick={onAdd}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-md font-medium shadow-sm transition"
        >
          Thêm truyện
        </Link>
      )}
    </div>
  );
}