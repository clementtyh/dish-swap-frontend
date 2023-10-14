//* SORT
// Always sort by alphabetical regardless
// Newest (Based on time of adding by users), Highest Rated, Difficulty, Least Calories
export const defaultSort = (recipes) => {
    return recipes.toSorted((a,b) => {
        if (a.recipe_name < b.recipe_name) return -1; 
        if (a.recipe_name > b.recipe_name) return 1; 
        return 0; 
    })
}; 


//* Newest (Pending)
export const sortNewest = (recipes) => {
    // return recipes.toSorted((a,b) => b.created_date - a.created_date); 
    return recipes.toSorted((a,b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime())
}

export const calculateAvgRating = (recipe) => {
    return recipe.reviews?.reduce((previous, current) => {return previous + current.rating}, 0) / recipe.reviews?.length; 
}

//* Highest Rated
export const sortRating = (recipes) => {
    return recipes.toSorted((a,b) => calculateAvgRating(b) - calculateAvgRating(a)); 
}

//* Difficulty 
// const sortMap = {"easy": 0, "medium": 1, "hard": 2}; 
export const sortDifficulty = (recipes) => {
    const sortMap = {"easy": 0, "medium": 1, "hard": 2}; 
    return recipes.toSorted((a,b) => sortMap[a.difficulty] - sortMap[b.difficulty]); 
}; 

//* Least Calories
export const sortCalories = (recipes) => {
    return recipes.toSorted((a,b) => parseInt(a.nutrition.calories) - parseInt(b.nutrition.calories)); 
}; 