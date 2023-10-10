interface Recipe {
  _id: string;
  recipe_name: string;
  recipe_description: string;
  ingredients: string[];
  steps: string[];
  total_time: number;
  difficulty: string;
  servings: number;
  image_files: string[];
  created_by: string;
  last_updated_by: string;
}

export default Recipe;
