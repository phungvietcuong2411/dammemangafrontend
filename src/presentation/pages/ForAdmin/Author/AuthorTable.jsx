// src/components/author-management/AuthorTable.jsx
export default function AuthorTable({ authors, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto text-left">
        <thead>
          <tr className="text-gray-300 text-sm border-b border-gray-800">
            <th className="sticky left-0 bg-gray-900/80 py-3 px-3 min-w-10 z-10">#</th>
            <th className="py-3 px-3 min-w-48">Tên tác giả</th>
            <th className="py-3 px-3 w-40 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.idAuthor} className="odd:bg-gray-900 even:bg-gray-800/60 hover:bg-gray-700/40 transition">
              <td className="sticky left-0 bg-gray-900/80 py-3 px-3 text-sm text-gray-300 z-10">
                {author.id}
              </td>
              <td className="py-3 px-3 text-sm font-medium">{author.nameAuthor}</td>
              <td className="py-3 px-3 text-sm">
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => onEdit(author)}
                    className="px-3 py-1 rounded-md border border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-100 text-xs transition"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => onDelete(author)}
                    className="px-3 py-1 rounded-md border border-red-700 bg-red-800/20 hover:bg-red-800/30 text-red-300 text-xs transition"
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>

          ))}
          {authors.length === 0 && (
            <tr>
              <td colSpan={3} className="py-6 text-center text-gray-400">
                Không có tác giả nào phù hợp.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}