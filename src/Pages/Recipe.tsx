import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "react-query";

import { authContext } from "../utils/context.js";

import IRecipe from "../types/RecipeInterface.js";

import Container from "../components/Container.js";
import ReviewCardsGrid from "../components/ReviewCardsGrid.js";
import PaginationButtons from "../components/PaginationButtons.js";

function Recipe() {
  const [reviewsPage, setReviewsPage] = useState(1);
  const [mode, setMode] = useState("add-flavourmark");

  const { token, decoded } = useContext(authContext);

  const { recipeId } = useParams();

  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["recipe", recipeId],
    queryFn: async (): Promise<IRecipe> => {
      const headers = new Headers();
      if (token) {
        headers.append("Authorization", `Bearer ${token}`);
      }

      const response = await fetch(
        `${
          import.meta.env.PROD
            ? import.meta.env.VITE_API_URL_PROD
            : import.meta.env.VITE_API_URL_DEV
        }/recipe/${recipeId}`,
        {
          headers,
        }
      );
      return response.json();
    },
  });

  useEffect(() => {
    setMode(
      data?.flavourmarks.length ? "remove-flavourmark" : "add-flavourmark"
    );
  }, [data]);

  const { mutate } = useMutation({
    mutationFn: async (recipeId: string): Promise<IRecipe> => {
      const headers = new Headers();
      if (token) {
        headers.append("Authorization", `Bearer ${token}`);
      }

      const response = await fetch(
        `${
          import.meta.env.PROD
            ? import.meta.env.VITE_API_URL_PROD
            : import.meta.env.VITE_API_URL_DEV
        }/recipe/${mode}/${recipeId}`,
        {
          method: "POST",
          headers,
        }
      );
      return response.json();
    },
    onMutate: async () => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["recipe", recipeId] });

      // Snapshot the previous value
      const recipe = queryClient.getQueryData(["recipe", recipeId]) as IRecipe;
      const previousRecipe = JSON.parse(JSON.stringify(data));

      // Optimistically update to the new value
      recipe["flavourmarks"] =
        mode === "add-flavourmark" ? [decoded.id as string] : [];

      // Return a context object with the snapshotted value
      return { previousRecipe };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (_, __, context) => {
      context &&
        queryClient.setQueryData(["recipe", recipeId], context.previousRecipe);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["recipe", recipeId] });
    },
  });

  return (
    <Container>
      <main className="mt-16">
        {!isLoading && !isError && data && (
          <>
            <div className="flex items-end justify-between">
              <h1 className="text-4xl font-bold text-green-900 uppercase">
                {data.name}
              </h1>
              <button
                className="flex items-center gap-2"
                onClick={(e) => {
                  e.preventDefault();
                  data._id && token && mutate(data._id);
                }}
              >
                {token ? (
                  data.flavourmarks.length ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 24"
                      className="w-6 h-6 fill-yellow-500"
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
                      viewBox="0 24"
                      strokeWidth="1.5"
                      className="w-6 h-6 stroke-yellow-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                      />
                    </svg>
                  )
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 24"
                    strokeWidth="1.5"
                    className="w-6 h-6 stroke-yellow-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                  </svg>
                )}
                <p className="text-xl font-bold text-green-900">
                  {data.flavourmarkCount}
                </p>
              </button>
            </div>
            <p className="text-md mt-4 max-w-full lg:max-w-[50%]">
              {data.description}
            </p>
            <img
              className="object-cover w-full mt-8 h-96 rounded-xl"
              src={data.imgPath}
              alt={data.name}
            />
            <div className="flex flex-col gap-8 mt-16 lg:flex-row">
              <div className="w-full lg:w-2/3">
                <div className="bg-[#dce0ba] rounded-lg p-4">
                  <p className="text-xl font-bold text-green-900">
                    Ingredients
                  </p>
                  <ul className="flex flex-col gap-4 mt-4 list-disc list-inside ">
                    {data.ingredients.map((ingredient) => (
                      <li key={ingredient}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#dce0ba] rounded-lg mt-8 p-4">
                  <p className="text-xl font-bold text-green-900">
                    Preparation Steps
                  </p>
                  <ol className="flex flex-col gap-4 mt-4 list-decimal list-inside">
                    {data.preparationSteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="w-full lg:w-1/3">
                <div className="flex flex-col gap-8 bg-[#eedcb4] rounded-lg p-4 md:p-8">
                  <div className="flex justify-between">
                    <p className="text-xl font-bold text-green-900">
                      Difficulty
                    </p>
                    <p className="text-xl text-[#8eb44f]">{data.difficulty}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-xl font-bold text-green-900">
                      Total Time
                    </p>
                    <p className="text-xl text-[#8eb44f]">{data.totalTime}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-xl font-bold text-green-900">Servings</p>
                    <p className="text-xl text-[#8eb44f]">{data.servings}</p>
                  </div>
                </div>
                <div className="bg-[#eedcb4] rounded-lg p-4 mt-8">
                  <p className="text-xl font-bold text-green-900">
                    Nutritional Information (per serving)
                  </p>
                  <ul className="flex flex-col gap-4 mt-4 list-disc list-inside ">
                    {Object.entries(data.nutrition).map(([key, value]) => (
                      <li key={`${key}: ${value}`}>
                        {key}: {value}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center w-full mt-16">
              <h2 className="text-xl font-bold text-green-900">Reviews</h2>
              <div className="w-full mt-16">
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
