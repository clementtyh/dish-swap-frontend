import { useRef, useState } from "react";
import axios from "axios";
import urlcat from "urlcat";
import { useNavigate } from "react-router-dom";

const SERVER = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_PROD
  : import.meta.env.VITE_API_URL_DEV;

const CreateUpdateRecipeModal = ({ recipeId }: { recipeId: string }) => {
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
    const token = sessionStorage.getItem("token");

   axios
        .post(
          urlcat(
            SERVER,
            `/recipe/delete/${recipeId}`
          ),
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((response) => {
          setIsSubmitting(false);
          recipeModalRef.current?.close();
          console.log("delete recipe success", response);
          navigate("/recipe")
        })
        .catch((error) => {
          console.log("sending recipe to server failed", error);
          setErrorMessage(error.response.data.message);
          setIsSubmitting(false);
        });
    };

  return (
    <div>
      <button
        className="btn btn-secondary btn-sm text-neutral font-bold normal-case rounded-lg"
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
        <div className="modal-box w-11/12 max-w-5xl">
          {isSubmitting ? (
            <div className="absolute inset-0 flex items-center justify-center gap-2">
              <span className="loading loading-bars text-secondary"></span>
              Loading
              <span className="loading loading-bars text-secondary"></span>
            </div>
          ) : (
            <>
              <h3 className="font-bold text-lg">Delete Recipe</h3>
              <p>Are you sure you want to delete this recipe?</p>
              <div className="modal-action">
                      <button
                        type="button"
                        className="btn"
                        onClick={() => {
                          toggleModal("close");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                    <button
                      className="btn ml-5"
                      type="submit"
                      // disabled={
                      //   !(
                      //     Object.keys(errors).length === 0 &&
                      //     Object.keys(touched).length !== 0
                      //   ) ||
                      //   values.total_time_hours * 60 + values.total_time_mins <=
                      //     0
                      // }
                    >
                      Confirm
                    </button>
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

export default CreateUpdateRecipeModal;
