import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import authRoutes from "./AuthRoutes";
import homeRoutes from "./HomeRoutes";

const AppRouter = createBrowserRouter([
    {
        path:"/",
        element: <HomeLayout />,
        children: homeRoutes
    },
    {
        path:"/auth",
        element: <AuthLayout />,
        children: authRoutes
    }
])

export default AppRouter;