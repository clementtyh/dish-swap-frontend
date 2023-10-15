interface Filter {
    filters: object; 
    setFilters: React.Dispatch<React.SetStateAction<object>>;
    searchParams: URLSearchParams; 
    recipesData: string[]; 
    setFilteredRecipes: React.Dispatch<React.SetStateAction<string[]>>;
    isOpen: boolean; 
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; 
}

export default Filter; 