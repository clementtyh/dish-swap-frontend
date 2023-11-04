import * as yup from "yup";

const createReviewValidation = yup.object({
  rating: yup.string().required("Rating is required."),
  review: yup
    .string()
    .required("Review is required.")
    .max(500, "Max characters for Review: 500."),
});

export default createReviewValidation;
