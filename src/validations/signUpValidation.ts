import * as yup from "yup";

const signUpValidation = yup.object({
  email: yup
    .string()
    .required("An email address is required.")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "Please enter a valid email.",
      excludeEmptyString: true,
    }),
  display_name: yup
    .string()
    .required("A username is required.")
    .matches(/^[a-zA-Z_][a-zA-Z0-9_]{0,49}$/, {
      message: "Please enter a valid username.",
      excludeEmptyString: true,
    }),
  password: yup
    .string()
    .required("A password is required.")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: "Please enter a valid password.",
      excludeEmptyString: true,
    }),
  confirm_password: yup
    .string()
    .required("Please reconfirm password.")
    .oneOf([yup.ref("password")], "Passwords do not match."),
});

export default signUpValidation;
