import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  CircleUserRound,
  Bell,
  User,
  Heart,
  History,
  Settings,
  LogOut,
} from "lucide-react";
import MangaService from "../../../usecases/MangaService";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [account, setAccount] = useState(localStorage.getItem("account") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showHeader, setShowHeader] = useState(true);
  const [mangaData, setMangaData] = useState([]);
  const navigate = useNavigate();

  // const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem("role") || "");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const storedAccount = localStorage.getItem("account");
    if (storedAccount) setAccount(storedAccount);
  }, []);

  // Nếu muốn Header tự cập nhật khi login/logout trong cùng tab
  useEffect(() => {
    const handleStorageChange = () => {
      setAccount(localStorage.getItem("account") || "");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const service = new MangaService();
        const mangas = await service.getAllMangas();
        setMangaData(mangas);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách manga:", error);
      }
    };
    fetchMangas();
  }, []);

  const filteredMangas = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    return mangaData.filter((manga) => {
      const name = (manga.name || "").toLowerCase();
      return name.includes(query);
    });
  }, [searchQuery, mangaData]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        // Cuộn xuống → ẩn header
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Cuộn lên → hiện lại header
        setShowHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Đóng dropdown & search khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: showHeader ? 0 : -80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="
        quicksand-uniquifier 
        bg-white/70 
        backdrop-blur-md 
        w-full 
        h-15
        flex 
        items-center 
        justify-between 
        px-40 
        border-b 
        border-gray-300 
        fixed 
        top-0 
        z-50
      "
    >
      {/* Logo */}
      <div className="flex items-center h-20">
        <Link to="/">
          <h1 className="text-2xl font-bold text-black">DMManga</h1>
        </Link>
      </div>

      {/* Icon group */}
      <div className="flex gap-2 relative items-center">
        {/* Search */}
        <div ref={searchRef} className="relative flex items-center">
          <div
            className="bg-gray-400 p-3 rounded-full hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search size={16} color="white" />
          </div>

          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-60 h-screen w-screen bg-black/50 backdrop-blur-sm flex flex-col pt-5 px-6"
                onClick={() => setIsSearchOpen(false)}
              >
                <motion.form
                  onSubmit={handleSearchSubmit}
                  onClick={(e) => e.stopPropagation()}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-full max-w-5xl bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col md:flex-row items-center gap-3 p-4 mx-auto"
                >
                  <div className="flex-1 w-full flex items-center gap-3">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-base md:text-lg p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Tìm kiếm truyện"
                      autoFocus
                    />
                  </div>
                  <button
                    type="button"
                    className="text-sm font-semibold text-blue-600 hover:text-blue-500 whitespace-nowrap cursor-pointer"
                    onClick={() => {
                      setSearchQuery("");
                      setIsSearchOpen(false);
                      navigate(`/search`);
                    }}
                  >
                    Tìm kiếm nâng cao
                  </button>
                </motion.form>
                {searchQuery && (
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-full max-w-5xl my-3 mx-auto rounded-xl bg-white border border-gray-200 shadow-md"
                  >
                    <div className="p-4 flex flex-wrap gap-2">
                      {filteredMangas.length > 0 ? (
                        filteredMangas.slice(0, 4).map((manga) => {
                          return (
                            <div
                              key={manga.id}
                              onClick={() => {
                                setSearchQuery("");
                                navigate(`/manga/${manga.id}`);
                              }}
                              className="w-full border h-24 p-2 border-gray-300 rounded-md px-3 flex gap-10 text-sm font-medium text-gray-800 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                            >
                              <img
                                src={manga.posterUrl || ""}
                                alt={manga.name}
                                className="w-12 h-full rounded-md object-cover"
                              />
                              <div className="ml-2 flex items-start flex-col gap-1">
                                <span className="block font-bold text-lg">
                                  {manga.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {manga.authorName || ""}
                                </span>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-sm text-gray-600">
                          Không tìm thấy truyện phù hợp.
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notification */}
        <div className="bg-gray-400 p-3 rounded-full hover:bg-gray-600 transition-colors duration-200 cursor-pointer">
          <Bell size={16} color="white" />
        </div>

        {/* User Dropdown */}
        <div
          className="bg-gray-400 p-3 rounded-full hover:bg-gray-600 transition-colors duration-200 cursor-pointer relative"
          ref={dropdownRef}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <CircleUserRound size={16} color="white" />
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-3 right-0 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
              >
                <div className="flex items-center gap-3 px-4 py-3 border-b dark:border-gray-700">
                  <User className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white text-sm">
                      {account || "Guest"}
                    </p>
                  </div>
                </div>

                <Link
                  to="/follow"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-200"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Heart className="w-4 h-4 text-pink-600" />
                  Danh sách theo dõi
                </Link>

                <Link
                  to="/history"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-200"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <History className="w-4 h-4 text-blue-600" />
                  Lịch sử đọc truyện
                </Link>

                <Link
                  to="/settings"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-200"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Settings className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  Thiết lập
                </Link>

                {role === "admin" && (
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <User className="w-4 h-4 text-green-600" />
                    Quản lý
                  </Link>
                )}

                <div className="border-t border-gray-100 dark:border-gray-700 mt-1">
                  {account && account !== "Guest" ? (
                    <Link
                      to="/login"
                      className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 w-full text-sm transition"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        localStorage.removeItem("account");
                        localStorage.removeItem("token");
                        localStorage.removeItem("role");
                        localStorage.removeItem("user");
                        localStorage.removeItem("userId");
                        setAccount("");
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      Đăng xuất
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      className="flex items-center gap-3 px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 w-full text-sm transition"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      Đăng nhập
                    </Link>
                  )}
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default Header;
