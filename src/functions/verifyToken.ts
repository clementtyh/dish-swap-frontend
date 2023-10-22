import axios from "axios";
import urlcat from "urlcat";
import * as fs from "fs";
import jwt from "jsonwebtoken";
import { result } from "lodash";

const SERVER = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_PROD
  : import.meta.env.VITE_API_URL_DEV;

const verifyToken = async () => {
  const url = urlcat(SERVER, "/auth/verify");

  const token = sessionStorage.getItem("token");

  if (!token) {
    return false;
  }

  const resultBackend = await axios
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
      return false;
    });

  // const publicKeyPath = import.meta.env.VITE_JWT_PUBLIC_KEY_PATH;
  
  // const publicKey = fs.readFileSync(publicKeyPath);
  // jwt.verify(token, publicKey, { algorithms: ["RS256"] }, function (err, payload) {
  //   if (err) {
  //     console.log(err.name, ": ", err.message)
  //   }
  // });

  // return resultBackend && resultFrontend;
  return resultBackend;
};

export default verifyToken;
