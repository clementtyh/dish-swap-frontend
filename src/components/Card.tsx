import { Link } from "react-router-dom";

import IRecipe from "../types/RecipeInterface.js";

interface CardProps extends IRecipe {}

function Card({
  _id,
  recipe_name,
  image_files,
  recipe_description,
}: CardProps) {
  return (
    <Link to={`/recipe/${_id}`}>
      <div data-test="card" className="flex flex-col mb-5">
        <img
          className="object-cover w-full h-64 rounded-2xl"
          src={image_files[0]}
          alt={recipe_name}
        />
        <div className="flex justify-between mt-6">
          <h2 data-test="recipe-name" className="text-base lg:text-lg text-green-900 font-bold">{recipe_name}</h2>
        </div>
        <p className="text-sm lg:text-base mt-2 text-md">{recipe_description}</p>
      </div>
    </Link>
  );
}

export default Card;
