import { useNavigate } from "react-router-dom";
import verifyToken from "../functions/verifyToken.js";
import landingimg from "/mock-images/landing/landing.jpg?url";

const Landing = () => {
  const navigate = useNavigate();

  const link = async () => {
    const result = await verifyToken();
    const linkString = result ? "/recipes" : "/signup";
    navigate(linkString);
  };

  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${landingimg})` }}
    >
      <div className="hero-content text-center text-neutral flex-col max-w-md gap-y-20 sm:gap-y-36 self-center">
        <h1 className="text-5xl font-bold">DISH SWAP</h1>
        <p>
          Embark on a journey of flavor exploration, recipe sharing, and
          community engagement by uniting food enthusiasts, chefs, and home
          cooks in a vibrant gastronomic exchange
        </p>
        <button
          className="btn btn-neutral rounded-full px-10 tracking-[0.35rem]"
          onClick={link}
        >
          INDULGE NOW
        </button>
      </div>
    </div>
  );
};

export default Landing;
