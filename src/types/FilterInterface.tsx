import Recipe from "./RecipeInterface.js";

export interface FilterSelection {
    difficulty: string;
    ingredients: string; 
    calories: string;
}

export interface IFilter {
    filters: FilterSelection; 
    setFilters: React.Dispatch<React.SetStateAction<FilterSelection>>;
    searchParams: URLSearchParams; 
    recipesData: Recipe[]; 
    setFilteredRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
    isOpen: boolean; 
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; 
}

