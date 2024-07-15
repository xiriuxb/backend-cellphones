import { Navigate } from "react-router-dom";
import { useAuthStore } from "../context/authContext";
import PhoneCreateForm from "../components/phones/PhoneCreateForm";

const ProductPage = () => {
  const { isAuth } = useAuthStore();
  if (!isAuth) {
    return <Navigate to={"/"} replace />;
  }
  return (
    <section className="w-full pt-24 flex flex-col gap-5 items-center">
      <PhoneCreateForm />
    </section>
  );
};

export default ProductPage;
