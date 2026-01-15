// // src/components/dashboard/ContentHighlights.jsx
// import React from "react";
// import { Eye, RefreshCw, MessageSquare, Heart, Star } from "lucide-react";

// const topStories = [
//   { rank: 1, title: "One Piece", views: 892347, rating: 4.9 },
//   { rank: 2, title: "Attack on Titan", views: 765432, rating: 4.8 },
//   { rank: 3, title: "Jujutsu Kaisen", views: 654321, rating: 4.7 },
//   { rank: 4, title: "Demon Slayer", views: 543210, rating: 4.6 },
//   { rank: 5, title: "Solo Leveling", views: 432109, rating: 4.9 },
// ];

// const recentStories = [
//   { id: 1, title: "Chương 1050: Kết thúc hành trình", updated: "2 giờ trước" },
//   { id: 2, title: "Chương 89: Cuộc chiến cuối cùng", updated: "5 giờ trước" },
//   { id: 3, title: "Chương 12: Bí mật bị phanh phui", updated: "1 ngày trước" },
// ];

// const recentComments = [
//   { user: "manga_fan123", story: "One Piece", comment: "Chương này đỉnh cao!", time: "10 phút trước" },
//   { user: "otaku_kun", story: "JJK", comment: "Gojo comeback khi nào?", time: "25 phút trước" },
//   { user: "reader99", story: "Solo Leveling", comment: "Tác giả vẽ đẹp quá!", time: "1 giờ trước" },
// ];

// export default function ContentHighlights() {
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//       {/* Top truyện xem nhiều */}
//       <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
//         <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
//           <Eye className="text-red-400" size={18} /> Top truyện xem nhiều
//         </h3>
//         <div className="space-y-2">
//           {topStories.map((story) => (
//             <div key={story.rank} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
//               <div className="flex items-center gap-3">
//                 <span className="text-2xl font-bold text-gray-500 w-8">#{story.rank}</span>
//                 <div>
//                   <p className="font-medium">{story.title}</p>
//                   <p className="text-xs text-gray-400">{story.views.toLocaleString()} lượt xem</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-1 text-yellow-400">
//                 <Star size={14} fill="currentColor" />
//                 <span className="text-sm font-medium">{story.rating}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Truyện mới cập nhật */}
//       <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
//         <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
//           <RefreshCw className="text-green-400" size={18} /> Truyện mới cập nhật
//         </h3>
//         <div className="space-y-2">
//           {recentStories.map((story) => (
//             <div key={story.id} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
//               <div>
//                 <p className="font-medium">{story.title}</p>
//                 <p className="text-xs text-gray-400">{story.updated}</p>
//               </div>
//               <span className="text-xs bg-green-900/50 text-green-300 px-2 py-1 rounded">Mới</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Bình luận mới nhất */}
//       <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
//         <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
//           <MessageSquare className="text-blue-400" size={18} /> Bình luận mới nhất
//         </h3>
//         <div className="space-y-2">
//           {recentComments.map((c, i) => (
//             <div key={i} className="p-3 bg-gray-900/50 rounded-lg">
//               <p className="text-sm font-medium">{c.user}</p>
//               <p className="text-xs text-gray-400">trong <i>{c.story}</i></p>
//               <p className="text-sm mt-1">"{c.comment}"</p>
//               <p className="text-xs text-gray-500 mt-1">{c.time}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Top yêu thích */}
//       <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
//         <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
//           <Heart className="text-pink-400" size={18} /> Top truyện được yêu thích
//         </h3>
//         <div className="space-y-2">
//           {topStories.slice(0, 3).map((s, i) => (
//             <div key={i} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
//               <div className="flex items-center gap-2">
//                 <Heart size={16} fill="#ec4899" className="text-pink-500" />
//                 <span className="font-medium">{s.title}</span>
//               </div>
//               <span className="text-xs text-gray-400">{(s.views / 1000).toFixed(1)}K lượt thích</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }