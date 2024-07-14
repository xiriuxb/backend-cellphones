import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginSignupType } from "./auth";
import { apiRegister } from "../../api/auth";
import { useAuthStore } from "../../context/authContext";
import InputErrorMessage from "../general/InputErrorMessage";
import ErrorAlertComponent from "../general/ErrorAlertComponent";

const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

export default function SignUpComponent({ loginPath = "/auth/login" }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSignupType>({ mode: "all" });
  const navigate = useNavigate();
  const { setIsAuth } = useAuthStore();

  const [backError, setBackError] = useState("");

  const handleSubmitForm: SubmitHandler<LoginSignupType> = async (data) => {
    setBackError("");
    try {
      await apiRegister(data);
      setIsAuth(true);
      navigate("/", { replace: true });
      localStorage.setItem("user:auth", "true");
    } catch (error: any) {
      setBackError(error.message);
    }
  };

  return (
    <form
      className="flex w-full max-w-lg"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <div className="flex flex-col w-full">
        <div className="flex flex-col items-center bg-custom-gray px-14 py-8 rounded-lg">
          <h2 className="font-extrabold text-4xl text-left pb-5">
            User SignUp
          </h2>
          <ErrorAlertComponent message={backError} />
          <div className="w-full mt-6 text-left">
            <label className=" w-full" htmlFor="email">
              Email
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
            </label>
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
            disabled={isSubmitting}
          >
            SIGN UP
          </button>
        </div>
        <span className=" self-center pt-4 pb-2">
          Already have an account?{" "}
          <Link to={loginPath} className="underline">
            LogIn
          </Link>
        </span>
      </div>
    </form>
  );
}
