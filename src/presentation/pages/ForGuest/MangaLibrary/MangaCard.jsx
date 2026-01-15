export default function MangaCard({ manga, onClick }) {
    return (
        <div
            onClick={() => onClick(manga.id)}
            className="group relative overflow-hidden rounded-lg transition-all duration-300 transform cursor-pointer"
        >
            <div className="relative rounded-lg shadow hover:shadow-lg fine-transition overflow-hidden">
                <img
                    src={manga.imgPoster}
                    alt={manga.name}
                    className="w-50 h-75 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300"></div>
            </div>
            <div className="p-3">
                <h3 className="text-center text-black font-semibold text-sm truncate">{manga.title}</h3>
                <h3 className="text-center text-black font-semibold text-sm truncate">{manga.genre}</h3>
                <p className="text-center text-xs text-gray-600 mt-1">{manga.latestChapter}</p>
                <p className="text-center text-xs text-gray-600 mt-1">{manga.status}</p>
            </div>
        </div>
    );
}
