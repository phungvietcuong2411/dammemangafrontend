// // src/components/dashboard/SystemManagement.jsx
// import React from "react";
// import { Server, AlertCircle } from "lucide-react";

// const systemInfo = {
//   serverStatus: "online",
//   imageStorage: { used: 2.4, total: 10 },
//   apiRequests: 124567,
//   recentErrors: [
//     { time: "14:32", message: "Timeout khi tải ảnh từ CDN" },
//     { time: "13:15", message: "User login failed (IP: 192.168.1.100)" },
//   ],
// };

// export default function SystemManagement() {
//   const usagePercent = (systemInfo.imageStorage.used / systemInfo.imageStorage.total) * 100;

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//       <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
//         <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
//           <Server className="text-cyan-400" size={18} /> Trạng thái hệ thống
//         </h3>
//         <div className="space-y-3">
//           <div className="flex items-center justify-between">
//             <span className="text-sm">Server</span>
//             <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-900/50 text-green-300">
//               Hoạt động
//             </span>
//           </div>
//           <div className="flex items-center justify-between">
//             <span className="text-sm">Dung lượng ảnh</span>
//             <span className="text-sm">
//               {systemInfo.imageStorage.used} / {systemInfo.imageStorage.total} GB
//               <span className="text-xs text-gray-400 ml-1">({usagePercent.toFixed(0)}%)</span>
//             </span>
//           </div>
//           <div className="w-full bg-gray-700 rounded-full h-2">
//             <div
//               className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all"
//               style={{ width: `${usagePercent}%` }}
//             />
//           </div>
//           <div className="flex items-center justify-between">
//             <span className="text-sm">API Request (24h)</span>
//             <span className="font-mono text-sm">{systemInfo.apiRequests.toLocaleString()}</span>
//           </div>
//         </div>
//       </div>

//       <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
//         <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
//           <AlertCircle className="text-orange-400" size={18} /> Log lỗi gần đây
//         </h3>
//         <div className="space-y-2 text-sm">
//           {systemInfo.recentErrors.map((err, i) => (
//             <div key={i} className="p-2 bg-red-900/20 border border-red-800/50 rounded">
//               <p className="text-red-300 text-xs">{err.time}</p>
//               <p className="text-red-200">{err.message}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }