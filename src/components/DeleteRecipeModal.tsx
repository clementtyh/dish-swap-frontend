import { useRef, useState } from "react";
import axios from "axios";
import urlcat from "urlcat";
import { useNavigate } from "react-router-dom";

const SERVER = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_PROD
  : import.meta.env.VITE_API_URL_DEV;

const DeleteRecipeModal = ({ recipeId }: { recipeId: string | null }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const recipeModalRef = useRef<HTMLDialogElement>(null);

  const navigate = useNavigate();

  const toggleModal = (action: string) => {
    if (recipeModalRef.current && action === "show") {
      recipeModalRef.current?.showModal();
    } else if (recipeModalRef.current && action === "close") {
      recipeModalRef.current?.close();
    }
  };

  const deleteRecipe = () => {
    setIsSubmitting(true);
    const token = sessionStorage.getItem("token");

    axios
      .post(urlcat(SERVER, `/recipe/delete/${recipeId}`), {}, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(() => {
        setIsSubmitting(false);
        recipeModalRef.current?.close();
        navigate("/recipes");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        setIsSubmitting(false);
      });
  };

  return (
    <div>
      <button
        className="btn btn-error btn-xs md:btn-sm font-bold normal-case rounded-lg"
        onClick={() => toggleModal("show")}
      >
        Delete Recipe
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
        <div className="modal-box w-11/12">
          {isSubmitting ? (
            <div className="absolute inset-0 flex items-center justify-center gap-2">
              <span className="loading loading-bars text-secondary"></span>
              Loading
              <span className="loading loading-bars text-secondary"></span>
            </div>
          ) : (
            <>
              <h3 className="font-bold text-md sm:text-lg">Delete Recipe</h3>
              <p className="text-xs sm:text-sm">Are you sure you want to delete this recipe?</p>
              <div className="mt-5">
                <button
                  className="btn btn-error btn-xs md:btn-sm"
                  type="button"
                  onClick={() => {
                    toggleModal("close");
                  }}
                >
                  Cancel
                </button>
                <button className="btn btn-success btn-xs md:btn-sm ml-5" onClick={deleteRecipe}>
                  Confirm
                </button>
              </div>
              {errorMessage ? (
                <label className="label text-error text-[10px] sm:text-[12px]">
                  {errorMessage}
                </label>
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default DeleteRecipeModal;
