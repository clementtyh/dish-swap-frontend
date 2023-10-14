import { format } from "date-fns";
import { useState } from "react";
import { Link } from "react-router-dom";

import IRecipe from "../types/RecipeInterface.js";

interface CardProps extends IRecipe {}

function Card({ _id, recipe_name, recipe_description, difficulty, created_date }: CardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <Link to={`/recipe/${_id}`}>
      <div className="flex flex-col">
        <img
          className="h-64 w-full object-cover rounded-2xl"
          src="https://www.culinaryhill.com/wp-content/uploads/2021/01/Chipotle-Tomato-Salsa-Copycat-Recipe-Culinary-Hill-1200x800-1.jpg"
          alt={recipe_name}
        />
        <div className="flex justify-between mt-6">
          <h2 className="text-xl text-green-900">{recipe_name}</h2>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsBookmarked(!isBookmarked);
            }}
          >
            {isBookmarked ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-yellow-500"
              >
                <path
                  fillRule="evenodd"
                  d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                className="w-6 h-6 stroke-yellow-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
            )}
          </button>
        </div>
        <p className="text-md mt-2">{recipe_description}</p>
        <p className="text-md mt-2">Difficulty level: <b>{difficulty}</b></p>
        <p className="text-md mt-2">{format(new Date(created_date), 'Pp (ccc)')}</p>
      </div>
    </Link>
  );
}

export default Card;
