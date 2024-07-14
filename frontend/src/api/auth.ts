import { AxiosError } from "axios";
import { LoginSignupType } from "../components/auth/auth";
import appApi from "./axios";

const AUTH_URI = "auth";

type BackFieldValidationError = {
  msg: string;
  path: string;
  value: string;
};

type BackInternalServerError = {
  ok: boolean;
  message: string;
};

type BackValidationErrors = {
  ok: boolean;
  errors: { [field: string]: BackFieldValidationError };
};

export const apiRegister = async (registerData: LoginSignupType) => {
  try {
    const registerResData = await appApi.post(
      `${AUTH_URI}/signup`,
      registerData
    );
    return registerResData.data;
  } catch (error) {
    const data: any = (error as AxiosError).response?.data;
    if (data.errors) {
      throw {
        message: (Object.values(data.errors)[0] as BackFieldValidationError)
          .msg,
      };
    }
    throw { message: data.message };
  }
};

export const apiLogin = async (loginData: LoginSignupType) => {
  try {
    const data = await appApi.post(`${AUTH_URI}/login`, loginData);
    return data.data;
  } catch (error) {
    const data: any = (error as AxiosError).response?.data;
    if (data.errors) {
      throw {
        message: (Object.values(data.errors)[0] as BackFieldValidationError)
          .msg,
      };
    }
    throw { message: data.message };
  }
};

export const apiLogout = async () => {
  try {
    await appApi.post(`${AUTH_URI}/logout`);
  } catch (error) {
    throw {message: "Error at logout. Please try again."}
  }
};
