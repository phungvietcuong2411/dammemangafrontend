export default function SearchAndAddBar({ query, onQueryChange, onAdd }) {
  return (
    <div className="flex gap-3 items-center">
      <div className="relative">
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="w-64 bg-gray-800 placeholder-gray-400 text-gray-100 rounded-md py-2 pl-3 pr-10 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
          placeholder="Tìm theo tên tác giả..."
        />
      </div>
      <button
        onClick={onAdd}
        className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-100 px-4 py-2 rounded-md shadow-sm border border-gray-700 transition"
      >
        Thêm tác giả
      </button>
    </div>
  );
}