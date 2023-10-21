import { useNavigate } from "react-router-dom";

type isSignedIn = {
  isSignedIn: boolean;
};

const NavBar = ({ isSignedIn }: isSignedIn) => {

    const navigate = useNavigate()

  return (
    <div className="text-base-100 px-20 py-10 absolute w-full">
      <div className="navbar bg-neutral bg-opacity-60 rounded-full px-10 py-0 justify-between h-max">
        <div className="navbar-start w-max">
          <a className="btn btn-ghost text-xl" onClick={() => navigate('/')}>DISHSWAP</a>
        </div>
        <div className="navbar-end w-max">
          <ul className="menu menu-horizontal px-1 text-xl gap-x-5 font-regular hidden lg:flex xl:gap-x-24">
            <li>
              <a onClick={() => navigate('recipes')}>RECIPES</a>
            </li>
            <li>
              <a onClick={() => navigate('flavourmarks')}>FLAVOURMARKS</a>
            </li>
            {isSignedIn ? (
              <li tabIndex={0}>
                <details>
                  <summary>ACCOUNT</summary>
                  <ul className="p-2 bg-neutral bg-opacity-60">
                    <li>
                    <a onClick={() => navigate('profile')}>PROFILE</a>
                    </li>
                    <li>
                      <a>SETTINGS</a>
                    </li>
                    <li>
                      <a>SIGN OUT</a>
                    </li>
                  </ul>
                </details>
              </li>
            ) : (
              <li>
                <a onClick={() => navigate('signup')}>SIGN UP</a>
              </li>
            )}
          </ul>
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 rounded-box w-max bg-neutral bg-opacity-60 relative right-0"
            >
              <li>
                <a onClick={() => navigate('recipes')}>RECIPES</a>
              </li>
              <li>
                <a onClick={() => navigate('flavourmarks')}>FLAVOURMARKS</a>
              </li>
              {isSignedIn ? (
                <li>
                  <details open>
                    <summary>ACCOUNT</summary>

                    <ul className="p-2">
                      <li>
                        <a>PROFILE</a>
                      </li>
                      <li>
                        <a>SETTINGS</a>
                      </li>
                      <li>
                        <a>SIGN OUT</a>
                      </li>
                    </ul>
                  </details>
                </li>
              ) : (
                <li>
                <a onClick={() => navigate('signup')}>SIGN UP</a>
              </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
