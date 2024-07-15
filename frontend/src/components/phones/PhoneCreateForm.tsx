import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Brand } from "../../types/api-brand";
import { CreateProductBasic } from "../../types/api-product";
import { ProductType } from "../../types/api-product-types";
import { apiGetProductTypes } from "../../api/productsTypeApi";
import { apiGetBrands } from "../../api/brandsApi";
import { apiCreateProduct } from "../../api/productsApi";
import { messages } from "../../utils/constants";
import InputErrorMessage from "../general/InputErrorMessage";
import ErrorAlertComponent from "../general/ErrorAlertComponent";
import SuccessAlertComponent from "../general/SuccessAlertComponent";
import SumbitButtonComponent from "../general/SubmitButtonComponent";
import { alphaValidation } from "../../utils/validationOptions";

const stateErrorsInitial = {
  success: "",
  error: "",
};

const PhoneCreateForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductBasic>({ mode: "all" });

  const [prodTypes, setProdTypes] = useState<ProductType[] | undefined>(
    undefined
  );
  const [brands, setBrands] = useState<Brand[] | undefined>(undefined);
  const [stateErrors, setStateErrors] = useState(stateErrorsInitial);

  const getProductTypes = async () => {
    try {
      const productTypes = await apiGetProductTypes();
      setProdTypes(productTypes);
    } catch (error) {}
  };

  const getBrands = async () => {
    try {
      const brands = await apiGetBrands();
      setBrands(brands);
    } catch (error) {}
  };

  const handleCreate: SubmitHandler<CreateProductBasic> = async (data) => {
    setStateErrors(stateErrorsInitial);
    try {
      await apiCreateProduct(data);
      setStateErrors({ ...stateErrors, success: messages.productCreated });
      reset();
    } catch (error: any) {
      setStateErrors({ ...stateErrors, error: error.message });
    }
  };

  useEffect(() => {
    getProductTypes();
    getBrands();
  }, []);

  return (
    <form onSubmit={handleSubmit(handleCreate)}>
      <h3>Añádir Producto</h3>
      <ErrorAlertComponent message={stateErrors.error} />
      <SuccessAlertComponent message={stateErrors.success} />
      <div className="w-full mt-6 text-left">
        <label className=" w-full" htmlFor="name">
          Name
        </label>
        <input
          className={`p-2 mt-2 input input-bordered w-full max-w-xs ${
            errors.name && "border-red-600 border"
          }`}
          type="text"
          id="prodName"
          placeholder="Product Name"
          required
          maxLength={64}
          {...register("name", alphaValidation(2, 64))}
        />
        <InputErrorMessage message={errors.name?.message} />
      </div>
      <div className="w-full mt-6 text-left">
        <label>Product Type</label>
        {prodTypes && (
          <select
            id="product_type"
            className={`select select-bordered p-2 mt-2 w-full max-w-xs ${
              errors.product_type_id && "border-red-600 border"
            }`}
            {...register("product_type_id", {
              required: { value: true, message: messages.selectOption },
              valueAsNumber: true,
            })}
          >
            <option selected disabled value={""}>
              -- Type --
            </option>
            {prodTypes?.map((pType: ProductType) => {
              return <option value={pType.id}>{pType.name}</option>;
            })}
          </select>
        )}
        <InputErrorMessage message={errors.product_type_id?.message} />
      </div>
      <div className="w-full mt-6 text-left">
        <label>Brand</label>
        {brands && (
          <select
            id="brand_id"
            className={`select select-bordered p-2 mt-2 w-full max-w-xs ${
              errors.brand_id && "border-red-600 border"
            }`}
            {...register("brand_id", {
              required: { value: true, message: messages.selectOption },
              valueAsNumber: true,
            })}
          >
            <option selected disabled value={""}>
              -- Brand --
            </option>
            {brands?.map((brnd: Brand) => {
              return <option value={brnd.id}>{brnd.name}</option>;
            })}
          </select>
        )}
        <InputErrorMessage message={errors.brand_id?.message} />
      </div>
      <div className="w-full mt-6 text-left">
        <label>Description</label>
        <textarea
          required
          className={`textarea textarea-bordered p-2 mt-2 w-full max-w-xs ${
            errors.description && "border-red-600 border"
          }`}
          placeholder="Description"
          maxLength={128}
          {...register("description", alphaValidation(2, 128))}
        ></textarea>
        <InputErrorMessage message={errors.description?.message} />
      </div>
      <SumbitButtonComponent
        message="Save"
        disabled={isSubmitting}
        loading={isSubmitting}
      />
    </form>
  );
};

export default PhoneCreateForm;
