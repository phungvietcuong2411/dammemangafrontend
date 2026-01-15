import { ChevronDown, Check, Search } from "lucide-react";
import { useState, useMemo, useEffect } from "react";

export default function AuthorDropdown({ selected, options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const filteredOptions = useMemo(() => {
    if (!searchText) return options;
    return options.filter(opt =>
      opt.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, options]);

  useEffect(() => {
    console.log("Danh sách tác giả hiển thị:");
    filteredOptions.forEach(opt => console.log(`ID: ${opt.id}, Name: ${opt.name}`));
  }, [filteredOptions]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">Tác giả</label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-left flex justify-between items-center hover:border-gray-600 transition"
        >
          <span className={selected ? "text-white" : "text-gray-500"}>
            {selected?.name || "Chọn tác giả..."}
          </span>
          <ChevronDown size={18} className="text-gray-400" />
        </button>

        {isOpen && (
          <div className="absolute z-20 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl max-h-64 overflow-y-auto">
            
            <div className="px-3 py-2">
              <div className="relative">
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Tìm tác giả..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>

            {filteredOptions.length > 0 ? (
              filteredOptions.map((author) => (
                <button
                  key={author.id}
                  onClick={() => { 
                    onSelect(author); 
                    setIsOpen(false); 
                    setSearchText(""); 
                    console.log("Tác giả được chọn:", author); 
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-700 flex justify-between items-center transition"
                >
                  {author.name}
                  {selected?.id === author.id && <Check size={16} className="text-green-400" />}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-400">Không tìm thấy tác giả</div>
            )}
          </div>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-1">Quản lý tác giả tại trang riêng.</p>
    </div>
  );
}
