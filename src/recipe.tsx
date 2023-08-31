import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import recipesData from "../mock-data/recipes.json";

import ICard from "./types/CardInterface";

import Container from "./components/Container";
import NavBar from "./components/NavBar";
import ReviewCardsGrid from "./components/ReviewCardsGrid";
import PaginationButtons from "./components/PaginationButtons";

function Recipe() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [reviewsPage, setReviewsPage] = useState(1);

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
          <>
            <div className="flex justify-between items-end">
              <h1 className="text-4xl text-green-900 font-bold uppercase">
                {data.name}
              </h1>
              <button
                className="flex items-center gap-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsBookmarked(!isBookmarked);
                }}
              >
                {isBookmarked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 fill-yellow-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    className="w-8 h-8 stroke-yellow-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                  </svg>
                )}
                <p className="text-green-900 text-xl font-bold">642</p>
              </button>
            </div>
            <p className="text-md mt-4 max-w-full lg:max-w-[50%]">
              {data.description}
            </p>
            <img
              className="mt-8 h-96 w-full object-cover rounded-xl"
              src={data.imgPath}
              alt={data.name}
            />
            <div className="flex mt-16 gap-8 flex-col lg:flex-row">
              <div className="w-full lg:w-2/3">
                <div className="bg-[#dce0ba] rounded-lg p-4">
                  <p className="text-xl text-green-900 font-bold">
                    Ingredients
                  </p>
                  <ul className="flex flex-col gap-4 mt-4 list-disc list-inside ">
                    {data.ingredients.map((ingredient) => (
                      <li>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#dce0ba] rounded-lg mt-8 p-4">
                  <p className="text-xl text-green-900 font-bold">
                    Preparation Steps
                  </p>
                  <ol className="flex flex-col gap-4 mt-4 list-decimal list-inside">
                    {data.preparationSteps.map((step) => (
                      <li>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="w-full lg:w-1/3">
                <div className="flex flex-col gap-8 bg-[#eedcb4] rounded-lg p-8">
                  <div className="flex justify-between">
                    <p className="text-xl text-green-900 font-bold">
                      Difficulty
                    </p>
                    <p className="text-xl text-[#8eb44f]">{data.difficulty}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-xl text-green-900 font-bold">
                      Total Time
                    </p>
                    <p className="text-xl text-[#8eb44f]">{data.totalTime}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-xl text-green-900 font-bold">Servings</p>
                    <p className="text-xl text-[#8eb44f]">{data.servings}</p>
                  </div>
                </div>
                <div className="bg-[#eedcb4] rounded-lg p-4 mt-8">
                  <p className="text-xl text-green-900 font-bold">
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
            <div className="flex flex-col items-center w-full mt-16">
              <h2 className="text-xl text-green-900 font-bold">Reviews</h2>
              <div className="mt-16 w-full">
                <ReviewCardsGrid
                  cards={data.reviews.slice(
                    (reviewsPage - 1) * 6,
                    reviewsPage * 6
                  )}
                />
              </div>
              <div>
                <PaginationButtons
                  pages={Math.ceil(data.reviews.length / 6)}
                  page={reviewsPage}
                  setPage={setReviewsPage}
                />
              </div>
            </div>
          </>
        )}
      </main>
    </Container>
  );
}

export default Recipe;
