import { useState } from "react";
import { jwt_decode, JwtClaims } from "jwt-decode-es";

export const useDecoded = (
  token: string
): [JwtClaims, (newToken: string) => void] => {
  const [decoded, setDecodedRaw] = useState(token ? jwt_decode(token) : {});
  const setDecoded = (newToken: string): void =>
    setDecodedRaw(jwt_decode(newToken));

  return [decoded, setDecoded];
};
