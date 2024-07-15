import { Link, Outlet } from "react-router-dom";
import { useAuthStore } from "../context/authContext";

const ProductLayout = () => {
  const { isAuth } = useAuthStore();
  return (
    <section>
      {isAuth && (
        <nav className="navbar">
          <ul className="flex gap-5 px-4">
            <li>
              <Link to={"/product"}>Create</Link>
            </li>
            <li>
              <Link to={"/product/registers"}>Registers</Link>
            </li>
            <li>
              <Link to={"/product/controls"}>Controls</Link>
            </li>
          </ul>
        </nav>
      )}
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default ProductLayout;
