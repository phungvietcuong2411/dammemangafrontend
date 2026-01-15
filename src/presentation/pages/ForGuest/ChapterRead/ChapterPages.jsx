export default function ChapterPages({ pages, containerRef, showUI }) {
  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-auto overflow-x-hidden scrollbar-hide"
      style={{
        paddingTop: showUI ? "0rem" : "0",
        paddingBottom: showUI ? "6rem" : "0",
      }}
    >
      {pages.map((url, index) => (
        <div
          key={index}
          className="w-full flex items-center justify-center bg-gray-900"
        >
          <img
            src={url.imgLink}
            alt={`Trang ${index + 1}`}
            className="max-w-full h-auto object-contain rounded-lg shadow-md select-none"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
