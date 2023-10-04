import { JwtClaims } from "jwt-decode-es";

interface Decoded extends JwtClaims {
  id?: string;
}

interface AuthContext {
  token: string;
  setToken: (_: string) => void;
  decoded: Decoded;
  setDecoded: (_: string) => void;
}

export default AuthContext;
