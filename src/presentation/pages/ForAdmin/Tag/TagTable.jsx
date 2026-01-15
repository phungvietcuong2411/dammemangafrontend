// TagTable.jsx
export default function TagTable({ genres, onEdit, onDelete, truncate }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto text-left">
        <thead>
          <tr className="text-gray-300 text-sm border-b border-gray-800">
            <th className="sticky left-0 bg-gray-900/80 py-3 px-3 min-w-10 z-10">#</th>
            <th className="py-3 px-3 min-w-32">Tên</th>
            <th className="py-3 px-3 min-w-64">Mô tả</th>
            <th className="py-3 px-3 w-40 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {genres.map((g) => (
            <tr key={g.id} className="odd:bg-gray-900 even:bg-gray-800/60 hover:bg-gray-700/40 transition">
              <td className="sticky left-0 bg-gray-900/80 py-3 px-3 text-sm text-gray-300 z-10">{g.id}</td>
              <td className="py-3 px-3 text-sm font-medium">{g.name}</td>
              <td className="py-3 px-3 text-sm text-gray-300">{truncate(g.description)}</td>
              <td className="py-3 px-3 text-sm">
                <div className="flex gap-2 justify-center">
                  <button onClick={() => onEdit(g)} className="px-3 py-1 rounded-md border border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-100 text-xs">
                    Sửa
                  </button>
                  <button onClick={() => onDelete(g.id)} className="px-3 py-1 rounded-md border border-red-700 bg-red-800/20 hover:bg-red-800/30 text-red-300 text-xs">
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {genres.length === 0 && (
            <tr><td colSpan={4} className="py-6 text-center text-gray-400">Không có thể loại nào phù hợp.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}