import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import SlideItem from "./SlideItems";
import SlideNavigation from "./SlideNavigation";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function SlideShow({ bannerData }) {
  if (!bannerData || bannerData.length === 0) {
    return null;
  }

  return (
    <div className="quicksand-uniquifier relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden group">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        pagination={{
          clickable: true,
          bulletClass: `swiper-pagination-bullet !bg-white !opacity-60`,
          bulletActiveClass: `!bg-gray-400 !opacity-100 !scale-125`,
        }}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        className="h-full"
      >
        {bannerData.map((banner) => (
          <SwiperSlide key={banner.id}>
            <SlideItem banner={banner} />
          </SwiperSlide>
        ))}
      </Swiper>

      <SlideNavigation />
    </div>
  );
}
