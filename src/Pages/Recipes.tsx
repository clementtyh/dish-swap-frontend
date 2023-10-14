import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

import IRecipe from "../types/RecipeInterface.js";

import Container from "../components/Container.js";
import CardsGrid from "../components/CardsGrid.js";
import PaginationButtons from "../components/PaginationButtons.js";
import SearchBar from "../components/SearchBar.js";
import axios from "axios";

interface RecipesPageData {
  count: number;
  recipes: IRecipe[];
}

function Recipes() {
  const [page, setPage] = useState(1);
  
  // HTML URLSearchParams
  let searchParams = useMemo(() => new URLSearchParams(window.location.search), [])
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  const [recipesData, setRecipesData] = useState([]); 

    useEffect(() => {
    axios
      .get(`http://localhost:8080/recipe/?search=${searchQuery}`)
      .then((res) => {
        setRecipesData(res.data);
        // setFilteredRecipes(res.data);
      });
  }, [searchQuery])

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
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <CardsGrid cards={recipesData} />
      </Container>

    </>
  );
}

export default Recipes;
