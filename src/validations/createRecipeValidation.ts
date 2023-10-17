import * as yup from "yup";

const supportedImageFormats = ['image/jpg', 'image/jpeg', 'image/png']

const areImagesSupported = (images: File[]) => {
  if (images) {
    for (const image of images) {
      if (!supportedImageFormats.includes(image.type.toLowerCase())) {
        return false;
      }
    }
  }
  return true;
}

const areSizesValid = (images: File[])=> {
  let valid = true
  if (images) {
    images.map(image => {
      const maxSize = 10 * 1024 * 1024;
      if (image.size > maxSize) {
        valid = false
      }
    })
  }
  return valid
}

const createRecipeValidation = yup.object({
  recipe_name: yup.string().required("Recipe Name is required.").max(50, "Max characters for Recipe Name: 50.").matches
  (/^[a-zA-Z0-9\s]+$/, 'Recipe Name can only contain letters, numbers, and spaces'),
  recipe_description: yup.string().required("Recipe Description is required.").max(100, "Max characters for Recipe Description: 100."),
  ingredients: yup.array().of(yup.string().required().min(2, "Min characters for an Ingredient: 2.").max(150, "Max characters for an Ingredient: 150.")).required().min(1, "At least 1 Ingredient is required."),
  steps: yup.array().of(yup.string().required().min(10, "Min characters for a Step: 10.").max(500, "Max characters for a Step: 500.")).required().min(1, "At least 1 Step is required."),
  total_time_hours: yup.number().required("Hour is required.").min(0, "Hour cannot be less than 0").max(23, "Hour cannot be more than 23"),
  total_time_mins: yup.number().required("Minute is required.").min(0, "Minute cannot be less than 0").max(59, "Minute cannot be more than 59"),
  difficulty: yup.string().required("Difficulty is required.").matches(/(Easy|Medium|Hard)/, {
    message: "Please enter a valid Difficulty.",
    excludeEmptyString: true,
  }),
  servings: yup.number().required("Servings are required.").positive("Servings must be a positive number").min(1, "Servings must be more than 0").max(99, "Servings cannot be more than 99"),
  image_files: yup.array().required().min(1, "At least 1 image is required.").max(15, "Max images reached (15)").test("areImagesSupported", "Supported file formats: jpg, jpeg, png", areImagesSupported).test("areSizesValid", "Max image size: 10 MB", areSizesValid),
});

export default createRecipeValidation;
