import { AxiosError } from "axios";
import { BackFieldValidationError } from "../types/api-error-response";

const axiosErrorHandler = (error: any) => {
  const errorData: any = (error as AxiosError).response?.data;
  if (errorData && errorData.errors) {
    throw {
      message: (Object.values(errorData.errors)[0] as BackFieldValidationError)
        .msg,
    };
  }
  if (errorData && errorData.message) {
    throw { message: errorData.message };
  }
  throw { message: "App error" };
};

export default axiosErrorHandler;
