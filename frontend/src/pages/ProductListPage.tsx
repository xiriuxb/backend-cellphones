import { useEffect, useState } from "react";
import { ApiOkPaginatedResponse, ProductBase } from "../types/api-response";
import { apiGetProductsAdmin } from "../api/productsApi";

const ProductRegPage = () => {
  const [productsData, setProductsData] = useState<
    ApiOkPaginatedResponse<ProductBase> | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const responseData = await apiGetProductsAdmin();
      setProductsData(responseData);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
    {!loading && <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Brand</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {productsData &&
            productsData.data.map((prod) => {
              return (
                <tr className="bg-base-200">
                  <th>{prod.id}</th>
                  <td>{prod.name}</td>
                  <td>{prod.Brand.name}</td>
                  <td>{prod.ProductType.name}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>}
    </>
  );
};

export default ProductRegPage;
