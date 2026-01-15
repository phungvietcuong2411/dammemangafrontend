// // src/components/dashboard/ChartsSection.jsx
// import React from "react";
// import { Line, Bar, Pie } from "react-chartjs-2";
// import { Eye, TrendingUp, BookOpen, Star } from "lucide-react";
// import { chartOptions } from "./chartConfig";

// const viewData = {
//   labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
//   datasets: [{
//     label: "Lượt xem",
//     data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
//     borderColor: "#10b981",
//     backgroundColor: "rgba(16, 185, 129, 0.1)",
//     fill: true,
//     tension: 0.4,
//   }],
// };

// const newUsersData = {
//   labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
//   datasets: [{
//     label: "Người dùng mới",
//     data: [120, 180, 250, 300, 420, 580],
//     backgroundColor: "#3b82f6",
//   }],
// };

// const newStoriesData = {
//   labels: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"],
//   datasets: [{
//     label: "Truyện mới",
//     data: [45, 62, 58, 71],
//     backgroundColor: "#8b5cf6",
//   }],
// };

// const topStories = [
//   { title: "One Piece", views: 892347 },
//   { title: "Attack on Titan", views: 765432 },
//   { title: "Jujutsu Kaisen", views: 654321 },
//   { title: "Demon Slayer", views: 543210 },
//   { title: "Solo Leveling", views: 432109 },
// ];

// const pieData = {
//   labels: topStories.map(s => s.title),
//   datasets: [{
//     data: topStories.map(s => s.views),
//     backgroundColor: ["#ef4444", "#f97316", "#f59e0b", "#10b981", "#3b82f6"],
//   }],
// };

// export default function ChartsSection() {
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//       <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
//         <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
//           <Eye className="text-emerald-400" size={18} /> Lượt xem theo ngày
//         </h3>
//         <div className="h-64"><Line data={viewData} options={chartOptions} /></div>
//       </div>

//       <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
//         <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
//           <TrendingUp className="text-blue-400" size={18} /> Người dùng mới
//         </h3>
//         <div className="h-64"><Bar data={newUsersData} options={chartOptions} /></div>
//       </div>

//       <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
//         <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
//           <BookOpen className="text-purple-400" size={18} /> Truyện mới đăng
//         </h3>
//         <div className="h-64"><Bar data={newStoriesData} options={chartOptions} /></div>
//       </div>

//       <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
//         <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
//           <Star className="text-yellow-400" size={18} /> Top truyện xem nhiều
//         </h3>
//         <div className="h-64">
//           <Pie data={pieData} options={{ ...chartOptions, plugins: { legend: { position: "right" } } }} />
//         </div>
//       </div>
//     </div>
//   );
// }