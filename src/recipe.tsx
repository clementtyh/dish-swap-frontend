import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import recipesData from "../mock-data/recipes.json";

import ICard from "./types/CardInterface";

import Container from "./components/Container";
import NavBar from "./components/NavBar";

function Recipe() {
  const { recipeId } = useParams();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["recipe", recipeId],
    queryFn: () =>
      new Promise<ICard>((resolve) =>
        resolve(recipesData.find((d) => d.id === Number(recipeId)) as ICard)
      ),
  });

  return (
    <Container>
      <NavBar />
      <main className="mt-16">
        {!isLoading && !isError && data && (
          <div>
            <h1 className="text-4xl text-green-800">{data.name}</h1>
            <p className="text-md mt-4">{data.description}</p>
            <img
              className="mt-8 h-96 w-full object-cover rounded-xl"
              src={data.imgPath}
              alt={data.name}
            />
          </div>
        )}
      </main>
    </Container>
  );
}

export default Recipe;
