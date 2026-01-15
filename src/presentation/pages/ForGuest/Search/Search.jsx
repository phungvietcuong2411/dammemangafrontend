import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Loader2, Search as SearchIcon } from "lucide-react";
import MangaService from "../../../../usecases/MangaService";
import CategoryService from "../../../../usecases/CategoryService";
import MangaCategoryService from "../../../../usecases/MangaCategoryService";
import MangaCard from "./MangaCard";

const ITEMS_PER_PAGE = 15;

const Search = () => {
  const { query: queryParam } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const mangaService = useMemo(() => new MangaService(), []);
  const categoryService = useMemo(() => new CategoryService(), []);

  const [searchText, setSearchText] = useState(queryParam || "");
  const [mangas, setMangas] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRelationLoading, setIsRelationLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setSearchText(queryParam || "");
    setCurrentPage(1);
  }, [queryParam]);

  const fetchMangas = useCallback(
    async (categoryList = []) => {
      setIsLoading(true);
      try {
        const sanitizedCategories = Array.from(
          new Set(
            (categoryList || [])
              .map((name) => (typeof name === "string" ? name.trim() : ""))
              .filter(Boolean)
          )
        );

        const data =
          sanitizedCategories.length > 0
            ? await mangaService.getMangasByCategories(sanitizedCategories)
            : await mangaService.getAllMangas();
        setMangas(data || []);
      } catch (error) {
        console.error("Lỗi khi tải manga:", error);
        setMangas([]);
      } finally {
        setIsLoading(false);
      }
    },
    [mangaService]
  );

  const fetchCategoriesAndRelations = useCallback(async () => {
    try {
      const categoryRes = await categoryService.getAllCategories();
      setCategories(categoryRes || []);
    } catch (error) {
      console.error("Lỗi khi tải danh sách thể loại:", error);
      setIsRelationLoading(false);
    } finally {
      setIsRelationLoading(false);
    }
  }, [categoryService]);

  useEffect(() => {
    fetchCategoriesAndRelations();
  }, [fetchCategoriesAndRelations]);

  useEffect(() => {
    setCurrentPage(1);
    fetchMangas(selectedCategories);
  }, [fetchMangas, selectedCategories]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  const filteredMangas = useMemo(() => {
    const term = searchText.trim().toLowerCase();

    return (mangas || []).filter((manga) => {
      const title = (manga.name || manga.nameManga || "").toLowerCase();
      return term ? title.includes(term) : true;
    });
  }, [mangas, searchText]);

  const selectedCategoryNames = useMemo(
    () =>
      categories
        .filter((cat) => selectedCategories.includes(cat.nameCategory))
        .map((cat) => cat.nameCategory),
    [categories, selectedCategories]
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredMangas.length / ITEMS_PER_PAGE)
  );
  const pageNumbers = useMemo(() => {
    const maxButtons = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxButtons - 1);
    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }
    const pages = [];
    for (let i = start; i <= end; i += 1) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  const paginatedMangas = filteredMangas.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryToggle = (name) => {
    const normalized = typeof name === "string" ? name.trim() : "";
    if (!normalized) return;
    setSelectedCategories((prev) =>
      prev.includes(normalized)
        ? prev.filter((item) => item !== normalized)
        : [...prev, normalized]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    const trimmed = searchText.trim();
    if (trimmed) {
      navigate(`/search/${trimmed}`);
    } else {
      navigate("/search");
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 500, behavior: "smooth" });
    if (location.state && location.state.initialCategory) {
      const categoryName = location.state.initialCategory;
      setSelectedCategories([categoryName]);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <>
      <Helmet>
        <title>Tìm kiếm | DMManga</title>
      </Helmet>

      <div className="quicksand-uniquifier min-h-screen bg-gray-100 pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 border border-gray-100">
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                  Tìm kiếm
                </p>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Khám phá kho truyện
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <SearchIcon size={18} />
                </span>
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Nhập tên truyện bạn muốn tìm..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base bg-gray-50"
                />
              </form>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-gray-700">
                    Thể loại:
                  </span>
                  {(isLoading || isRelationLoading) && (
                    <span className="text-sm text-gray-500 flex items-center gap-2">
                      <Loader2 className="animate-spin" size={16} />
                      Đang tải...
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCategories([])}
                    className={`px-3 py-2 rounded-full border text-sm font-semibold transition ${
                      selectedCategories.length === 0
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-gray-100 text-gray-700 border-transparent hover:border-gray-200"
                    }`}
                  >
                    Tất cả
                  </button>

                  {categories.map((cat) => (
                    <button
                      key={cat.idCategory || cat.nameCategory}
                      type="button"
                      onClick={() => handleCategoryToggle(cat.nameCategory)}
                      className={`px-3 py-2 rounded-full border text-sm font-semibold transition flex items-center gap-2 ${
                        selectedCategories.includes(cat.nameCategory)
                          ? "bg-blue-100 text-blue-700 border-blue-200"
                          : "bg-gray-100 text-gray-800 border-transparent hover:border-gray-200"
                      }`}
                    >
                      <span>{cat.nameCategory}</span>
                      <span className="text-xs px-2 py-1 bg-white rounded-full border border-gray-200">
                        {cat.mangaCount ?? 0}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <span>
                  {selectedCategories.length === 0
                    ? "Mọi thể loại"
                    : `Đã lọc theo: ${
                        selectedCategoryNames.join(", ") ||
                        `${selectedCategories.length} thể loại`
                      }`}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {isLoading ? (
                  Array.from({ length: 10 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="h-80 bg-gray-100 rounded-xl animate-pulse border border-gray-200"
                    />
                  ))
                ) : paginatedMangas.length > 0 ? (
                  paginatedMangas.map((manga) => {
                    const mangaId = manga.id;
                    return (
                      <MangaCard
                        key={mangaId}
                        manga={manga}
                        onClick={(id) => navigate(`/mangas/${id}`)}
                      />
                    );
                  })
                ) : (
                  <div className="col-span-full text-center py-12 text-gray-600">
                    Không tìm thấy truyện phù hợp.
                  </div>
                )}
              </div>

              {filteredMangas.length > ITEMS_PER_PAGE && (
                <div className="flex flex-wrap justify-between items-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-lg border text-sm font-semibold transition ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:border-blue-300"
                    }`}
                  >
                    Trang trước
                  </button>

                  <div className="flex items-center gap-2">
                    {pageNumbers.map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg border text-sm font-semibold transition ${
                          currentPage === page
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 hover:border-blue-300"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-lg border text-sm font-semibold transition ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:border-blue-300"
                    }`}
                  >
                    Trang sau
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
