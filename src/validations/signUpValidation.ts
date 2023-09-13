import * as yup from "yup";

const signUpValidation = yup.object({
  email: yup
    .string()
    .required("An email address is required.")
    .matches(/^[\w\.-]+@[\w\.-]+\.\w+$/, {
      message: "Please enter a valid email.",
      excludeEmptyString: true,
    }),
  display_name: yup
    .string()
    .required("A username is required.")
    .matches(/^[a-zA-Z0-9_-]+$/, {
      message: "Please enter a valid username.",
      excludeEmptyString: true,
    }),
  password: yup
    .string()
    .required("A password is required.")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: "Please enter a valid password.",
      excludeEmptyString: true,
    }),
  confirm_password: yup
    .string()
    .required("Please reconfirm password.")
    .oneOf([yup.ref("password")], "Passwords do not match."),
});

export default signUpValidation;
