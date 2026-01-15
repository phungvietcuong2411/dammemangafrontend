import { MessageSquare } from "lucide-react";

function MangaComments({ comments, newComment, setNewComment, handleAddComment }) {
  return (
    <div>
      <div className="text-xs font-bold text-gray-600 uppercase mb-3">Nhận xét truyện</div>
      <div className="border border-gray-200 rounded-lg bg-gray-50 p-3 max-h-[250px] overflow-y-scroll">
        {comments.map((c) => (
          <div key={c.id} className="bg-white p-2 mb-2 rounded-lg border border-gray-100">
            <div className="font-semibold text-sm text-gray-700">{c.user}</div>
            <div className="text-sm text-gray-600">{c.text}</div>
            <div className="text-[11px] text-gray-400 mt-1">{c.date}</div>
          </div>
        ))}
      </div>

      {/* Form nhập */}
      <div className="flex items-center gap-2 mt-3">
        <input
          type="text"
          placeholder="Viết bình luận..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1"
        >
          <MessageSquare size={14} /> Gửi
        </button>
      </div>
    </div>
  );
}

export default MangaComments;
