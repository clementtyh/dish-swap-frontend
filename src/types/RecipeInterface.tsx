import IReview from "./ReviewInterface.js";

interface Recipe {
  _id: string;
  name: string;
  imgPath: string;
  description: string;
  ingredients: string[];
  preparationSteps: string[];
  nutrition: {
    calories: string;
    protein: string;
    fat: string;
    carbohydrates: string;
    fiber: string;
    sugar: string;
  };
  difficulty: string;
  totalTime: string;
  servings: number;
  reviews: IReview[];
  flavourmarkCount: number;
  flavourmarks: string[];
}

export default Recipe;
