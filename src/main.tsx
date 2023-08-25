import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import Recipe from "./recipe.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "flavourmark",
    element: <div>Flavourmark</div>,
  },
  {
    path: "profile",
    element: <div>Profile</div>,
  },
  {
    path: "recipe/:recipeId",
    element: <Recipe />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
