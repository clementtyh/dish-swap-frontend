import { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";

import { Review as IReview } from "../types/ReviewInterface.js";

interface DeleteReviewModalProps {
  reviewId: string;
  recipeId: string;
}

interface IReviewsData {
  count: number;
  reviews: IReview[];
}

const DeleteReviewModal = ({ reviewId, recipeId }: DeleteReviewModalProps) => {
  const recipeModalRef = useRef<HTMLDialogElement>(null);
  const queryClient = useQueryClient();

  const toggleModal = (action: string) => {
    if (recipeModalRef.current && action === "show") {
      recipeModalRef.current?.showModal();
    } else if (recipeModalRef.current && action === "close") {
      recipeModalRef.current?.close();
    }
  };

  const token = sessionStorage.getItem("token");

  const mutation = useMutation({
    mutationFn: async (): Promise<any> => {
      const response = await fetch(
        `${
          import.meta.env.PROD
            ? import.meta.env.VITE_API_URL_PROD
            : import.meta.env.VITE_API_URL_DEV
        }/review/delete/${reviewId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.json();
    },
    onMutate: async () => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["reviews", recipeId, 1] });

      // Snapshot the previous value
      const previousReviewsData = queryClient.getQueryData<IReviewsData>([
        "reviews",
        recipeId,
        1,
      ]);

      if (previousReviewsData) {
        // Optimistically update to the new value
        queryClient.setQueryData(["reviews", recipeId, 1], {
          count: previousReviewsData.count--,
          reviews: previousReviewsData.reviews.slice(1),
        });
      }

      // Return a context object with the snapshotted value
      return { previousReviewsData };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (_, __, context) => {
      context &&
        queryClient.setQueryData(
          ["reviews", recipeId, 1],
          context.previousReviewsData
        );
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", recipeId, 1] });
      toggleModal("close");
    },
  });

  return (
    <div>
      <button
        className="font-bold normal-case rounded-lg btn btn-error btn-sm"
        onClick={() => toggleModal("show")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fill-rule="evenodd"
            d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <dialog
        ref={recipeModalRef}
        className="modal"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
          }
        }}
      >
        <div className="w-11/12 modal-box">
          <h3 className="font-bold text-md sm:text-lg">Delete Review</h3>
          <p className="text-xs sm:text-sm">
            Are you sure you want to delete your review?
          </p>
          <div className="mt-5">
            <button
              className="btn btn-error"
              type="button"
              onClick={() => {
                toggleModal("close");
              }}
            >
              Cancel
            </button>
            <button
              className="ml-5 btn btn-success"
              onClick={() => {
                mutation.mutate();
                window.location.reload();
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DeleteReviewModal;
