import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar.js";

type Layout = {
  isSignedIn: boolean;
};

const Layout = ({ isSignedIn }: Layout) => {
  return (
    <div className="relative">
      <NavBar isSignedIn={isSignedIn} />
      <Outlet />
    </div>
  );
};

export default Layout;
