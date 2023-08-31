interface Card {
  id: number;
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
}

export default Card;
