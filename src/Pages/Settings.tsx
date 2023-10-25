import Container from "../components/Container.js";
import settingsIcon from "../content/svg/settingsIcon.svg";
import editIcon from "../content/svg/editIcon.svg";
import { useEffect, useState } from "react";
import axios from "axios";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateDisplayName from "../components/UpdateDisplayName.js";
import UpdatePassword from "../components/UpdatePassword.js";
import ITokenValid from "../types/TokenValidInterface.js";
import verifyToken from "../functions/verifyToken.js";
import urlcat from "urlcat";
import UnauthorisedPage from "./UnauthorisedPage.js";
import IProfileDetails from "../types/ProfileDetailsInterface.js";

const SERVER = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_PROD
  : import.meta.env.VITE_API_URL_DEV;

function Settings({ setIsTokenValid, isTokenValid }: ITokenValid) {
  const token = sessionStorage.getItem("token");
  const [profileDetails, setProfileDetails] = useState<IProfileDetails>({email: '', display_name: ''});
  const [displayNameChanged, setDisplayNameChanged] = useState(false);
  const getUserUrl = urlcat(SERVER, "/user/get_user");

  //check if token valid
  useEffect(() => {
    const authenticate = async () => {
      (await verifyToken()) ? setIsTokenValid(true) : setIsTokenValid(false);
    };

    authenticate();
  }, []);

  useEffect(() => {
    axios
      .get(getUserUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => setProfileDetails(res.data.payload))
      .catch((err) => console.log(err));
  }, [displayNameChanged]);

  return (
    <>
      <Container>
        {/* <div className="mt-32 justify-center"> */}
        {isTokenValid ? (
          <>
            <div className="mt-32 justify-center">
              <div className="flex flex-row">
                <img className="h-10" src={settingsIcon} />
                <p className="text-xl font-medium my-1 mx-5">Settings</p>
              </div>
              <div>
                <ToastContainer />
              </div>
              <div className="flex flex-col items-center">
                <div>
                  <div className="avatar justify-center my-5">
                    <div className="w-48 rounded-full">
                      <img src="https://www.womansworld.com/wp-content/uploads/2024/08/cute-cats.jpg?w=953" />
                    </div>
                  </div>
                  <button>
                    <img className="h-6 mx-4" src={editIcon} />
                  </button>
                </div>

                <div className="userDetails my-5 text-xs md:text-sm lg:text-lg font-medium grid grid-cols-3 gap-2">
                  <p>Display Name:</p>
                  <p className="text-center">{profileDetails.display_name}</p>

                  <label htmlFor="my_modal_7">
                    <img className="h-6 mx-14" src={editIcon} />
                  </label>
                  <UpdateDisplayName
                    profileDetails={profileDetails}
                    setDisplayNameChanged={setDisplayNameChanged}
                    displayNameChanged={displayNameChanged}
                  />

                  <p>Password:</p>
                  <p className="text-center">****************</p>

                  <label htmlFor="my_modal_6">
                    <img className="h-6 mx-14" src={editIcon} />
                  </label>
                  <UpdatePassword />

                  <p>Email:</p>
                  <p className="text-center">{profileDetails.email}</p>
                  {/* <button>
                <img className="h-6 mx-14" src={editIcon} />
              </button> */}
                </div>
              </div>
            </div>
          </>
        ) : (
          <UnauthorisedPage />
        )}
        {/* </div> */}
      </Container>
    </>
  );
}

export default Settings;
