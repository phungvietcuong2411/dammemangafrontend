// // src/components/dashboard/Header.jsx
// import React from "react";
// import { RefreshCw } from "lucide-react";

// export default function Header({ isRefreshing, onRefresh }) {
//   return (
//     <div className="flex items-center justify-between">
//       <h1 className="text-3xl font-bold">Dashboard</h1>
//       <button
//         onClick={onRefresh}
//         className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
//           isRefreshing
//             ? "bg-gray-700 border-gray-600 text-gray-300"
//             : "bg-gray-800 border-gray-700 hover:bg-gray-700"
//         }`}
//         disabled={isRefreshing}
//       >
//         <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
//         <span className="text-sm">Làm mới</span>
//       </button>
//     </div>
//   );
// }