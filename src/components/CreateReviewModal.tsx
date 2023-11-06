import { useRef, useState } from "react";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { useMutation, useQueryClient } from "react-query";

import createReviewValidation from "../validations/createReviewValidation.js";

interface FormValues {
  rating: string;
  review: string;
}

interface CreateUpdateProps {
  recipeId: string;
  setReviewsPage: React.Dispatch<React.SetStateAction<number>>;
}

const CreateReviewModal = ({ recipeId, setReviewsPage }: CreateUpdateProps) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const recipeModalRef = useRef<HTMLDialogElement>(null);

  const toggleModal = (action: string) => {
    if (recipeModalRef.current && action === "show") {
      recipeModalRef.current?.showModal();
    } else if (recipeModalRef.current && action === "close") {
      recipeModalRef.current?.close();
    }
  };

  const token = sessionStorage.getItem("token");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (values: FormValues): Promise<any> => {
      const transformedValues = {
        recipe_id: recipeId,
        rating: values.rating,
        text: values.review,
      };
      const response = await fetch(
        `${
          import.meta.env.PROD
            ? import.meta.env.VITE_API_URL_PROD
            : import.meta.env.VITE_API_URL_DEV
        }/review/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(transformedValues),
        }
      );
      return response.json();
    },
    onMutate: () => setIsSubmitting(true),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", recipeId, 1] });
      setIsSubmitting(false);
      toggleModal("close");
      setReviewsPage(1);
    },
  });

  return (
    <div>
      <button
        data-test="write-review-button"
        className="font-bold normal-case rounded-lg btn btn-secondary btn-xs md:btn-sm text-neutral"
        onClick={() => toggleModal("show")}
      >
        Write Review
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
        <div className="w-11/12 max-w-5xl modal-box">
          {isSubmitting ? (
            <div className="absolute inset-0 flex items-center justify-center gap-2">
              <span className="loading loading-bars text-secondary"></span>
              Loading
              <span className="loading loading-bars text-secondary"></span>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-bold">Write Review</h3>
              <Formik
                initialValues={{
                  rating: "",
                  review: "",
                }}
                validationSchema={createReviewValidation}
                onSubmit={(values, { resetForm }) => {
                  mutation.mutate(values);
                  setErrorMessage(null);
                  resetForm();
                }}
              >
                {({ handleChange, handleBlur, values, resetForm }) => (
                  <Form>
                    <label className="text-xs font-medium label sm:text-sm">
                      Rating
                    </label>
                    <div
                      className="flex"
                      role="group"
                      aria-labelledby="my-radio-group"
                    >
                      {[...Array(5).keys()].map((idx) => (
                        <label className="cursor-pointer" key={idx}>
                          <Field
                            className="hidden"
                            type="radio"
                            name="rating"
                            value={idx + 1}
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 24"
                            strokeWidth="1.5"
                            className={`w-6 h-6 stroke-rose-500 ${
                              idx + 1 <= parseInt(values.rating)
                                ? "fill-rose-500"
                                : "fill-none"
                            }`}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                            />
                          </svg>
                        </label>
                      ))}
                    </div>
                    <label className="label text-left text-error text-[10px] sm:text-[12px] w-full">
                      <ErrorMessage name="rating" />
                    </label>

                    <label className="text-xs font-medium label sm:text-sm">
                      Review
                    </label>
                    <textarea
                      className="w-full textarea textarea-bordered textarea-xs sm:textarea-sm md:textarea-md"
                      name="review"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.review}
                    ></textarea>
                    <label className="label text-left text-error text-[10px] sm:text-[12px] w-full">
                      <ErrorMessage name="review" />
                    </label>

                    <br />
                    <br />
                    <button
                      className="btn btn-error btn-xs md:btn-sm"
                      type="button"
                      onClick={() => {
                        resetForm();
                        toggleModal("close");
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="ml-5 btn btn-success btn-xs md:btn-sm"
                      type="submit"
                    >
                      Confirm
                    </button>
                  </Form>
                )}
              </Formik>
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

export default CreateReviewModal;
