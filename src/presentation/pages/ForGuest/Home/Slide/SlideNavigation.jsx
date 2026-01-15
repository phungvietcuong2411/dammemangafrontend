import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SlideNavigation() {
  return (
    <>
      <div className="custom-prev absolute inset-y-0 left-0 w-20 md:w-24 flex items-center justify-center cursor-pointer z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
        <div className="p-3 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all hover:scale-110">
          <ChevronLeft size={36} className="text-white drop-shadow-md" />
        </div>
      </div>

      <div className="custom-next absolute inset-y-0 right-0 w-20 md:w-24 flex items-center justify-center cursor-pointer z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
        <div className="p-3 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all hover:scale-110">
          <ChevronRight size={36} className="text-white drop-shadow-md" />
        </div>
      </div>
    </>
  );
}
