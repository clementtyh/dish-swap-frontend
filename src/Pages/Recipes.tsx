import { useState, useContext } from "react";
import { useQuery } from "react-query";

import { authContext } from "../utils/context.js";

import IRecipe from "../types/RecipeInterface.js";

import Container from "../components/Container.js";
import CardsGrid from "../components/CardsGrid.js";
import PaginationButtons from "../components/PaginationButtons.js";

interface RecipesPageData {
  count: number;
  recipes: IRecipe[];
}

function Recipes() {
  const [page, setPage] = useState(1);

  const { token } = useContext(authContext);

  const { isLoading, isError, data } = useQuery({
    queryKey: ["recipes", page],
    queryFn: async (): Promise<RecipesPageData> => {
      const headers = new Headers();
      if (token) {
        headers.append("Authorization", `Bearer ${token}`);
      }

      const response = await fetch(
        `${
          import.meta.env.PROD
            ? import.meta.env.VITE_API_URL_PROD
            : import.meta.env.VITE_API_URL_DEV
        }/recipe?page=${page}`,
        {
          headers,
        }
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
    <Container>
      <main className="mt-16">
        {!isLoading && !isError && data && (
          <>
            <CardsGrid cards={data.recipes} page={page} />
            <PaginationButtons
              pages={Math.ceil(data.count / 9)}
              page={page}
              setPage={setPage}
            />
          </>
        )}
      </main>
    </Container>
  );
}

export default Recipes;
