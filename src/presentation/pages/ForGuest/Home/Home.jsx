import Slide from "./Slide/SlideShow";
import MangaList from "./MangaList/MangaList";
import TopManga from "./TopManga/TopManga";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";

import MangaService from "../../../../usecases/MangaService";

const mangaService = new MangaService();

function Home() {
  const [mangasTop, setMangasTop] = useState([]);
  const [mangasNew, setMangasNew] = useState([]);
  const [mangasMonster, setMangasMonster] = useState([]);
  const [mangasAdventure, setMangasAdventure] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, dataMonster, dataAdventure] = await Promise.all([
          mangaService.getAllMangas(),
          mangaService.getMangasByCategories(["Monster"]),
          mangaService.getMangasByCategories(["Adventure"]),
        ]);

        const sortedDataMonster = [...dataMonster]
          .sort((a, b) => new Date(b.updateAt) - new Date(a.updateAt))
          .slice(0, 30);
        setMangasMonster(sortedDataMonster);
        const sortedDataAdventure = [...dataAdventure]
          .sort((a, b) => new Date(b.updateAt) - new Date(a.updateAt))
          .slice(0, 30);
        setMangasAdventure(sortedDataAdventure);

        const sortedTop = [...data]
          .sort((a, b) => b.countView - a.countView)
          .slice(0, 30);
        setMangasTop(sortedTop);

        const sortedNew = [...data]
          .sort((a, b) => new Date(b.updateAt) - new Date(a.updateAt))
          .slice(0, 30);
        setMangasNew(sortedNew);
      } catch (err) {
        console.error("Lỗi khi lấy manga:", err);
        setMangasTop([]);
        setMangasNew([]);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Trang chủ | DMManga</title>
      </Helmet>
      <Slide
        bannerData={mangasTop
          .map((m) => ({ value: m, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
          .slice(0, 10)}
      />
      <MangaList
        mangaData={mangasNew}
        title="Truyện mới"
        colorBackground="bg-gray-50"
        category="all"
      />

      <TopManga mangas={mangasTop} />
      <MangaList
        mangaData={mangasMonster}
        title="Monster"
        colorBackground="bg-[#e1dac0]"
        category="Monster"
      />
      <MangaList
        mangaData={mangasAdventure}
        title="Adventure"
        colorBackground="bg-[#b3c6d5]"
        category="Adventure"
      />
    </>
  );
}

export default Home;
