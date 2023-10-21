import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar.js";
import ITokenValid from "../types/TokenValidInterface.js";


const Layout = ({ isTokenValid,  setIsTokenValid}: ITokenValid) => {

  return (
    <div className="relative">
      <NavBar isTokenValid={isTokenValid} setIsTokenValid={setIsTokenValid} />
      <Outlet />
    </div>
  );
};

export default Layout;
