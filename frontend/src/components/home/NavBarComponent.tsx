import { Link } from "react-router-dom";
import { useAuthStore } from "../../context/authContext";
import { apiLogout } from "../../api/auth";

const NavBarComponent = () => {
  const { isAuth, setIsAuth } = useAuthStore();

  const handleLogout = async () => {
    try {
      await apiLogout();
      localStorage.removeItem("user:auth");
      setIsAuth(false);
    } catch (error) {
    }
  };

  return (
    <nav className="navbar bg-base-100 fixed shadow-md">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">{import.meta.env.VITE_APP_NAME}</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {!isAuth && (
            <li>
              <ul className="menu menu-horizontal">
                <li>
                  <Link to={"/auth/login"}>LogIn</Link>
                </li>
                <li>
                  <Link to={"/auth/register"}>SignUp</Link>
                </li>
              </ul>
            </li>
          )}
          {isAuth && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBarComponent;
