import EditProductPage from "../pages/EditProductPage";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import ViewProductPage from "../pages/ViewProductPage";

const homeRoutes = [
  {
    path: "",
    element: <HomePage />,
  },
  {
    path: "/product",

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
    ],
  },
];

export default homeRoutes;
