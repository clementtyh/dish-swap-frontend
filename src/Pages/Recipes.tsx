import { useEffect, useMemo, useState, useCallback } from "react";
import { useQuery } from "react-query";

import IRecipe from "../types/RecipeInterface.js";

import Container from "../components/Container.js";
import CardsGrid from "../components/CardsGrid.js";
import PaginationButtons from "../components/PaginationButtons.js";

import SearchBar from "../components/SearchBar.js";
import SortDropdown from "../components/SortDropdown.js";
import {
  defaultSort,
  sortNewest,
  // sortRating,
  sortDifficulty,
  sortCalories,
} from "../helpers/SortFunctions.js";
import Filter from "../components/Filter.js";
import filterIcon from "../content/svg/filterIcon.svg";
import { fDiff, fIngre } from "../helpers/FilterFunctions.js";
import { FilterSelection } from "../types/FilterInterface.js";

import ITokenValid from "../types/TokenValidInterface.js";
import verifyToken from "../functions/verifyToken.js";
import CreateUpdateRecipeModal from "../components/CreateUpdateRecipeModal.js";

interface IRecipesData {
  count: number;
  recipes: IRecipe[];
}

function Recipes({ setIsTokenValid, isTokenValid }: ITokenValid) {
  // HTML URLSearchParams
  let searchParams = useMemo(
    () => new URLSearchParams(window.location.search),
    []
  );

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [filters, setFilters] = useState({
    difficulty: "",
    ingredients: "",
    calories: "",
  });
  const [sortValue, setSortValue] = useState("newest");
  const [isOpen, setIsOpen] = useState(false);

  // search params manipulation
  useEffect(() => {
    for (const key in filters)
      filters[key as keyof FilterSelection] === ""
        ? searchParams?.delete(key)
        : searchParams?.set(key, filters[key as keyof FilterSelection]);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${searchParams}`
    );

    if (sortValue) {
      searchParams.set("sortby", sortValue);
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${searchParams}`
      );
    }
  }, [filters, sortValue, searchParams, searchQuery]);

  //check if token valid
  useEffect(() => {
    const authenticate = async () => {
      (await verifyToken()) ? setIsTokenValid(true) : setIsTokenValid(false);
    };

    authenticate();
  }, []);

  const { isLoading, isError, data } = useQuery({
    queryKey: ["recipes", page],
    queryFn: async (): Promise<IRecipesData> => {
      const response = await fetch(
        `${
          import.meta.env.PROD
            ? import.meta.env.VITE_API_URL_PROD
            : import.meta.env.VITE_API_URL_DEV
        }/recipe/?page=${page}&search=${searchQuery}`
      );
      const count = parseInt(response.headers.get("x-total-count") as string);
      const recipes = await response.json();

      return {
        count,
        recipes,
      };
    },
    select: useCallback(
      (data: IRecipesData) => {
        const rawRecipes = data.recipes;

        const filteredRecipes = fIngre(
          filters.ingredients,
          fDiff(filters.difficulty, rawRecipes)
        );

        let sortedFilteredRecipes;
        switch (sortValue) {
          case "newest":
            sortedFilteredRecipes = sortNewest(defaultSort(filteredRecipes));
            break;
          // case "rating":
          //   sortedFilteredRecipes = sortRating(defaultSort(filteredRecipes));
          //   break;
          case "difficulty":
            sortedFilteredRecipes = sortDifficulty(
              defaultSort(filteredRecipes)
            );
            break;
          case "calories":
            sortedFilteredRecipes = sortCalories(defaultSort(filteredRecipes));
            break;
          default:
            sortedFilteredRecipes = defaultSort(filteredRecipes);
        }

        return {
          ...data,
          recipes: sortedFilteredRecipes,
        };
      },
      [filters, sortValue]
    ),
  });

  return (
    <>
      <Container>
        <main className="mt-16">
          <div className="flex flex-row">
            <div className="flex-none mr-6 lg:w-2/5 md:w-2/3 ">
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
            <SortDropdown sortValue={sortValue} setSortValue={setSortValue} />

            <label
              htmlFor="my_modal_6"
              className="h-10 px-3 py-1 mx-4 rounded-2xl w-1/8"
              style={{ backgroundColor: "#DDE0BD" }}
            >
              <img src={filterIcon} />
            </label>

            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box">
                <Filter
                  filters={filters}
                  setFilters={setFilters}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              </div>
              <label className="modal-backdrop" htmlFor="my_modal_6">
                Close
              </label>
            </div>
          </div>
          {isTokenValid && (
            <CreateUpdateRecipeModal recipeData={null} recipeId={null} />
          )}
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
    </>
  );
}

export default Recipes;
