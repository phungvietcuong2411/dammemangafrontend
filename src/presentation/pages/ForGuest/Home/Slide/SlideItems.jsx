import useDominantColor from "./hooks/useDominantColor";

export default function SlideItem({ banner }) {
  const dominantColor = useDominantColor(banner.image);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Ảnh nền + zoom */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-[1.08] transition-transform duration-[10000ms] group-hover:scale-100"
        style={{ backgroundImage: `url(${banner.bannerUrl})` }}
      />

      {/* Overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7)),
            linear-gradient(135deg, ${dominantColor}30, transparent 70%)
          `,
        }}
      />

      {/* Nội dung */}
      <div className="absolute bottom-0 left-8 p-6 md:p-10 lg:p-16 max-w-3xl text-white z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 drop-shadow-2xl tracking-tight">
          {banner.name}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl font-medium mb-6 drop-shadow-lg max-w-2xl text-gray-100 leading-relaxed">
          {banner.description}
        </p>

        <button className="px-7 py-3 bg-white text-black font-bold rounded-xl shadow-2xl hover:bg-gray-100 transition-all hover:scale-105 hover:shadow-xl pointer-events-auto z-30">
          Xem thông tin
        </button>
      </div>
    </div>
  );
}
