import IReview from "./ReviewInterface.js";

interface Recipe {
  _id: string;
  recipe_name: string;
  imgPath: string;
  recipe_description: string;
  ingredients: string[];
  steps: string[];
  nutrition: {
    calories: string;
    protein: string;
    fat: string;
    carbohydrates: string;
    fiber: string;
    sugar: string;
  };
  difficulty: string;
  total_time: string;
  servings: number;
  reviews: IReview[];
}

export default Recipe;
