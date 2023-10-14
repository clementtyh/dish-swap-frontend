import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

import IRecipe from "../types/RecipeInterface.js";

import Container from "../components/Container.js";
import CardsGrid from "../components/CardsGrid.js";
import PaginationButtons from "../components/PaginationButtons.js";
import SearchBar from "../components/SearchBar.js";
import axios from "axios";
import SortDropdown from "../components/SortDropdown.js";
import {
  defaultSort,
  sortNewest,
  sortRating,
  sortDifficulty,
  sortCalories,
} from "../helpers/SortFunctions.js";

interface RecipesPageData {
  count: number;
  recipes: IRecipe[];
}

function Recipes() {
  const [page, setPage] = useState(1);

  // HTML URLSearchParams
  let searchParams = useMemo(
    () => new URLSearchParams(window.location.search),
    []
  );
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  const [recipesData, setRecipesData] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState(recipesData);
  const [sortValue, setSortValue] = useState("newest");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/recipe/?search=${searchQuery}`)
      .then((res) => {
        setRecipesData(sortNewest(defaultSort(res.data)));
        setFilteredRecipes(sortNewest(defaultSort(res.data)));
      });
  }, [searchQuery]);

  useEffect(() => {
    if (sortValue) {
      searchParams.set("sortby", sortValue);
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${searchParams}`
      );
      switch (sortValue) {
        case "newest":
          setFilteredRecipes(sortNewest(defaultSort(filteredRecipes)));
          break;
        case "rating":
          setFilteredRecipes(sortRating(defaultSort(filteredRecipes)));
          break;
        case "difficulty":
          setFilteredRecipes(sortDifficulty(defaultSort(filteredRecipes)));
          break;
        case "calories":
          setFilteredRecipes(sortCalories(defaultSort(filteredRecipes)));
          break;
        default:
          setFilteredRecipes(defaultSort(filteredRecipes));
      }
    }
  }, [sortValue, searchParams, searchQuery]);

  const { isLoading, isError, data } = useQuery({
    queryKey: ["recipes", page],
    queryFn: async (): Promise<RecipesPageData> => {
      const response = await fetch(
        `${
          import.meta.env.PROD
            ? import.meta.env.VITE_API_URL_PROD
            : import.meta.env.VITE_API_URL_DEV
        }/recipe?page=${page}`
      );
      const count = parseInt(response.headers.get("x-total-count") as string);
      const recipes = await response.json();

      return {
        count,
        recipes,
      };
    },
  });

  return (
    <>
      <Container>
        <main className="mt-16">
          {!isLoading && !isError && data && (
            <>
              <CardsGrid cards={data.recipes} />
              <PaginationButtons
                pages={Math.ceil(data.count / 9)}
                page={page}
                setPage={setPage}
              />
            </>
          )}
        </main>
      </Container>
      <Container>
        <div className="flex flex-row">
          <div className="flex-none mr-6 lg:w-2/5 md:w-2/3 ">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          <SortDropdown sortValue={sortValue} setSortValue={setSortValue} />
        </div>
        <CardsGrid cards={filteredRecipes} />
      </Container>
    </>
  );
}

export default Recipes;
