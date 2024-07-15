import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductBase } from "../types/api-response";
import { apiGetProdById } from "../api/productsApi";

const ViewProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductBase | undefined>();

  const getProduct = async () => {
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
  }, []);

  if (!product) {
    return <h2>Sorry an error ocurred or product not exists</h2>;
  }
  return (
    <section className="flex flex-col items-center w-full px-4 py-2">
      <div className=" felx flex-col items-center max-w-screen-md rounded-lg shadow-2xl transition-all w-full">
        <h1 className="text-4xl font-bold">{product?.name}</h1>
        <h2 className="text-2xl">{product.Brand.name}</h2>
        <img src="/cell_thumb.jpg" alt="" className="h-32 rounded-xl" />
        <p>{product.description}</p>
      </div>
    </section>
  );
};

export default ViewProductPage;
