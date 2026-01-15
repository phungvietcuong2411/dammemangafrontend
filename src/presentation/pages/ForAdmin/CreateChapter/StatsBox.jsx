export default function StatsBox({ totalPages }) {
  return (
    <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 p-6 rounded-xl border border-green-700/50 text-center">
      <p className="text-sm text-gray-400">Tổng số trang</p>
      <p className="text-5xl font-bold text-green-400 mt-2">{totalPages}</p>
    </div>
  );
}