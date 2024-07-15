import { Navigate } from "react-router-dom";
import { useAuthStore } from "../context/authContext";
import PhoneCreateForm from "../components/phones/PhoneCreateForm";
import { apiCreateProduct } from "../api/productsApi";

const ProductPage = () => {
  const { isAuth } = useAuthStore();
  if (!isAuth) {
    return <Navigate to={"/"} replace />;
  }
  return (
    <section className="w-full flex flex-col gap-5 items-center">
      <PhoneCreateForm onSubmit={apiCreateProduct}/>
    </section>
  );
};

export default ProductPage;
