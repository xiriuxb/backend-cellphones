import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import authRoutes from "./AuthRoutes";

const AppRouter = createBrowserRouter([
    {
        path:"/",
        element: <HomeLayout />
    },
    {
        path:"/auth",
        element: <AuthLayout />,
        children: authRoutes
    }
])

export default AppRouter;