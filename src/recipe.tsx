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
                    <li>1 cup Greek yoghurt</li>
                    <li>2 tablespoons honey</li>
                    <li>1/2 cup granola</li>
                    <li>
                      1/2 cup mixed berries (strawberries, blueberries,
                      raspberries)
                    </li>
                  </ul>
                </div>
                <div className="bg-[#dce0ba] rounded-lg mt-8 p-4">
                  <p className="text-xl text-green-800">Preparation Steps</p>
                  <ol className="flex flex-col gap-4 mt-4 list-decimal list-inside">
                    <li>
                      In a bowl, mix Greek yogurt with honey until well
                      combined.
                    </li>
                    <li>
                      Start assembling the parfait in glasses or bowls. Begin
                      with a spoonful of the Greek yogurt mixture at the bottom.
                    </li>
                    <li>Add a layer of granola on top of the yogurt.</li>
                    <li>Follow with a layer of mixed berries.</li>
                    <li>
                      Repeat the layers until you've used up all the
                      ingredients, finishing with a few berries on top.
                    </li>
                    <li>
                      Serve immediately or refrigerate until ready to enjoy.
                    </li>
                    <li>
                      To eat, you can either mix all the layers together or
                      scoop each layer with a spoon for a variety of flavors in
                      each bite.
                    </li>
                  </ol>
                </div>
              </div>
              <div className="w-1/3">
                <div className="flex flex-col gap-8 bg-[#eedcb4] rounded-lg p-8">
                  <div className="flex justify-between">
                    <p className="text-xl text-green-800">Difficulty</p>
                    <p className="text-xl text-[#8eb44f]">Easy</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-xl text-green-800">Total Time</p>
                    <p className="text-xl text-[#8eb44f]">10 mins</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-xl text-green-800">Servings</p>
                    <p className="text-xl text-[#8eb44f]">1</p>
                  </div>
                </div>
                <div className="bg-[#eedcb4] rounded-lg p-4 mt-8">
                  <p className="text-xl text-green-800">
                    Nutritional Information (per serving)
                  </p>
                  <ul className="flex flex-col gap-4 mt-4 list-disc list-inside ">
                    <li>Calories: 220</li>
                    <li>Protein: 12g</li>
                    <li>Fat: 5g</li>
                    <li>Carbohydrates: 35g</li>
                    <li>Fiber: 4g</li>
                    <li>Sugar: 20g</li>
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
