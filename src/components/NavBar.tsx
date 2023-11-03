import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import verifyToken from "../functions/verifyToken.js";

type NavBarProps = {
  setIsTokenValid: React.Dispatch<React.SetStateAction<boolean>>;
  isTokenValid: boolean;
};

const NavBar = ({ isTokenValid, setIsTokenValid }: NavBarProps) => {
  const navigate = useNavigate();

  //check if token valid to detemine whats shown on navbar, necessary for when page is refreshed
  useEffect(() => {
    const authenticate = async () => {
      (await verifyToken()) ? setIsTokenValid(true) : setIsTokenValid(false);
    };

    authenticate();
  }, []);

  return (
    <div className="text-base-100 px-10 md:px-20 py-10 absolute w-full">
      <div
        data-test="navbar"
        className="navbar bg-neutral bg-opacity-60 rounded-full px-2 md:px-10 py-0 justify-between h-max"
      >
        <div className="navbar-start w-max">
          <a
            data-test="navbar-landing-link"
            className="btn btn-ghost text-xs md:text-lg lg:text-xl"
            onClick={() => navigate("/")}
          >
            DISHSWAP
          </a>
        </div>
        <div className="navbar-end w-max">
          <ul className="menu menu-horizontal px-1 text-xs md:text-lg lg:text-xl gap-x-5 font-regular hidden md:flex xl:gap-x-24">
            <li>
              <a
                data-test="navbar-recipes-link"
                onClick={() => navigate("/recipes")}
              >
                RECIPES
              </a>
            </li>
            {isTokenValid ? (
            <>
              <li tabIndex={0}>
                <details>
                  <summary data-test="navbar-account">ACCOUNT</summary>
                  <ul className="p-2 bg-neutral bg-opacity-60">
                    <li>
                    <a data-test="navbar-profile-link" onClick={() => navigate('profile')}>PROFILE</a>
                    </li>
                    <li>
                      <a onClick={() => navigate('settings')}>SETTINGS</a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          sessionStorage.clear();
                          setIsTokenValid(false);
                          navigate("/signin");
                        }}
                        >
                          SIGN OUT
                        </a>
                      </li>
                    </ul>
                  </details>
                </li>
              </>
            ) : (
              <li>
                <a
                  data-test="navbar-signin-link"
                  onClick={() => navigate("/signin")}
                >
                  SIGN IN
                </a>
              </li>
            )}
          </ul>
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost md:hidden">
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 rounded-box w-max bg-neutral bg-opacity-60 relative right-0 text-xs md:text-lg lg:text-xl"
            >
              <li>
                <a onClick={() => navigate("/recipes")}>RECIPES</a>
              </li>
              {isTokenValid ? (
                <>
                  <li>
                    <details open>
                      <summary>ACCOUNT</summary>

                    <ul className="p-2">
                      <li>
                        <a onClick={() => navigate('profile')}>PROFILE</a>
                      </li>
                      <li>
                        <a onClick={() => navigate('settings')}>SETTINGS</a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            sessionStorage.clear();
                            setIsTokenValid(false);
                            navigate("/signin");
                          }}
                          >
                            SIGN OUT
                          </a>
                        </li>
                      </ul>
                    </details>
                  </li>
                </>
              ) : (
                <li>
                  <a onClick={() => navigate("/signin")}>SIGN IN</a>
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
