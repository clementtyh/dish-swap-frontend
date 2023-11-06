import Recipe from "../types/RecipeInterface.js";

const difficultyLevelsMap = {
  easy: "1",
  medium: "2",
  hard: "3",
};

export const fDiff = (filter: string, recipes: Recipe[]): Recipe[] => {
  const split = filter.split("-");

  if (split.length === Object.keys(difficultyLevelsMap).length) return recipes;
  else if (split.length === 1) {
    switch (split[0]) {
      case "":
        return recipes;
      case "1":
        // setRecipes(recipes.filter(recipe => recipe.difficulty === "easy"));
        return recipes.filter((recipe) => recipe.difficulty.toLowerCase() === "easy");
      // break;
      case "2":
        // setRecipes(recipes.filter(recipe => recipe.difficulty === "medium"));
        return recipes.filter((recipe) => recipe.difficulty.toLowerCase() === "medium");
      // break;
      case "3":
        // setRecipes(recipes.filter(recipe => recipe.difficulty === "hard"));
        return recipes.filter((recipe) => recipe.difficulty.toLowerCase() === "hard");
      // break;
    }
  } else if (split.length === 2) {
    if (!split.includes("1")) {
      // setRecipes(recipes.filter(recipe => recipe.difficulty !== "easy"));
      return recipes.filter((recipe) => recipe.difficulty.toLowerCase() !== "easy");
    } else if (!split.includes("2")) {
      // setRecipes(recipes.filter(recipe => recipe.difficulty !== "medium"));
      return recipes.filter((recipe) => recipe.difficulty.toLowerCase() !== "medium");
    } else {
      // setRecipes(recipes.filter(recipe => recipe.difficulty !== "hard"));
      return recipes.filter((recipe) => recipe.difficulty.toLowerCase() !== "hard");
    }
  }
  return recipes;
};

export const fIngre = (filter: string, recipes: Recipe[]): Recipe[] => {
  if (filter === "1") {
    return recipes?.filter((recipe) => recipe.ingredients.length <= 5);
  } else {
    return recipes?.filter((recipe) => recipe.ingredients.length <= 10);
  }
};

// const fCal = (filter: string, recipes: Recipe[]): Recipe[] => {
//     console.log("[Calories] Recipes inpput:", recipes);
//     console.log("[Calories] Filter.split:", filter.split("-"))

//     if (filter.split("-")[0] === "") return recipes;
//     else {
//         const [min, max] = filter.split("-");
//         console.log("Min Cal value:", min);
//         console.log("Max Cal value:", max);
//         return recipes?.filter(recipe => parseInt(recipe.nutrition.calories) >= parseInt(min) && parseInt(recipe.nutrition.calories) <= parseInt(max));
//     }

// }
