import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import verifyToken from "../functions/verifyToken.js";
import landingimg from "/mock-images/landing/landing.jpg?url";
import ITokenValid from "../types/TokenValidInterface.js";

const Landing = ({ setIsTokenValid, isTokenValid }: ITokenValid) => {
  const [link, setLink] = useState("/signin")

    useEffect(() => {
      const authenticate = async () => {
        const result = await verifyToken();
  
        if (result) {
          setIsTokenValid(true);
        } else {
          setIsTokenValid(false);
        }
      };
  
      authenticate();
    }, []);

    useEffect(() => {
      if (isTokenValid) {
        setLink("/recipes")
      }
    }, [isTokenValid])

  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${landingimg})` }}
    >
      <div className="hero-content text-center text-neutral flex-col max-w-md gap-y-12 lg:gap-y-12 self-center">
        <h1 className="text-xl md:text-3xl lg:text-5xl font-bold">DISH SWAP</h1>
        <p className="text-xs md:text-sm lg:text-lg">
          Embark on a journey of flavor exploration, recipe sharing, and
          community engagement by uniting food enthusiasts, chefs, and home
          cooks in a vibrant gastronomic exchange
        </p>
        <Link
          className="btn btn-neutral btn-xs md:btn-md lg:btn-lg rounded-full px-3 lg:px-10 tracking-[0.35rem]"
          to={link}
        >
          INDULGE NOW
        </Link>
      </div>
    </div>
  );
};

export default Landing;
