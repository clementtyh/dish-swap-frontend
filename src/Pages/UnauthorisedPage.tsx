import { useNavigate } from "react-router-dom";

function UnauthorisedPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <div className="w-1/2">
            <img
              src={
                "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9udXR8ZW58MHx8MHx8fDA%3D"
              }
              className="rounded-3xl shadow-lg"
            />
          </div>
          <div className="w-1/2 flex flex-col items-center text-center gap-5">
            <h1 className="text-5xl font-bold">Whoops!</h1>
            <p className="py-6">
              You need to have an account to access this page.
            </p>
            <div className="flex flex-row gap-6">
              <button
                className="btn btn-active"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
              <button
                className="btn btn-active"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UnauthorisedPage;