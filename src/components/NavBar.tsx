import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <div className="flex justify-between items-center bg-[#7f8b6d] rounded-full w-full h-16 px-8">
        <h1 className="uppercase text-white font-bold">Dishswap</h1>
        <div className="flex gap-16">
          <Link className="uppercase text-white font-bold" to="/">
            Recipes
          </Link>
          <Link className="uppercase text-white font-bold" to="/flavourmark">
            Flavourmark
          </Link>
          <Link className="uppercase text-white font-bold" to="/profile">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
