import ProductLayout from "../layouts/ProductLayout";
import EditProductPage from "../pages/EditProductPage";
import HomePage from "../pages/HomePage";
import ProductRegPage from "../pages/ProductListPage";
import ProductPage from "../pages/ProductPage";
import ViewProductPage from "../pages/ViewProductPage";

const homeRoutes = [
  {
    path: "",
    element: <HomePage />,
  },
  {
    path: "/product",
    element: <ProductLayout />,
    children: [
      {
        path: "",
        element: <ProductPage />
      },
      {
        path: ":id",
        element: <EditProductPage />,
      },
      {
        path: "view/:id",
        element: <ViewProductPage />,
      },
      {
        path: "registers",
        element: <ProductRegPage />
      }
    ],
  },
];

export default homeRoutes;
