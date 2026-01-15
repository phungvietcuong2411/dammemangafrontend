import { ChevronDown, Check, Search } from "lucide-react";
import { useState, useMemo } from "react";

export default function CategoryMultiSelect({ selected, categories, onToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const uniqueSelected = [...new Set(selected)];

  const filteredOptions = useMemo(() => {
    if (!searchText) return categories;
    return categories.filter((c) =>
      c.nameCategory.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, categories]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">Thể loại</label>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-left flex justify-between items-center hover:border-gray-600 transition"
        >
          <span className={uniqueSelected.length > 0 ? "text-white" : "text-gray-500"}>
            {uniqueSelected.length > 0
              ? `${uniqueSelected.length} thể loại đã chọn`
              : "Chọn thể loại..."}
          </span>
          <ChevronDown size={18} className="text-gray-400" />
        </button>

        {isOpen && (
          <div className="absolute z-20 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl max-h-64 overflow-y-auto">
            {/* Search */}
            <div className="px-3 py-2">
              <div className="relative">
                <input
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Tìm thể loại..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
                <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>

            {/* Danh sách category */}
            {filteredOptions.length > 0 ? (
              filteredOptions.map((c) => (
                <button
                  key={c.idCategory}    
                  onClick={() => {
                    onToggle(c.nameCategory);
                    setSearchText("");
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-700 flex justify-between items-center"
                >
                  {c.nameCategory}
                  {uniqueSelected.includes(c.nameCategory) && (
                    <Check size={16} className="text-green-400" />
                  )}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-400">Không tìm thấy thể loại</div>
            )}
          </div>
        )}
      </div>

      {/* Tag đã chọn */}
      <div className="flex flex-wrap gap-2 mt-3">
        {uniqueSelected.map((name) => {
          const categoryObj = categories.find((c) => c.nameCategory === name);

          return (
            <span
              key={categoryObj?.idCategory || name}   // 🔥 FIX: fallback nếu không tìm thấy
              className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-xs"
            >
              {name}
            </span>
          );
        })}
      </div>

      <p className="text-xs text-gray-500 mt-1">Quản lý thể loại tại trang riêng.</p>
    </div>
  );
}
