import * as yup from "yup";

const updateDisplayNameValidation = yup.object({
  current_display_name: yup.string(),
  new_display_name: yup
    .string()
    .required("A username is required.")
    .matches(/^[a-zA-Z0-9_-]+$/, {
      message: "Please enter a valid username.",
      excludeEmptyString: true,
    }),
});

export default updateDisplayNameValidation;
