import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const UserManager = lazy(() => import("../pages/admin/UserManager"));
const ProductManager = lazy(() => import("../pages/admin/ProductManager"));
const Bill = lazy(() => import("../pages/admin/Bill"));

export { Dashboard, UserManager, ProductManager, Bill };
