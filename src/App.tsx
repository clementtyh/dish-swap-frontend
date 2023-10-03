import { useState, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { authContext } from "./context.js";
import Layout from "./Pages/Layout.js";
import Landing from "./Pages/Landing.js";
import SignIn from "./Pages/SignIn.js";
import SignUp from "./Pages/SignUp.js";
import Recipes from "./Pages/Recipes.js";
import Recipe from "./Pages/Recipe.js";

import "./index.css";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [token, setToken] = useState("");

  const authContextValue = useMemo(() => ({ token, setToken }), [token]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout isSignedIn={isSignedIn} />,
      children: [
        {
          path: "/",
          element: <Landing />,
        },
        {
          path: "signup",
          element: <SignUp isSignedIn={isSignedIn} />,
        },
        {
          path: "signin",
          element: (
            <SignIn setIsSignedIn={setIsSignedIn} isSignedIn={isSignedIn} />
          ),
        },
        {
          path: "recipes",
          element: <Recipes />,
        },
        {
          path: "flavourmarks",
          element: <div>Flavourmarks</div>,
        },
        {
          path: "profile",
          element: <div>Profile</div>,
        },
        {
          path: "recipe/:recipeId",
          element: <Recipe />,
        },
      ],
    },
  ]);

  return (
    <authContext.Provider value={authContextValue}>
      <RouterProvider router={router} />
    </authContext.Provider>
  );
}

export default App;
