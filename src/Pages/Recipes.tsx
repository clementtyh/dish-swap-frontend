
// @ts-nocheck
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
  // sortRating,
  sortDifficulty,
  sortCalories,
} from "../helpers/SortFunctions.js";
import Filter from "../components/Filter.js";
import filterIcon from "../content/svg/filterIcon.svg";
import { overallFilter } from "../helpers/FilterFunctions.js";
import { FilterSelection } from "../types/FilterInterface.js";
import Recipe from "../types/RecipeInterface.js";

import ITokenValid from "../types/TokenValidInterface.js";
import verifyToken from "../functions/verifyToken.js";
import CreateUpdateRecipeModal from "../components/CreateUpdateRecipeModal.js";
import urlcat from "urlcat";

const SERVER = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_PROD
  : import.meta.env.VITE_API_URL_DEV;


interface IRecipesData {
  count: number;
  recipes: IRecipe[];
}


const onSubmitFilter = (
  e: React.MouseEvent<HTMLLabelElement>,
  filterSet: FilterSelection,
  params: URLSearchParams,
  recipesData: Recipe[],
  // filteredRecipes,
  setFilteredRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  isOpen: boolean
): void => {
  e.preventDefault();
  for (const key in filterSet)
    filterSet[key as keyof FilterSelection] === ""
      ? params?.delete(key)
      : params?.set(key, filterSet[key as keyof FilterSelection]);
  window.history.replaceState({}, "", `${window.location.pathname}?${params}`);
  setIsOpen(!isOpen);

  const modal = document.getElementById("my_modal_6") as HTMLInputElement; 
  modal.checked = false;

  const { difficulty, ingredients, calories } = filterSet;
  overallFilter(
    recipesData,
    setFilteredRecipes,
    difficulty,
    ingredients,
    // calories
  );
};

const onClearFilter = (
  setFilters: React.Dispatch<React.SetStateAction<FilterSelection>>,
  filters: FilterSelection,
  params:URLSearchParams,
  setFilteredRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>,
  recipesData: Recipe[]
) => {
  setFilters({
    difficulty: "",
    ingredients: "",
    calories: "",
  });
  for (const key in filters) params.delete(key);
  window.history.replaceState({}, "", `${window.location.pathname}?${params}`);
  setFilteredRecipes(recipesData);
};

function Recipes({ setIsTokenValid, isTokenValid }: ITokenValid) {
  // const [page, setPage] = useState(1);

  // HTML URLSearchParams
  let searchParams = useMemo(
    () => new URLSearchParams(window.location.search),
    []
  );
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  const [recipesData, setRecipesData] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState(recipesData);
  const [sortValue, setSortValue] = useState("newest");

  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    difficulty: "",
    ingredients: "",
    calories: "",
  });

  const searchRecipesUrl = urlcat(SERVER, `/recipe/?search=${searchQuery}`);
  useEffect(() => {
    axios
      .get(searchRecipesUrl)
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
        // case "rating":
        //   setFilteredRecipes(sortRating(defaultSort(filteredRecipes)));
        //   break;
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

  const [page, setPage] = useState(1);

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
        {isTokenValid && <CreateUpdateRecipeModal recipeData={null} recipeId={null} />}
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

          {/* The button to open modal */}
          <label
            htmlFor="my_modal_6"
            // className="btn"
            className=" h-10 px-3 mx-4 py-1 rounded-2xl w-1/8 bg-[#DDE0BD]"
          >
            <img src={filterIcon} />
          </label>

          {/* Put this part before </body> tag */}
          <input type="checkbox" id="my_modal_6" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <Filter
                filters={filters}
                setFilters={setFilters}
                recipesData={recipesData}
                setFilteredRecipes={setFilteredRecipes}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
              <div></div>
              <div className="modal-action grid grid-cols-6 gap-4">
                <div className="p-3 col-start-1 col-end-3 ">
                  <label
                    htmlFor="my_modal_6"
                    className="link link-primary text-sm font-semibold"
                    onClick={() =>
                      onClearFilter(
                        setFilters,
                        filters,
                        searchParams,
                        setFilteredRecipes,
                        recipesData
                      )
                    }
                  >
                    CLEAR ALL
                  </label>
                </div>
                <div className="col-end-7 col-span-2">
                  <label
                    htmlFor="my_modal_6"
                    className="btn"
                    // className="btn normal-case"
                    onClick={(e) =>
                      onSubmitFilter(
                        e,
                        filters,
                        searchParams,
                        recipesData,
                        // filteredRecipes,
                        setFilteredRecipes,
                        setIsOpen,
                        isOpen
                      )
                    }
                  >
                    Filter for Me
                  </label>
                </div>
              </div>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_6">
              Close
            </label>
          </div>

          {/* 
          <div
            className="h-10 px-3 mx-4 py-1 rounded-2xl w-1/8"
            style={{ backgroundColor: "#DDE0BD" }}
          >
            <button onClick={() => setIsOpen(!isOpen)}>
              <img src={filterIcon} />
            </button>
          </div> */}
          {/* {isOpen && (
            <Filter
              filters={filters}
              setFilters={setFilters}
              recipesData={recipesData}
              setFilteredRecipes={setFilteredRecipes}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          )} */}
        </div>
        <CardsGrid cards={filteredRecipes} />
      </Container>
    </>
  );
}

export default Recipes;
