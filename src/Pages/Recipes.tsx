import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import IRecipe from "../types/RecipeInterface.js";

import Container from "../components/Container.js";
import CardsGrid from "../components/CardsGrid.js";
import PaginationButtons from "../components/PaginationButtons.js";
import ITokenValid from "../types/TokenValidInterface.js";
import verifyToken from "../functions/verifyToken.js";
import CreateUpdateRecipeModal from "../components/CreateUpdateRecipeModal.js";

interface IRecipesData {
  count: number;
  recipes: IRecipe[];
}

function Recipes({ setIsTokenValid, isTokenValid }: ITokenValid) {
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
    <Container>
      <main className="mt-24">
        {/* possibly insert search stuff here, will rearrange create recipe buttons accordingly later since dont have others now*/}
        {isTokenValid && <CreateUpdateRecipeModal />}
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

export default Recipes;
