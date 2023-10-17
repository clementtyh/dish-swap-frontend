import * as yup from "yup";

const supportedImageFormats = ["image/jpg", "image/jpeg", "image/png"];

const areImagesSupported = (images: File[]) => {
  if (images) {
    for (const image of images) {
      if (!supportedImageFormats.includes(image.type.toLowerCase())) {
        return false;
      }
    }
  }
  return true;
};

const areSizesValid = (images: File[]) => {
  let valid = true;
  if (images) {
    images.map((image) => {
      const maxSize = 10 * 1024 * 1024;
      if (image.size > maxSize) {
        valid = false;
      }
    });
  }
  return valid;
};

const createRecipeValidation = yup.object({
  recipe_name: yup
    .string()
    .required("Recipe Name is required.")
    .max(50, "Max characters for Recipe Name: 50.")
    .matches(
      /^[a-zA-Z0-9\s]+$/,
      "Recipe Name can only contain letters, numbers, and spaces."
    ),
  recipe_description: yup
    .string()
    .required("Recipe Description is required.")
    .max(100, "Max characters for Recipe Description: 100."),
  ingredients: yup
    .array()
    .of(
      yup
        .string()
        .required("Min characters for an Ingredient: 2.")
        .test({
          name: "minCharacterLimit",
          message: "Min characters for an Ingredient: 2.",
          test: (value) => value.length >= 2,
        })
        .test({
          name: "maxCharacterLimit",
          message: "Max characters for an Ingredient: 150.",
          test: (value) => value.length <= 150,
        })
    )
    .required("At least 1 Ingredient is required."),
  steps: yup
    .array()
    .of(
      yup
        .string()
        .required("Min characters for a Step: 10.")
        .test({
          name: "minCharacterLimit",
          message: "Min characters for a Step: 10.",
          test: (value) => value.length >= 10,
        })
        .test({
          name: "maxCharacterLimit",
          message: "Max characters for a Step: 500.",
          test: (value) => value.length <= 500,
        })
    )
    .required("At least 1 Step is required."),
  total_time_hours: yup
    .number()
    .required("Hour is required.")
    .min(0, "Hour cannot be less than 0.")
    .max(23, "Hour cannot be more than 23."),
  total_time_mins: yup
    .number()
    .required("Minute is required.")
    .min(0, "Minute cannot be less than 0.")
    .max(59, "Minute cannot be more than 59."),
  difficulty: yup
    .string()
    .required("Difficulty is required.")
    .matches(/(Easy|Medium|Hard)/, {
      message: "Please enter a valid Difficulty.",
      excludeEmptyString: true,
    }),
  servings: yup
    .number()
    .required("Servings are required.")
    .positive("Servings must be a positive number.")
    .min(1, "Servings must be more than 0.")
    .max(99, "Servings cannot be more than 99."),
  image_files: yup
    .array()
    .required()
    .min(1, "At least 1 image is required.")
    .max(15, "Max images reached (15).")
    .test(
      "areImagesSupported",
      "Supported file formats: jpg, jpeg, png.",
      areImagesSupported
    )
    .test("areSizesValid", "Max image size: 10 MB.", areSizesValid),
});

export default createRecipeValidation;
