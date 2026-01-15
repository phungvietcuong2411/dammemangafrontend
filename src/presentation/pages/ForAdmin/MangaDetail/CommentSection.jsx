export default function CommentSection({ comments }) {
  return (
    <div>
      <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">
        Nhận xét truyện
      </h3>
      <div className="border border-gray-700 rounded-lg bg-gray-900/80 p-4 max-h-64 overflow-y-auto space-y-3">
        {comments.map((c) => (
          <div key={c.id} className="bg-gray-800/70 p-4 rounded-lg border border-gray-700">
            <div className="font-bold text-sm text-yellow-400">{c.user}</div>
            <div className="text-sm text-gray-300 mt-1">{c.text}</div>
            <div className="text-xs text-gray-500 mt-2">{c.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}