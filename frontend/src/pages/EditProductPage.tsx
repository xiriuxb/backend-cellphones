import { Navigate, useParams } from "react-router-dom";
import { useAuthStore } from "../context/authContext";
import { useEffect, useState } from "react";
import { apiGetProdById, apiUpdateProduct } from "../api/productsApi";
import { ProductBase } from "../types/api-response";
import PhoneCreateForm from "../components/phones/PhoneCreateForm";

const EditProductPage = () => {
  const { isAuth } = useAuthStore();
  const { id } = useParams();
  const [product, setProduct] = useState<ProductBase | undefined>();

  const getProduct = async () => {
    console.log(id);
    if (!id) {
      return;
    }
    try {
      const resData = await apiGetProdById(parseInt(id));
      setProduct(resData?.data);
    } catch (error) {}
  };

  useEffect(() => {
    getProduct();
    console.log(product);
  }, []);

  if (!isAuth) {
    return <Navigate to={`/product/view/${id}`} replace />;
  }
  return (
    <section className="w-full flex flex-col gap-5 items-center">
      {product && (
        <PhoneCreateForm product={product} onSubmit={apiUpdateProduct} />
      )}
    </section>
  );
};

export default EditProductPage;
