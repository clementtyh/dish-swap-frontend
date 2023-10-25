import axios from "axios";
import urlcat from "urlcat";

const SERVER = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_PROD
  : import.meta.env.VITE_API_URL_DEV;

const verifyToken = async () => {
  const url = urlcat(SERVER, "/auth/verify");

  const token = sessionStorage.getItem("token");

  if (!token) {
    sessionStorage.clear();
    return false;
  }

  const result = await axios
    .post(
      url,
      {},
      {
        headers: { Authorization: "Bearer " + token },
      }
    )
    .then(() => {
      return true;
    })
    .catch(() => {
      sessionStorage.clear();
      return false;
    });

  return result;
};

export default verifyToken;
