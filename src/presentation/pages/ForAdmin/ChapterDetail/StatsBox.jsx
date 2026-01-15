// src/components/common/StatsBox.jsx  ← Đặt ở common để dùng chung!
export default function StatsBox({ totalPages, variant = "create" }) {
  const bgGradient = variant === "create" 
    ? "from-green-900/50 to-emerald-900/50 border-green-700/50" 
    : "from-blue-900/50 to-indigo-900/50 border-blue-700/50";

  const textColor = variant === "create" ? "text-green-400" : "text-blue-400";

  return (
    <div className={`bg-gradient-to-br ${bgGradient} p-6 rounded-xl border text-center shadow-lg`}>
      <p className="text-sm text-gray-400">Tổng số trang</p>
      <p className={`text-5xl font-bold ${textColor} mt-2`}>{totalPages}</p>
    </div>
  );
}