import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MangaService from "../../../../../usecases/MangaService"; // đường dẫn theo project của bạn

export default function MangaList({
  mangaData,
  title,
  colorBackground,
  category,
}) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  //const [mangaData, setMangaData] = useState([]);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 400, behavior: "smooth" });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    checkScroll();
    const handle = () => checkScroll();
    container.addEventListener("scroll", handle);
    window.addEventListener("resize", checkScroll);

    return () => {
      container.removeEventListener("scroll", handle);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const handleMangaClick = (id) => navigate(`/mangas/${id}`);

  return (
    <div className={`quicksand-uniquifier min-h-screen ${colorBackground}`}>
      <div className="container max-w-[1280px] mx-auto py-16">
        <h2 className="uppercase text-2xl font-bold text-gray-800 mb-12 text-center md:text-left">
          {title}
        </h2>

        <div className="relative">
          {/* Nút trái */}
          <button
            onClick={scrollLeft}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.opacity = canScrollLeft ? "0.3" : "0")
            }
            className="absolute left-[-30px] top-1/2 -translate-y-1/2 z-30 border border-gray-600 text-gray-600 bg-gray-200 hover:bg-blue-400 hover:border-blue-600 hover:text-blue-600 p-4 rounded-full shadow-2xl transition-all duration-300"
            style={{ opacity: canScrollLeft ? 0.3 : 0 }}
            aria-label="Cuộn trái"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Nút phải */}
          <button
            onClick={scrollRight}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.opacity = canScrollRight ? "0.3" : "0")
            }
            className="absolute right-[-30px] top-1/2 -translate-y-1/2 z-30 border border-gray-600 text-gray-600 bg-gray-200 hover:bg-blue-400 hover:border-blue-600 hover:text-blue-600 p-4 rounded-full shadow-2xl transition-all duration-300"
            style={{ opacity: canScrollRight ? 0.3 : 0 }}
            aria-label="Cuộn phải"
          >
            <ChevronRight size={16} />
          </button>

          <div
            ref={scrollRef}
            className="hide-scrollbar scroll-smooth"
            style={{ overflowX: "hidden" }}
            onScroll={checkScroll}
          >
            <div className="grid grid-rows-2 grid-flow-col gap-4 py-2 px-1 min-w-max">
              {mangaData.map((manga) => (
                <div
                  key={manga.id}
                  onClick={() => handleMangaClick(manga.id)}
                  className="lg:w-[160px] md:w-[140px] w-[120px] cursor-pointer group/item transition-all duration-300"
                >
                  <div className="relative overflow-hidden rounded-[10px] shadow-md hover:shadow-xl transition-shadow">
                    <img
                      src={manga.posterUrl || manga.bannerUrl}
                      alt={manga.name || manga.nameManga}
                      className="aspect-[2/3] w-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300" />
                  </div>

                  <div className="mt-3">
                    <p className="font-bold text-sm text-gray-800 line-clamp-2 leading-tight">
                      {manga.name || manga.nameManga}
                    </p>
                    <p className="text-xs text-gray-600 mt-1 font-medium">
                      {manga.latestChapter || "Chap mới"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-end">
          <button
            onClick={() =>
              navigate("/search", { state: { initialCategory: category } })
            }
            className="ml-auto font-semibold text-textPrimary hover:text-blue-300"
          >
            Xem danh sách truyện
          </button>
        </div>
      </div>
    </div>
  );
}
