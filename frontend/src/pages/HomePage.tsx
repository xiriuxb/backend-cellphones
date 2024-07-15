import { useEffect, useState } from "react";
import PhoneInfoCard from "../components/phones/PhoneInfoCard";
import { ApiOkPaginatedResponse, ProductBase } from "../types/api-response";
import { apiDeleteProduct, apiGetProducts } from "../api/productsApi";
import HomeSkeleton from "../components/home/HomeSkeleton";
import { messages } from "../utils/constants";

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
      } catch (error:any) {
        alert(error.message)
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, [productsData]);

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
