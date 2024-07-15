import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";

const homeRoutes = [
  {
    path: "",
    element: <HomePage />,
  },
  {
    path: "/product",
    element: <ProductPage />
  }
];

export default homeRoutes;
