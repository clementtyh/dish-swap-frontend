import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Pages/Layout.js";
import Landing from "./Pages/Landing.js";
import SignIn from "./Pages/SignIn.js";
import SignUp from "./Pages/SignUp.js";
import Recipes from "./Pages/Recipes.js";
import Recipe from "./Pages/Recipe.js";

import "./index.css";

function App() {
  const [isTokenValid, setIsTokenValid] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout isTokenValid={isTokenValid} setIsTokenValid={setIsTokenValid}/>,
      children: [
        {
          path: "/",
          element: <Landing />,
        },
        {
          path: "signup",
          element: <SignUp isTokenValid={isTokenValid} setIsTokenValid={setIsTokenValid}/>,
        },
        {
          path: "signin",
          element: 
            <SignIn isTokenValid={isTokenValid} setIsTokenValid={setIsTokenValid}/>
          ,
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

  return <RouterProvider router={router} />;
}

export default App;
