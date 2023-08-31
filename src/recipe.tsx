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
            <div className="flex mt-16 gap-8">
              <div className="w-2/3">
                <div className="bg-[#dce0ba] rounded-lg p-4">
                  <p className="text-xl text-green-800">Ingredients</p>
                  <ul className="flex flex-col gap-4 mt-4 list-disc list-inside ">
                    {data.ingredients.map((ingredient) => (
                      <li>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#dce0ba] rounded-lg mt-8 p-4">
                  <p className="text-xl text-green-800">Preparation Steps</p>
                  <ol className="flex flex-col gap-4 mt-4 list-decimal list-inside">
                    {data.preparationSteps.map((step) => (
                      <li>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="w-1/3">
                <div className="flex flex-col gap-8 bg-[#eedcb4] rounded-lg p-8">
                  <div className="flex justify-between">
                    <p className="text-xl text-green-800">Difficulty</p>
                    <p className="text-xl text-[#8eb44f]">{data.difficulty}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-xl text-green-800">Total Time</p>
                    <p className="text-xl text-[#8eb44f]">{data.totalTime}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-xl text-green-800">Servings</p>
                    <p className="text-xl text-[#8eb44f]">{data.servings}</p>
                  </div>
                </div>
                <div className="bg-[#eedcb4] rounded-lg p-4 mt-8">
                  <p className="text-xl text-green-800">
                    Nutritional Information (per serving)
                  </p>
                  <ul className="flex flex-col gap-4 mt-4 list-disc list-inside ">
                    {Object.entries(data.nutrition).map(([key, value]) => (
                      <li>
                        {key}: {value}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </Container>
  );
}

export default Recipe;
