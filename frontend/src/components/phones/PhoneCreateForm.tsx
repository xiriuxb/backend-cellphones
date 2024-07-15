import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { apiGetProductTypes } from "../../api/productsTypeApi";
import { apiGetBrands } from "../../api/brandsApi";
import { messages } from "../../utils/constants";
import { alphaValidation } from "../../utils/validationOptions";
import { Brand } from "../../types/api-brand";
import { CreateProductBasic } from "../../types/api-product";
import { ProductType } from "../../types/api-product-types";
import { ProductBase } from "../../types/api-response";
import InputErrorMessage from "../general/InputErrorMessage";
import ErrorAlertComponent from "../general/ErrorAlertComponent";
import SuccessAlertComponent from "../general/SuccessAlertComponent";
import SumbitButtonComponent from "../general/SubmitButtonComponent";

const stateErrorsInitial = {
  success: "",
  error: "",
};

const PhoneCreateForm = ({
  product,
  onSubmit,
}: {
  product?: ProductBase;
  onSubmit: (data: any, prodId?: number) => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductBasic>({ mode: "all", defaultValues: product });

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
    setStateErrors({ ...stateErrorsInitial });
    try {
      if (product?.id) {
        await onSubmit(data, product.id);
      } else {
        await onSubmit(data);
      }
      setStateErrors({
        error: "",
        success: product?.id ? messages.productUpdated : messages.productCreated,
      });
      if(!product?.id){
        reset();
      }
    } catch (error: any) {
      setStateErrors({ success: "", error: error.message });
    }
  };

  useEffect(() => {
    getProductTypes();
    getBrands();
  }, []);

  return (
    <form onSubmit={handleSubmit(handleCreate)}>
      <h3>Add Product</h3>
      <ErrorAlertComponent message={stateErrors.error} />
      <SuccessAlertComponent message={stateErrors.success} />
      <div className="w-full mt-4 text-left">
        <label className=" w-full" htmlFor="name">
          Name
        </label>
        <input
          className={`mt-1 input input-bordered w-full max-w-xs ${
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
      <div className="w-full mt-4 text-left">
        <label>Product Type</label>
        {prodTypes && (
          <select
            defaultValue={product ? product.ProductType.id : ""}
            id="product_type"
            className={`select select-bordered mt-1 w-full max-w-xs ${
              errors.product_type_id && "border-red-600 border"
            }`}
            {...register("product_type_id", {
              required: { value: true, message: messages.selectOption },
              valueAsNumber: true,
            })}
          >
            <option disabled value={""}>
              -- Type --
            </option>
            {prodTypes?.map((pType: ProductType) => {
              return <option value={pType.id}>{pType.name}</option>;
            })}
          </select>
        )}
        <InputErrorMessage message={errors.product_type_id?.message} />
      </div>
      <div className="w-full mt-4 text-left">
        <label>Brand</label>
        {brands && (
          <select
            defaultValue={product ? product.Brand.id : ""}
            id="brand_id"
            className={`select select-bordered mt-1 w-full max-w-xs ${
              errors.brand_id && "border-red-600 border"
            }`}
            {...register("brand_id", {
              required: { value: true, message: messages.selectOption },
              valueAsNumber: true,
            })}
          >
            <option disabled value={""}>
              -- Brand --
            </option>
            {brands?.map((brnd: Brand) => {
              return <option value={brnd.id}>{brnd.name}</option>;
            })}
          </select>
        )}
        <InputErrorMessage message={errors.brand_id?.message} />
      </div>
      <div className="w-full mt-4 text-left">
        <label>Description</label>
        <textarea
          required
          className={`textarea textarea-bordered mt-1 w-full max-w-xs ${
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
