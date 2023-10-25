import Recipe from "../types/RecipeInterface.js";

const difficultyLevelsMap = {
  easy: "1",
  medium: "2",
  hard: "3",
};

export const fDiff = (filter: string, recipes: Recipe[]): Recipe[] => {
  console.log("[Difficulty] Recipes Input (Start):", recipes);
  const split = filter.split("-");
  console.log("Wtf inside split:", split);
  console.log("[Difficulty] How many checked:", split.length);
  if (split.length === Object.keys(difficultyLevelsMap).length) return recipes;
  else if (split.length === 1) {
    switch (split[0]) {
      case "":
        return recipes;
      case "1":
        console.log("[Difficulty] Recipes Input (Easy)", recipes);
        // setRecipes(recipes.filter(recipe => recipe.difficulty === "easy"));
        return recipes.filter((recipe) => recipe.difficulty === "easy");
      // break;
      case "2":
        console.log("input recipes:", recipes);
        // setRecipes(recipes.filter(recipe => recipe.difficulty === "medium"));
        return recipes.filter((recipe) => recipe.difficulty === "medium");
      // break;
      case "3":
        console.log("input recipes:", recipes);
        // setRecipes(recipes.filter(recipe => recipe.difficulty === "hard"));
        return recipes.filter((recipe) => recipe.difficulty === "hard");
      // break;
    }
  } else if (split.length === 2) {
    if (!split.includes("1")) {
      console.log("Only 2 & 3 inside");
      console.log("input recipes:", recipes);
      // setRecipes(recipes.filter(recipe => recipe.difficulty !== "easy"));
      return recipes.filter((recipe) => recipe.difficulty !== "easy");
    } else if (!split.includes("2")) {
      console.log("Only 1 & 3 inside");
      console.log("input recipes:", recipes);
      // setRecipes(recipes.filter(recipe => recipe.difficulty !== "medium"));
      return recipes.filter((recipe) => recipe.difficulty !== "medium");
    } else {
      console.log("Only 1 & 2 inside");
      console.log("input recipes:", recipes);
      // setRecipes(recipes.filter(recipe => recipe.difficulty !== "hard"));
      return recipes.filter((recipe) => recipe.difficulty !== "hard");
    }
  }
  return recipes;
};

export const fIngre = (filter: string, recipes: Recipe[]): Recipe[] => {
  if (filter === "1") {
    console.log("[Ingredients] Recipes Input (<=5):", recipes);
    return recipes?.filter((recipe) => recipe.ingredients.length <= 5);
  } else {
    console.log("[Ingredients] Recipes Input (<=10):", recipes);
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
