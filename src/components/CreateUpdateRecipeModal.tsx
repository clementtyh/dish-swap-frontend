import { ErrorMessage, Field, FieldArray, Formik, Form } from "formik";
import { useRef, useState } from "react";
import createRecipeValidation from "../validations/createRecipeValidation.js";
import trashsvg from "../content/svg/Trash.svg";
import addsvg from "../content/svg/Add.svg";
import axios from "axios";
import urlcat from "urlcat";
import { useNavigate } from "react-router-dom";
import IRecipe from "../types/RecipeInterface.js";

interface CreateUpdateProps {
  recipeData: IRecipe | null;
  recipeId: string | null;
}

interface FieldArrayRenderProps {
  push: (obj: any) => void;
  remove<T>(index: number): T | undefined;
}

type Values = {
  recipe_name: string;
  recipe_description: string;
  ingredients: string[];
  steps: string[];
  total_time_hours: number;
  total_time_mins: number;
  difficulty: string;
  servings: number;
  allImages: (File | string)[];
};

const SERVER = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_PROD
  : import.meta.env.VITE_API_URL_DEV;

const CreateUpdateRecipeModal = ({
  recipeData,
  recipeId,
}: CreateUpdateProps) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allImages, setAllImages] = useState<(File | string)[]>(
    recipeData ? recipeData.image_files : []
  );

  const recipeModalRef = useRef<HTMLDialogElement>(null);
  const hiddenImageInput = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const toggleModal = (action: string) => {
    if (recipeModalRef.current && action === "show") {
      recipeModalRef.current?.showModal();
    } else if (recipeModalRef.current && action === "close") {
      recipeModalRef.current?.close();
    }
  };

  const submitCreateRecipe = async (values: Values) => {
    setIsSubmitting(true);

    const token = sessionStorage.getItem("token");

    const getUploadParams = () => {
      return axios
        .post(
          urlcat(SERVER, "/file/upload_params"),
          {},
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((response) => response.data)
        .catch((error) => {
          setErrorMessage(error.response.data.message);
          setIsSubmitting(false);
        });
    };

    const getNewImagesUrl = (uploadParams: {
      timestamp: number;
      upload_preset: string;
      signature: string;
    }) => {
      const promises = allImages.map((image) => {
        if (typeof image !== "string") {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
          formData.append("timestamp", uploadParams.timestamp.toString());
          formData.append("signature", uploadParams.signature);
          formData.append("upload_preset", uploadParams.upload_preset);

          return axios
            .post(
              `https://api.cloudinary.com/v1_1/${
                import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
              }/auto/upload`,
              formData
            )
            .then((response) => response.data.secure_url)
            .catch((error) => {
              setErrorMessage(error.response.data.message);
              setIsSubmitting(false);
            });
        }
      });
      const filteredPromises = promises.filter((promise) => promise);
      return Promise.all(filteredPromises);
    };

    const createUpdateRecipe = (NewImagesUrls: string[]) => {
      const allImagesUrls = allImages
        .filter((e) => typeof e === "string")
        .concat(NewImagesUrls);

      const totalTime = values.total_time_hours * 60 + values.total_time_mins;
      const finalValues = {
        recipe_name: values.recipe_name,
        recipe_description: values.recipe_description,
        ingredients: values.ingredients,
        steps: values.steps,
        total_time: totalTime,
        difficulty: values.difficulty,
        servings: values.servings,
        image_files: allImagesUrls,
      };

      return axios
        .post(
          urlcat(
            SERVER,
            recipeData ? `/recipe/update/${recipeId}` : "/recipe/create"
          ),
          finalValues,
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((response) => {
          setIsSubmitting(false);
          // recipeModalRef.current?.close();
          recipeData
            ? navigate(`/recipe/${recipeId}`)
            : navigate(`/recipe/${response.data.payload.recipe_id}`);
          window.location.reload();
        })
        .catch((error) => {
          setErrorMessage(error.response.data.message);
          setIsSubmitting(false);
        });
    };

    getUploadParams()
      .then((uploadParams) => {
        return getNewImagesUrl(uploadParams);
      })
      .then(createUpdateRecipe)
      .catch((error) => {
        setIsSubmitting(false);
        setErrorMessage(error.response.data.message);
      });
  };

  const handleImages = () => {
    hiddenImageInput.current?.click();
  };

  return (
    <div className="flex justify-center items-center">
      <button
        data-test="create-update-recipe-button"
        className="btn btn-secondary btn-xs md:btn-sm text-neutral font-bold normal-case rounded-lg"
        onClick={() => toggleModal("show")}
      >
        {recipeData ? "Edit Recipe" : "Create Recipe"}
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
              <h3 className="font-bold text-lg">
                {recipeData ? "Edit Recipe" : "Create Recipe"}
              </h3>
              <Formik
                initialValues={{
                  recipe_name: recipeData?.recipe_name || "",
                  recipe_description: recipeData?.recipe_description || "",
                  ingredients: recipeData?.ingredients || [""],
                  steps: recipeData?.steps || [""],
                  total_time_hours: Math.floor(
                    (recipeData?.total_time || 0) / 60
                  ),
                  total_time_mins: (recipeData?.total_time || 0) % 60,
                  difficulty: recipeData?.difficulty || "Easy",
                  servings: recipeData?.servings || 0,
                  allImages: allImages,
                }}
                validationSchema={createRecipeValidation}
                onSubmit={(values, { resetForm }) => {
                  submitCreateRecipe(values);
                  setErrorMessage(null);
                  resetForm();
                }}
              >
                {({
                  errors,
                  // touched,
                  handleChange,
                  handleBlur,
                  values,
                  resetForm,
                  setFieldValue,
                }) => (
                  <Form>
                    <label className="label text-xs sm:text-sm font-medium">
                      Recipe Name
                    </label>
                    <Field
                      className="input input-bordered input-xs sm:input-sm md:input-md w-full"
                      name="recipe_name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.recipe_name}
                    />
                    <label className="label text-left text-error text-[10px] sm:text-[12px] w-full">
                      <ErrorMessage name="recipe_name" />
                    </label>

                    <label className="label text-xs sm:text-sm font-medium">
                      Recipe Description
                    </label>
                    <textarea
                      className="textarea textarea-bordered textarea-xs sm:textarea-sm md:textarea-md w-full"
                      name="recipe_description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.recipe_description}
                    ></textarea>
                    <label className="label text-left text-error text-[10px] sm:text-[12px] w-full">
                      <ErrorMessage name="recipe_description" />
                    </label>

                    <FieldArray name="ingredients">
                      {({ remove, push }: FieldArrayRenderProps) => (
                        <div>
                          <label className="label text-xs sm:text-sm font-medium justify-start">
                            Ingredients
                            <img
                              src={addsvg}
                              className="pl-5 h-5 md:h-6"
                              onClick={() => push("")}
                            />
                          </label>
                          {values.ingredients &&
                            values.ingredients.length > 0 &&
                            values.ingredients.map((_, i) => (
                              <div key={i}>
                                <div className="flex">
                                  <Field
                                    className="input input-bordered input-xs sm:input-sm md:input-md w-3/4"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name={`ingredients.${i}`}
                                    value={values.ingredients[i]}
                                  />
                                  {values.ingredients.length <= 1 ? (
                                    ""
                                  ) : (
                                    <img
                                      src={trashsvg}
                                      className="pl-5 h-5 md:h-6"
                                      onClick={() => remove(i)}
                                    />
                                  )}
                                </div>
                                <label className="label text-left text-error text-[10px] sm:text-[12px] w-full">
                                  <ErrorMessage name={`ingredients.${i}`} />
                                </label>
                              </div>
                            ))}
                        </div>
                      )}
                    </FieldArray>

                    <FieldArray name="steps">
                      {({ remove, push }: FieldArrayRenderProps) => (
                        <div>
                          <label className="label text-xs sm:text-sm font-medium justify-start">
                            Steps
                            <img
                              src={addsvg}
                              className="pl-5 h-5 md:h-6"
                              onClick={() => push("")}
                            />
                          </label>
                          {values.steps &&
                            values.steps.length > 0 &&
                            values.steps.map((_, i) => (
                              <div key={i}>
                                <div className="flex">
                                  <Field
                                    className="input input-bordered input-xs sm:input-sm md:input-md w-3/4"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name={`steps.${i}`}
                                    value={values.steps[i]}
                                  />
                                  {values.steps.length <= 1 ? (
                                    ""
                                  ) : (
                                    <img
                                      src={trashsvg}
                                      className="pl-5 h-5 md:h-6"
                                      onClick={() => remove(i)}
                                    />
                                  )}
                                </div>
                                <label className="label text-left text-error text-[10px] sm:text-[12px] w-full">
                                  <ErrorMessage name={`steps.${i}`} />
                                </label>
                              </div>
                            ))}
                        </div>
                      )}
                    </FieldArray>

                    <label className="label text-xs sm:text-sm font-medium">
                      Total Time
                    </label>
                    <div className="flex items-center gap-3">
                      <Field
                        type="number"
                        min="0"
                        max="23"
                        className="input input-bordered input-xs sm:input-sm md:input-md w-min text-center"
                        name="total_time_hours"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.total_time_hours}
                      />
                      <label className="label text-xs sm:text-sm">hours</label>
                      <Field
                        type="number"
                        min="0"
                        max="59"
                        className="input input-bordered input-xs sm:input-sm md:input-md w-min text-center"
                        name="total_time_mins"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.total_time_mins}
                      />
                      <label className="label text-xs sm:text-sm">mins</label>
                    </div>
                    <label className="label text-left text-error text-[10px] sm:text-[12px] w-full justify-start gap-1">
                      <ErrorMessage name="total_time_hours" />{" "}
                      <ErrorMessage name="total_time_mins" />
                      {values.total_time_hours * 60 + values.total_time_mins <=
                        0 && <p>Total Time cannot be less 0.</p>}
                    </label>

                    <label className="label text-xs sm:text-sm font-medium">
                      Servings
                    </label>
                    <Field
                      type="number"
                      min="1"
                      max="99"
                      className="input input-bordered input-xs sm:input-sm md:input-md w-min text-center"
                      name="servings"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.servings}
                    />
                    <label className="label text-left text-error text-[10px] sm:text-[12px] w-full">
                      <ErrorMessage name="servings" />
                    </label>

                    <label className="label text-xs sm:text-sm font-medium">
                      Difficulty
                    </label>
                    <Field
                      className="input input-bordered input-xs sm:input-sm md:input-md w-min"
                      component="select"
                      name="difficulty"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.difficulty}
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </Field>
                    <label className="label text-left text-error text-[10px] sm:text-[12px] w-full">
                      <ErrorMessage name="difficulty" />
                    </label>

                    <label className="label text-xs sm:text-sm font-medium justify-start">
                      Images (jpg, jpeg, png)
                      <img
                        src={addsvg}
                        className="pl-5 h-5 md:h-6"
                        onClick={handleImages}
                      />
                    </label>
                    <input
                      className="hidden"
                      type="file"
                      multiple={true}
                      ref={hiddenImageInput}
                      name="allImages"
                      onChange={(e) => {
                        const files = Array.from(e.target.files as FileList);
                        const filteredFiles = files.filter((file) => {
                          const acceptedTypes = [
                            "image/jpeg",
                            "image/jpg",
                            "image/png",
                          ];
                          return acceptedTypes.includes(file.type);
                        });
                        setAllImages([...allImages, ...filteredFiles]);
                        setFieldValue("allImages", [
                          ...allImages,
                          ...filteredFiles,
                        ]);
                      }}
                      onBlur={handleBlur}
                    />
                    <label className="label text-left text-error text-[10px] sm:text-[12px] w-full">
                      {errors.allImages}
                    </label>
                    <label className="label text-xs sm:text-sm">{`(${values.allImages.length} selected)`}</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {allImages.map((image, i) => (
                        <div key={i} className="relative aspect-w-1 aspect-h-1">
                          <div className="bg-gray-100 h-full">
                            <img
                              src={
                                typeof image === "string"
                                  ? image
                                  : URL.createObjectURL(image)
                              }
                              alt={`Image ${i}`}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="absolute top-2 right-2 cursor-pointer">
                            <img
                              src={trashsvg}
                              className="pl-5 h-5 md:h-6"
                              onClick={() => {
                                const newAllImages = allImages.filter(
                                  (e) => e !== image
                                );
                                setFieldValue("allImages", newAllImages);
                                setAllImages(newAllImages);
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <br />
                    <br />
                    <button
                      className="btn btn-error btn-xs md:btn-md"
                      type="button"
                      onClick={() => {
                        resetForm();
                        toggleModal("close");
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn ml-5 btn-success btn-xs md:btn-md"
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

export default CreateUpdateRecipeModal;
