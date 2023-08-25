import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <div className="flex justify-between sm:justify-normal items-center bg-[#7f8b6d] rounded-full w-full h-12 sm:h-16 px-4 gap-0 sm:gap-16">
        <h1 className="uppercase text-[0.625rem] xs:text-xs sm:text-base text-white font-bold sm:mr-auto">
          Dishswap
        </h1>
        <Link
          className="uppercase text-[0.625rem] xs:text-xs sm:text-base text-white font-bold"
          to="/"
        >
          Recipes
        </Link>
        <Link
          className="uppercase text-[0.625rem] xs:text-xs sm:text-base text-white font-bold"
          to="/flavourmark"
        >
          Flavourmark
        </Link>
        <Link
          className="uppercase text-[0.625rem] xs:text-xs sm:text-base text-white font-bold"
          to="/profile"
        >
          Profile
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
