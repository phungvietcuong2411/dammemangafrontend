import { useState } from "react";
import "../../../../styles/font.css";
import { Helmet } from "react-helmet-async";
import GenreFilter from "./GenreFilter";
import StatusFilter from "./StatusFilter";
import MangaCard from "./MangaCard";

// Dữ liệu giả lập manga
const mangaData = [
    { id: 1, title: "One Piece", imgPoster: 'https://ik.imagekit.io/cuongphung241103/BTL_JAVA/MangaIMG/NRT.jpg?updatedAt=1763293349678', genre: "Action", status: "Đang tiến hành" },
    { id: 2, title: "Naruto", imgPoster: 'https://ik.imagekit.io/cuongphung241103/BTL_JAVA/MangaIMG/NRT.jpg?updatedAt=1763293349678', genre: "Action", status: "Hoàn thành" },
    { id: 3, title: "Attack on Titan", imgPoster: 'https://ik.imagekit.io/cuongphung241103/BTL_JAVA/MangaIMG/NRT.jpg?updatedAt=1763293349678', genre: "Fantasy", status: "Hoàn thành" },
    { id: 4, title: "Demon Slayer", imgPoster: 'https://ik.imagekit.io/cuongphung241103/BTL_JAVA/MangaIMG/NRT.jpg?updatedAt=1763293349678', genre: "Action", status: "Đang tiến hành" },
    { id: 5, title: "Fruits Basket", imgPoster: 'https://ik.imagekit.io/cuongphung241103/BTL_JAVA/MangaIMG/NRT.jpg?updatedAt=1763293349678', genre: "Romance", status: "Hoàn thành" },
    { id: 6, title: "Boku No Pico", imgPoster: 'https://ik.imagekit.io/cuongphung241103/BTL_JAVA/MangaIMG/NRT.jpg?updatedAt=1763293349678', genre: "Gay", status: "Hoàn thành" }
];

// Lấy danh sách thể loại duy nhất
const genres = ["Tất cả", ...new Set(mangaData.map((m) => m.genre))];

function MangaLib() {
    const [genreFilter, setGenreFilter] = useState("Tất cả");
    const [statusFilter, setStatusFilter] = useState("Tất cả");

    const filteredManga = mangaData.filter((manga) => {
        const genreMatch = genreFilter === "Tất cả" || manga.genre === genreFilter;
        const statusMatch = statusFilter === "Tất cả" || manga.status === statusFilter;
        return genreMatch && statusMatch;
    });

    return (
        <>
            <Helmet>
                <title>Danh sách truyện | DMManga</title>
            </Helmet>
            <div className="min-h-screen bg-gray-100 pt-20 quicksand-uniquifier">
                <div className="p-6 max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Danh sách truyện</h2>

                    <GenreFilter genres={genres} genreFilter={genreFilter} setGenreFilter={setGenreFilter} />
                    <StatusFilter statusFilter={statusFilter} setStatusFilter={setStatusFilter} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6">
                        {filteredManga.map((manga) => (
                            <MangaCard key={manga.id} manga={manga} />
                        ))}
                    </div>
                </div>
            </div>
        </>

    );
}

export default MangaLib;
