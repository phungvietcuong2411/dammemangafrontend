// // src/components/dashboard/StatsCards.jsx
// import React from "react";
// import { BookOpen, Tags, Users, Star, Eye } from "lucide-react";

// const statsData = [
//   { label: "Tổng truyện", value: 2847, icon: BookOpen, color: "from-blue-500 to-blue-600" },
//   { label: "Thể loại", value: 24, icon: Tags, color: "from-purple-500 to-purple-600" },
//   { label: "Tác giả", value: 512, icon: Users, color: "from-green-500 to-green-600" },
//   { label: "Người dùng", value: 12843, icon: Users, color: "from-yellow-500 to-yellow-600" },
//   { label: "Đánh giá", value: 45291, icon: Star, color: "from-pink-500 to-pink-600" },
//   { label: "Lượt xem", value: "8,923,471", icon: Eye, color: "from-red-500 to-red-600" },
// ];

// export default function StatsCards() {
//   return (
//     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//       {statsData.map((stat, i) => (
//         <div
//           key={i}
//           className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow"
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-xs text-gray-400">{stat.label}</p>
//               <p className="text-2xl font-bold mt-1">{stat.value}</p>
//             </div>
//             <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
//               <stat.icon size={20} className="text-white" />
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }