import { useState } from "react";
import { useQuery } from "react-query";

import IRecipe from "../types/RecipeInterface.js";

import Container from "../components/Container.js";
import CardsGrid from "../components/CardsGrid.js";
import PaginationButtons from "../components/PaginationButtons.js";

interface RecipesPageData {
  count: number;
  recipes: IRecipe[];
}

function Home() {
  const [page, setPage] = useState(1);

  const { isLoading, isError, data } = useQuery({
    queryKey: ["recipes", page],
    queryFn: async (): Promise<RecipesPageData> => {
      const response = await fetch(`http://0.0.0.0:8081/recipe/all/${page}`);
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
  );
}

export default Home;
