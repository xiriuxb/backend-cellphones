import { useEffect, useState } from "react";
import PhoneInfoCard from "../components/phones/PhoneInfoCard";
import { ApiOkPaginatedResponse, ProductBase } from "../types/api-response";
import { apiGetProducts } from "../api/productsApi";
import HomeSkeleton from "../components/home/HomeSkeleton";

const HomePage = () => {
  const [productsData, setProductsData] = useState<
    ApiOkPaginatedResponse<ProductBase> | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const responseData = await apiGetProducts();
      setProductsData(responseData);
      console.log(productsData?.data);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="w-full pt-24 flex flex-col gap-5 items-center">
      {loading && <HomeSkeleton />}
      {!loading &&
        productsData &&
        productsData.data.map((prod: ProductBase) => {
          return <PhoneInfoCard phoneData={prod} />;
        })}
    </section>
  );
};

export default HomePage;
