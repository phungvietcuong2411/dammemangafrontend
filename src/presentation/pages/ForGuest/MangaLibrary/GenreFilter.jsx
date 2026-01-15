function GenreFilter({ genres, genreFilter, setGenreFilter }) {
    return (
        <div className="pb-2">
            <div className="mb-2">Thể loại</div>
            <div className="flex flex-wrap gap-2 mb-4">
                {genres.map((g) => (
                    <button
                        key={g}
                        onClick={() => setGenreFilter(g)}
                        className={`px-4 py-1 rounded border ${
                            genreFilter === g
                                ? "bg-blue-500 text-white border-blue-500"
                                : "bg-white text-gray-700 border-gray-300"
                        } hover:bg-blue-400 hover:text-white transition`}
                    >
                        {g}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default GenreFilter;
