// import IReview from "./ReviewInterface.js";

interface Recipe {
  _id: string;
  recipe_name: string;
  // imgPath: string;
  image_files: string[]; 
  recipe_description: string;
  ingredients: string[];
  steps: string[];
  // nutrition: {
  //   calories: string;
  //   protein: string;
  //   fat: string;
  //   carbohydrates: string;
  //   fiber: string;
  //   sugar: string;
  // };
  difficulty: string;
  total_time: string;
  servings: number;
  // reviews: IReview[];
  created_by: string; 
  created_date: Date; 
  last_updated_by: string; 
  last_updated_date: Date; 
}

export default Recipe;
