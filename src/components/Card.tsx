import { useContext } from "react";
import { Link } from "react-router-dom";
import { useQueryClient, useMutation } from "react-query";

import { authContext } from "../utils/context.js";

import IRecipe from "../types/RecipeInterface.js";

interface CardProps extends IRecipe {
  page: number;
  idx: number;
}

function Card({
  page,
  idx,
  _id,
  name,
  imgPath,
  description,
  flavourmarks,
}: CardProps) {
  const { token, decoded } = useContext(authContext);

  const mode = flavourmarks.length ? "remove-flavourmark" : "add-flavourmark";

  const queryClient = useQueryClient();

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
      await queryClient.cancelQueries({ queryKey: ["recipes", page] });

      // Snapshot the previous value
      const data = queryClient.getQueryData(["recipes", page]) as {
        count: number;
        recipes: IRecipe[];
      };
      const recipe = data.recipes[idx];
      const previousData = JSON.parse(JSON.stringify(data));

      // Optimistically update to the new value
      data.recipes.splice(idx, 1, {
        ...recipe,
        flavourmarks: mode === "add-flavourmark" ? [decoded.id as string] : [],
      });

      // Return a context object with the snapshotted value
      return { previousData };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (_, __, context) => {
      context &&
        queryClient.setQueryData(["recipes", page], context.previousData);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes", page] });
    },
  });

  return (
    <Link to={`/recipe/${_id}`}>
      <div className="flex flex-col">
        <img
          className="object-cover w-full h-64 rounded-2xl"
          src={imgPath}
          alt={name}
        />
        <div className="flex justify-between mt-6">
          <h2 className="text-xl text-green-900">{name}</h2>
          <button
            onClick={(e) => {
              e.preventDefault();
              _id && token && mutate(_id);
            }}
          >
            {token ? (
              flavourmarks.length ? (
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
          </button>
        </div>
        <p className="mt-2 text-md">{description}</p>
      </div>
    </Link>
  );
}

export default Card;
