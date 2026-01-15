import Home from "../pages/ForGuest/Home/Home";
import AuthForm from "../pages/ForGuest/AuthForm/Auth";
import MangaLibrary from "../pages/ForGuest/MangaLibrary/MangaLibrary";
import OnlyHeader from "../Layouts/OnlyHeader";
import MangaDetail from "../pages/ForGuest/MangaDetail/MangaDetail";
import Chapter from "../pages/ForGuest/ChapterRead/Chapter";
import Setting from "../pages/ForGuest/Setting/Setting";
import History from "../pages/ForGuest/History/History";
import Follow from "../pages/ForGuest/Follow/Follow";
import Search from "../pages/ForGuest/Search/Search.jsx";

export const mainRoutes = [
  { path: "/", component: Home },
  { path: "/login", component: AuthForm },
  { path: "/mangalibrary", component: MangaLibrary },
  { path: "/mangas/:id", component: MangaDetail },
  { path: "/settings", component: Setting },
  {
    path: "/mangas/:id/chapter/:chapterId",
    component: Chapter,
    layout: OnlyHeader,
  },
  { path: "/history", component: History },
  { path: "/follow", component: Follow },
  { path: "/search/:query?", component: Search },
];
