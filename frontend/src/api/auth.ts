import { LoginSignupType } from "../components/auth/auth";
import appApi from "./axios";
import axiosErrorHandler from "./axiosErrorHandler";

const AUTH_URI = "auth";

export const apiRegister = async (registerData: LoginSignupType) => {
  try {
    const registerResData = await appApi.post(
      `${AUTH_URI}/signup`,
      registerData
    );
    return registerResData.data;
  } catch (error) {
    axiosErrorHandler(error);
  }
};

export const apiLogin = async (loginData: LoginSignupType) => {
  try {
    const data = await appApi.post(`${AUTH_URI}/login`, loginData);
    return data.data;
  } catch (error) {
    axiosErrorHandler(error);
  }
};

export const apiLogout = async () => {
  try {
    await appApi.post(`${AUTH_URI}/logout`);
  } catch (error) {
    throw { message: "Error at logout. Please try again." };
  }
};
