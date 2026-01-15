// // src/components/dashboard/HomeSlidesManager.jsx
// import React from "react";
// import { Image } from "lucide-react";

// const homeSlides = [
//   { id: 1, title: "One Piece - Arc Wano", active: true },
//   { id: 2, title: "Jujutsu Kaisen Season 2", active: true },
//   { id: 3, title: "Solo Leveling Anime", active: false },
// ];

// export default function HomeSlidesManager() {
//   return (
//     <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
//       <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
//         <Image className="text-indigo-400" size={18} /> Quản lý Slide Trang chủ
//       </h3>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//         {homeSlides.map((slide) => (
//           <div
//             key={slide.id}
//             className={`p-4 rounded-lg border ${
//               slide.active
//                 ? "bg-green-900/20 border-green-700"
//                 : "bg-gray-900/50 border-gray-700"
//             }`}
//           >
//             <p className="font-medium">{slide.title}</p>
//             <p className="text-xs mt-1">
//               Trạng thái: <span className={slide.active ? "text-green-400" : "text-gray-400"}>
//                 {slide.active ? "Hiển thị" : "Ẩn"}
//               </span>
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }