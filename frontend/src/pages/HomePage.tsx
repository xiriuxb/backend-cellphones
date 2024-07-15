import { useEffect, useState } from "react";
import { ApiOkPaginatedResponse, ProductBase } from "../types/api-response";
import { apiDeleteProduct, apiGetProducts } from "../api/productsApi";
import { messages } from "../utils/constants";
import HomeSkeleton from "../components/home/HomeSkeleton";
import PhoneInfoCard from "../components/phones/PhoneInfoCard";

const HomePage = () => {
  const [productsData, setProductsData] = useState<
    ApiOkPaginatedResponse<ProductBase> | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const responseData = await apiGetProducts();
      setProductsData(responseData);
      setLoading(false);
    } catch (error) {}
  };

  const handleDeleteProduct = async (prodId:number) => {
    const result = window.confirm(messages.deleteConfirm);
    if (result) {
      try {
        await apiDeleteProduct(prodId);
        getProducts();
      } catch (error:any) {
        alert(error.message)
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="w-full flex flex-col gap-5 items-center">
      {loading && <HomeSkeleton />}
      {!loading &&
        productsData &&
        productsData.data.map((prod: ProductBase) => {
          return <PhoneInfoCard phoneData={prod} onDelete={handleDeleteProduct} />;
        })}
    </section>
  );
};

export default HomePage;
