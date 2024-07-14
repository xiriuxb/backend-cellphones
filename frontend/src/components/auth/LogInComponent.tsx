import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { apiLogin, apiRegister } from "../../api/auth";
import { useAuthStore } from "../../context/authContext";
import { LoginSignupType } from "./auth";
import InputErrorMessage from "../general/InputErrorMessage";
import ErrorAlertComponent from "../general/ErrorAlertComponent";
import { useState } from "react";

const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

export default function LogInComponent({ signUpUri = "/auth/register" }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSignupType>({ mode: "all" });
  const navigate = useNavigate();

  const [backError, setBackError] = useState("");

  const { setIsAuth } = useAuthStore();

  const handleSubmitForm: SubmitHandler<LoginSignupType> = async (data) => {
    setBackError("");
    try {
      await apiLogin(data);
      setIsAuth(true);
      navigate("/", { replace: true });
      localStorage.setItem("user:auth", "true");
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
          <h2 className="font-extrabold text-4xl text-left pb-5">
            User LogIn
          </h2>
          <ErrorAlertComponent message={backError} />
          <div>
            <label htmlFor="user_examples">Example users:</label>
            <select className="select select-bordered select-xs w-full max-w-xs">
              <option selected value="user">Normal User</option>
              <option value="admin">Admin User</option>
            </select>
          </div>
          <div className="w-full mt-6 text-left">
            <label className=" w-full" htmlFor="email">
              Email
            </label>
            <input
              className={`p-2 mt-2 w-full text-black bg-white rounded-t-[4px] ${
                errors.email && "border-red-600 border"
              }`}
              type="email"
              id="email"
              placeholder="email@example.com"
              {...register("email", {
                required: { value: true, message: "Must enter an email" },
                pattern: { value: EMAIL_REGEX, message: "Invalid email" },
              })}
            />
            <InputErrorMessage message={errors.email?.message} />
          </div>
          <div className="w-full mt-6 text-left">
            <label className=" w-full" htmlFor="password">
              Password
              <input
                className={`p-2 mt-2 w-full text-black bg-white rounded-t-[4px] ${
                  errors.email && "border-red-600 border"
                }`}
                type="password"
                maxLength={24}
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: { value: true, message: "Must enter a password" },
                  maxLength: {
                    value: 24,
                    message: "Password must have between 6 and 24 characters",
                  },
                  minLength: {
                    value: 6,
                    message: "Password must have between 6 and 24 characters",
                  },
                })}
              />
            </label>
            <InputErrorMessage message={errors.password?.message} />
          </div>

          <button
            className="btn btn-neutral self-center py-3 px-2 w-[60%] text-base font-semibold my-8"
            type="submit"
          >
            LOG IN
          </button>
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
