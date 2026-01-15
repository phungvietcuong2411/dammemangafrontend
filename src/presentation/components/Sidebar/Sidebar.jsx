// Sidebar.jsx – ALL-IN-ONE – HOÀN HẢO TUYỆT ĐỐI (FIXED 100%)
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  LogOut,
  House,
  PanelRight,
  ChevronDown,
} from "lucide-react";
import "../../../styles/font.css";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  {
    id: "stories",
    label: "Quản Lý Truyện",
    icon: BookOpen,
    submenu: [
      { id: "truyen", label: "Truyện", path: "/manga-management" },
      { id: "tac-gia", label: "Tác Giả", path: "/author-management" },
      { id: "the-loai", label: "Thể Loại", path: "/tag-management" },
    ],
  },
  { id: "users", label: "Quản Lý User", icon: Users, path: "/user-management" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedSubmenu, setExpandedSubmenu] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Auto detect active menu + expand submenu
  useEffect(() => {
    let foundMain = null;
    let foundSub = null;

    for (const item of menuItems) {
      if (item.path === currentPath) {
        foundMain = item.id;
        break;
      }
      if (item.submenu) {
        const activeSub = item.submenu.find(s => s.path === currentPath);
        if (activeSub) {
          foundMain = item.id;
          foundSub = activeSub.id;
          break;
        }
      }
    }

    setExpandedSubmenu(foundSub ? foundMain : null);
  }, [currentPath]);

  const toggleSubmenu = (itemId) => {
    setExpandedSubmenu(expandedSubmenu === itemId ? null : itemId);
  };

  const handleLogout = () => {
    localStorage.clear(); // hoặc xóa từng item như cũ
    navigate("/login");
  };

  const isMainActive = (item) => {
    if (item.path && currentPath === item.path) return true;
    if (item.submenu && expandedSubmenu === item.id) return true;
    return false;
  };

  return (
    <div className={`bg-gray-800 text-gray-200 transition-all duration-300 flex flex-col min-h-screen shadow-xl quicksand-uniquifier z-50 ${isOpen ? "w-64" : "w-16"}`}>
      
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        {isOpen && <div className="text-xl font-bold text-white">DMManga</div>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-700 transition-all"
        >
          <PanelRight size={20} className={`transition-transform ${!isOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {menuItems.map((item) => (
          <div key={item.id}>
            {/* MAIN MENU ITEM */}
            {item.path ? (
              // Có path → dùng Link
              <Link
                to={item.path}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all text-sm group
                  ${isMainActive(item) ? "bg-gray-700 border-l-4 border-white" : "hover:bg-gray-700"}
                  ${!isOpen && "justify-center"}`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} className="flex-shrink-0" />
                  {isOpen && <span className="font-medium">{item.label}</span>}
                </div>
                {isOpen && item.submenu && (
                  <ChevronDown size={16} className={`transition-transform ${expandedSubmenu === item.id ? "rotate-180" : ""}`} />
                )}
              </Link>
            ) : (
              // Không có path → chỉ toggle submenu
              <button
                onClick={() => toggleSubmenu(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all text-sm
                  ${isMainActive(item) ? "bg-gray-700 border-l-4 border-white" : "hover:bg-gray-700"}
                  ${!isOpen && "justify-center"}`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} className="flex-shrink-0" />
                  {isOpen && <span className="font-medium">{item.label}</span>}
                </div>
                {isOpen && item.submenu && (
                  <ChevronDown size={16} className={`transition-transform ${expandedSubmenu === item.id ? "rotate-180" : ""}`} />
                )}
              </button>
            )}

            {/* SUBMENU */}
            {item.submenu && isOpen && expandedSubmenu === item.id && (
              <div className="bg-gray-700/30 mt-1 rounded-lg overflow-hidden">
                {item.submenu.map((sub) => (
                  <Link
                    key={sub.id}
                    to={sub.path}
                    className={`block px-4 py-2.5 pl-14 text-sm transition-colors
                      ${currentPath === sub.path
                        ? "text-white font-semibold bg-gray-700 border-l-4 border-white"
                        : "text-gray-300 hover:bg-gray-600"}`}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-700 p-4">
        {isOpen ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                A
              </div>
              <p className="text-sm font-medium text-white">Admin User</p>
            </div>

            <button onClick={() => navigate("/")} className="flex items-center gap-2 text-sm hover:bg-gray-700 p-2 rounded-lg transition-all text-white">
              <House size={18} />
              <span>Trang chủ</span>
            </button>

            <button onClick={handleLogout} className="flex items-center gap-2 text-sm hover:bg-gray-700 p-2 rounded-lg transition-all text-red-400 hover:text-red-300">
              <LogOut size={18} />
              <span>Đăng xuất</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <button onClick={() => navigate("/")} className="p-2 hover:bg-gray-700 rounded-lg transition-all text-white">
              <House size={22} />
            </button>
            <button onClick={handleLogout} className="p-2 hover:bg-gray-700 rounded-lg transition-all text-red-400">
              <LogOut size={22} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}