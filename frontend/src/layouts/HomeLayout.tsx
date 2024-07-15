import { Outlet } from "react-router-dom";
import NavBarComponent from "../components/home/NavBarComponent";

const HomeLayout = () => {
  return (
    <main className="bg-fondo bg-cover flex justify-center">
      <header className="w-full absolute content-center">
        <NavBarComponent />
      </header>
      <Outlet />
    </main>
  );
};

export default HomeLayout;
