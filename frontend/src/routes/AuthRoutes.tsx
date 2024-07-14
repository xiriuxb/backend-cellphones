import { Navigate } from "react-router-dom";
import SignUpComponent from "../components/auth/SignUpComponent";
import LogInComponent from "../components/auth/LogInComponent";

const authRoutes = [
  {
    path: "",
    element: <Navigate to={"register"} replace />,
  },
  {
    path: "register",
    element: <SignUpComponent />,
  },
  {
    path: "login",
    element: <LogInComponent />
  }

];

export default authRoutes;