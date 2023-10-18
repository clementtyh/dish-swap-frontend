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
  image_files: File[];
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
          console.log("Error getting upload URL", error);
        });
    };

    const getImagesUrl = (uploadParams: {
      timestamp: number;
      upload_preset: string;
      signature: string;
    }) => {
      const promises = values.image_files.map((image) => {
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
            console.log("Error uploading image to Cloudinary", error);
          });
      });

      return Promise.all(promises);
    };

    const createUpdateRecipe = (imagesUrls: string[]) => {
      setIsSubmitting(true);

      const totalTime = values.total_time_hours * 60 + values.total_time_mins;
      const finalValues = {
        recipe_name: values.recipe_name,
        recipe_description: values.recipe_description,
        ingredients: values.ingredients,
        steps: values.steps,
        total_time: totalTime,
        difficulty: values.difficulty,
        servings: values.servings,
        image_files: imagesUrls,
        ...(recipeData && { recipe_id: recipeId }),
      };

      return axios
        .post(
          urlcat(SERVER, recipeData ? "/recipe/update" : "/recipe/create"),
          finalValues,
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then(() => {
          setIsSubmitting(false);
          recipeModalRef.current?.close();
          console.log(`${recipeData ? "update" : "create"} recipe success`);
          navigate(`/recipe/${recipeId}`);
        })
        .catch((error) => {
          console.log("sending recipe to server failed", error);
        });
    };

    getUploadParams()
      .then((uploadParams) => {
        return getImagesUrl(uploadParams);
      })
      .then(createUpdateRecipe)
      .catch((error) => {
        console.log("create recipe failed", error);
        setErrorMessage(error.response.data.message);
      });
  };

  const handleImages = () => {
    hiddenImageInput.current?.click();
  };

  return (
    <div>
      <button
        className="btn btn-secondary btn-sm text-neutral font-bold normal-case rounded-lg"
        onClick={() => toggleModal("show")}
      >
        {recipeData ? "Edit Recipe" : "Create Recipe"}
      </button>
      <dialog ref={recipeModalRef} className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Create Recipe</h3>
          <div className="relative">
            {/* Loading overlay */}
            {isSubmitting && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-70 bg-white">
                <div className="spinner" />
              </div>
            )}
            {/* formik */}
            <Formik
              initialValues={
                recipeData
                  ? {
                      recipe_name: recipeData.recipe_name,
                      recipe_description: recipeData.recipe_description,
                      ingredients: recipeData.ingredients,
                      steps: recipeData.steps,
                      total_time_hours: Math.floor(recipeData.total_time / 60),
                      total_time_mins: recipeData.total_time % 60,
                      difficulty: recipeData.difficulty,
                      servings: recipeData.servings,
                      image_files: [],
                    }
                  : {
                      recipe_name: "",
                      recipe_description: "",
                      ingredients: [""],
                      steps: [""],
                      total_time_hours: 0,
                      total_time_mins: 0,
                      difficulty: "Easy",
                      servings: 0,
                      image_files: [],
                    }
              }
              validationSchema={createRecipeValidation}
              onSubmit={(values, { resetForm }) => {
                submitCreateRecipe(values);
                setErrorMessage(null);
                resetForm();
              }}
            >
              {({
                errors,
                touched,
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
                            className="pl-5"
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
                                    className="pl-5"
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
                            className="pl-5"
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
                                    className="pl-5"
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
                    Images
                    <img src={addsvg} className="pl-5" onClick={handleImages} />
                  </label>
                  <input
                    className="hidden"
                    type="file"
                    multiple={true}
                    ref={hiddenImageInput}
                    name="image_files"
                    onChange={(e) => {
                      const files = Array.from(e.target.files as FileList);
                      setFieldValue("image_files", [
                        ...values.image_files,
                        ...files,
                      ]);
                    }}
                    onBlur={handleBlur}
                  />
                  <label className="label text-left text-error text-[10px] sm:text-[12px] w-full">
                    {errors.image_files}
                  </label>
                  <label className="label text-xs sm:text-sm">{`(${values.image_files.length} selected)`}</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {values.image_files.map((file, i) => (
                      <div key={i} className="relative aspect-w-1 aspect-h-1">
                        <div className="bg-gray-100 h-full">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Image ${i}`}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="absolute top-2 right-2 cursor-pointer">
                          <img
                            src={trashsvg}
                            className="pl-5"
                            onClick={() => {
                              const newSelectedImages =
                                values.image_files.filter(
                                  (image) => image !== file
                                );
                              setFieldValue("image_files", newSelectedImages);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <br />
                  <br />
                  <div className="modal-action">
                    <button
                      className="btn"
                      onClick={() => {
                        resetForm();
                        toggleModal("close");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                  <button
                    className="btn ml-5"
                    type="submit"
                    disabled={
                      !(
                        Object.keys(errors).length === 0 &&
                        Object.keys(touched).length !== 0
                      ) ||
                      values.total_time_hours * 60 + values.total_time_mins <=
                        0 ||
                      isSubmitting
                    }
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
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CreateUpdateRecipeModal;
