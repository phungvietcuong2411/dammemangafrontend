export default function MangaInfo({ story }) {
  return (
    <div className="absolute top-60 left-20 right-8 z-20 flex gap-10">
      <img
        src={story.cover}
        alt={story.title}
        className="w-52 h-72 rounded-xl object-cover shadow-2xl border-4 border-gray-900"
      />
      <div className="text-gray-100 mt-16">
        <h1 className="text-4xl font-bold leading-tight">{story.title}</h1>
        <p className="text-xl text-gray-300 mt-2">{story.author}</p>
        <p className="mt-6 text-lg">
          Cập nhật từ:{" "}
          <span className="font-bold text-white">{story.lastUpdate}</span>
        </p>
        <div className="mt-6 flex gap-3 flex-wrap">
          {story.genres.map((g) => (
            <span
              key={g.id}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold shadow-lg"
            >
              {g.nameCategory}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
