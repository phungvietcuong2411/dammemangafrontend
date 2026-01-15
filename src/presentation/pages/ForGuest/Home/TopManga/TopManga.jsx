import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";

dayjs.extend(relativeTime);

export default function TopManga({ mangas }) {
  const scrollRefTopManga = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Kiểm tra vị trí scroll
  const checkScroll = useCallback(() => {
    if (!scrollRefTopManga.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRefTopManga.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  const scrollLeftTopManga = () => {
    scrollRefTopManga.current?.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRightTopManga = () => {
    scrollRefTopManga.current?.scrollBy({ left: 400, behavior: "smooth" });
  };

  // Theo dõi scroll + resize
  useEffect(() => {
    const container = scrollRefTopManga.current;
    if (!container) return;

    checkScroll(); // kiểm tra lần đầu

    const handleScroll = () => checkScroll();
    const handleResize = () => checkScroll();

    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [mangas, checkScroll]);

  return (
    <div className="w-full bg-[#9cafaa]">
      <div className="container max-w-[1280px] py-[80px] mx-auto">
        <h2 className="uppercase text-[1.25rem] font-bold mb-12">
          Truyện nổi bật
        </h2>

        <div className="relative">
          {/* Nút trái */}
          <button
            onClick={scrollLeftTopManga}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.opacity = canScrollLeft ? "0.3" : "0")
            }
            className="absolute left-[-30px] top-1/2 -translate-y-1/2 z-30
                       border border-gray-600 text-gray-600 bg-gray-200
                       hover:bg-blue-400 hover:border-blue-600 hover:text-white
                       p-4 rounded-full shadow-2xl transition-all duration-300"
            style={{ opacity: canScrollLeft ? 0.3 : 0 }}
            disabled={!canScrollLeft}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Nút phải */}
          <button
            onClick={scrollRightTopManga}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.opacity = canScrollRight ? "0.3" : "0")
            }
            className="absolute right-[-30px] top-1/2 -translate-y-1/2 z-30
                       border border-gray-600 text-gray-600 bg-gray-200
                       hover:bg-blue-400 hover:border-blue-600 hover:text-white
                       p-4 rounded-full shadow-2xl transition-all duration-300"
            style={{ opacity: canScrollRight ? 0.3 : 0 }}
            disabled={!canScrollRight}
          >
            <ChevronRight size={20} />
          </button>

          {/* Danh sách scroll */}
          <div
            ref={scrollRefTopManga}
            className="overflow-x-auto w-full scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            onScroll={checkScroll}
          >
            <div className="grid grid-rows-3 grid-flow-col gap-[15px] p-1">
              {mangas.map((manga, index) => (
                <Link
                  to={`/mangas/${manga.id}`}
                  key={manga.id}
                  className="relative flex items-center gap-3 p-4 bg-gray-100 rounded-xl md:w-[288px] lg:w-[384px] h-[117px]"
                >
                  <img
                    src={manga.posterUrl || "/placeholder.jpg"}
                    className="w-15 h-21 rounded-md object-cover"
                    alt={manga.name}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[18px] font-bold uppercase truncate">
                      {manga.name}
                    </p>
                    <p className="text-[13px] font-semibold text-gray-600 uppercase">
                      {dayjs(manga.updated_at).fromNow()}
                    </p>
                    <p className="text-[13px] text-gray-500 uppercase">
                      {manga.countView} LƯỢT XEM
                    </p>
                  </div>
                  <span className="text-[2.5rem] opacity-[0.1] font-bold text-black absolute top-[4px] right-[4px] leading-none">
                    {index + 1}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Xem thêm */}
        <div className="w-full flex mt-8">
          <Link
            to="/search"
            className="ml-auto font-semibold text-textPrimary hover:text-blue-300"
          >
            Xem danh sách truyện →
          </Link>
        </div>
      </div>
    </div>
  );
}
