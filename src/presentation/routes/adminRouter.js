import OnlySidebarLayout from "../Layouts/OnlySidebar";
import Dashboard from "../pages/ForAdmin/Dashboard/Dashboard";
import UserManagement from "../pages/ForAdmin/User/UserManagement";
import TagManagement from "../pages/ForAdmin/Tag/TagManagement"
import MangaList from "../pages/ForAdmin/MangaList/MangaManagement";
import MangaDetail from "../pages/ForAdmin/MangaDetail/MangaDetail";
import EditManga from "../pages/ForAdmin/EditManga/EditManga";
import CreateChapter from "../pages/ForAdmin/CreateChapter/CreateChapter";
import ChapterDetail from "../pages/ForAdmin/ChapterDetail/ChapterDetail"
import AuthorManagement from "../pages/ForAdmin/Author/AuthorManagement";
import CreateManga from "../pages/ForAdmin/CreateManga/CreateManga";


export const adminRoutes = [
  { path: "/dashboard", component: Dashboard , layout : OnlySidebarLayout },
  { path: "/user-management", component: UserManagement , layout : OnlySidebarLayout },
  { path: "/tag-management", component: TagManagement , layout : OnlySidebarLayout },
  { path: "/author-management", component: AuthorManagement , layout : OnlySidebarLayout },
  { path: "/manga-management", component: MangaList , layout : OnlySidebarLayout },
  { path: "/manga-detail-management/:id", component: MangaDetail , layout : OnlySidebarLayout },
  { path: "/edit-manga/:id", component: EditManga , layout : OnlySidebarLayout },
  { path: "/create-chapter/:id", component: CreateChapter , layout : OnlySidebarLayout },
  { path: "/manga-detail-management/:id/chapter-detail/:idChapter", component: ChapterDetail , layout : OnlySidebarLayout },
  { path: "/create-manga", component: CreateManga , layout : OnlySidebarLayout },
];
