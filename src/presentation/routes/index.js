import { adminRoutes } from "./adminRouter";
import { mainRoutes } from "./mainRouters";

const publicRoutes = [...mainRoutes];

const privateRoutes = [...adminRoutes];

export { publicRoutes, privateRoutes };
