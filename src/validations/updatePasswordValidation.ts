import * as yup from "yup";

const updatePasswordValidation = yup.object({
  current_password: yup
    .string()
    .required("Your current password is required.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message: "Please enter a valid password.",
        excludeEmptyString: true,
      }
    ),
  new_password: yup
    .string()
    .required("A new password is required.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message: "Please enter a valid password.",
        excludeEmptyString: true,
      }
    )
    .notOneOf([yup.ref("current_password")], "Please set a different password."),
  confirm_password: yup
    .string()
    .required("Please reconfirm your new password.")
    .oneOf([yup.ref("new_password")], "Passwords do not match."),
});

export default updatePasswordValidation;