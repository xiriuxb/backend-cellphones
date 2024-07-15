import { useState } from "react";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginSignupType } from "./auth";
import { apiLogin, useMyAuth } from "../../api/auth";
import { InputCustom } from "../general/InputCustomComponent";
import {
  emailValidation,
  passwordValidaion,
} from "../../utils/validationOptions";
import ErrorAlertComponent from "../general/ErrorAlertComponent";
import SumbitButtonComponent from "../general/SubmitButtonComponent";

export default function LogInComponent({ signUpUri = "/auth/register" }) {
  const { register, handleSubmit, formState } = useForm<LoginSignupType>({
    mode: "all",
  });

  const [backError, setBackError] = useState("");

  const { onSuccessAuth } = useMyAuth();

  const handleSubmitForm: SubmitHandler<LoginSignupType> = async (data) => {
    setBackError("");
    try {
      await apiLogin(data);
      onSuccessAuth();
    } catch (error: any) {
      setBackError(error.message);
    }
  };

  return (
    <form
      className="flex w-full max-w-lg justify-center"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <div className="flex flex-col w-full">
        <div className="flex flex-col items-center bg-custom-gray px-14 py-8 rounded-lg">
          <h2 className="font-extrabold text-4xl text-left pb-5">User LogIn</h2>
          <ErrorAlertComponent message={backError} />
          <div>
            <label htmlFor="user_examples">Example users:</label>
            <select className="select select-bordered select-xs w-full max-w-xs">
              <option selected value="user">
                Normal User
              </option>
              <option value="admin">Admin User</option>
            </select>
          </div>
          <div className="w-full mt-6 text-left">
            <label className=" w-full" htmlFor="email">
              Email
              <InputCustom
                className={`p-2 mt-2 w-full text-black bg-white`}
                type="email"
                name="email"
                maxLength={64}
                placeholder="email@example.com"
                register={register}
                formState={formState}
                registerOptions={emailValidation}
              />
            </label>
          </div>
          <div className="w-full mt-6 text-left">
            <label className=" w-full" htmlFor="password">
              Password
              <InputCustom
                className={`p-2 mt-2 w-full text-black bg-white`}
                type="password"
                name="password"
                maxLength={24}
                placeholder="Password"
                register={register}
                registerOptions={passwordValidaion}
                formState={formState}
              />
            </label>
          </div>
          <SumbitButtonComponent
            message="LOG IN"
            disabled={formState.isSubmitting}
            loading={formState.isSubmitting}
          />
        </div>
        <span className=" self-center pt-4 pb-2">
          Does not have an account?{" "}
          <Link to={signUpUri} className="underline">
            Sign Up
          </Link>
        </span>
      </div>
    </form>
  );
}
