import { ErrorMessage, Field, Form, Formik } from "formik";
import updatePasswordValidation from "../validations/updatePasswordValidation.js";
import infosvg from "../content/svg/Info_fill.svg";
import tooltip from "../content/tooltip/data.js";
import visibilityIcon from "../content/svg/visibilityIcon.svg";
import visibilityOffIcon from "../content/svg/visibilityOffIcon.svg";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import urlcat from "urlcat";

const SERVER = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_PROD
  : import.meta.env.VITE_API_URL_DEV;

function UpdatePassword({}) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const token = sessionStorage.getItem("token");
  const updatePwUrl = urlcat(SERVER, "/user/update_password");
  const updatePwModal = document.querySelector("#my_modal_6") as HTMLInputElement | null; 

  const submitUpdatePassword = (
    values: {
      current_password: string;
      new_password: string;
    },
    resetForm: any
  ) => {
    axios
      .post(updatePwUrl, values, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res.data.status);
        if (res.data.status === "success") {
          updatePwModal!.checked = false;
          toast.success("Password updated successfully!");
          resetForm({ values: "" });
        }
      })
      .catch((error) => {
        console.log("Update pw error:", error.response.data.message);
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <Formik
            initialValues={{
              current_password: "",
              new_password: "",
              confirm_password: "",
            }}
            validationSchema={updatePasswordValidation}
            onSubmit={(values, { resetForm }) => {
              submitUpdatePassword(values, resetForm);
              setErrorMessage(null);
            }}
          >
            {({ errors, touched, handleChange, handleBlur }) => (
              <Form>
                <label className="label text-xs sm:text-sm font-medium">
                  Current Password
                  <div
                    className="tooltip tooltip-left"
                    data-tip={tooltip.password}
                  >
                    <img src={infosvg} />
                  </div>
                </label>
                <div className="flex flex-row">
                  <Field
                    className="input input-bordered input-xs md:input-sm w-full text-xs"
                    name="current_password"
                    type={showCurrentPassword ? "text" : "password"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <button
                    className="ml-3 mr-1"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <img src={visibilityIcon} />
                    ) : (
                      <img src={visibilityOffIcon} />
                    )}
                  </button>
                </div>

                <label className="label text-left text-error text-[10px] sm:text-[12px] w-[135px] sm:w-[165px] md:w-[190px]">
                  <ErrorMessage name="current_password" />
                </label>

                <label className="label text-xs sm:text-sm font-medium">
                  New Password
                  <div
                    className="tooltip tooltip-left"
                    data-tip={tooltip.password}
                  >
                    <img src={infosvg} />
                  </div>
                </label>
                <div className="flex flex-row">
                  <Field
                    className="input input-bordered input-xs md:input-sm w-full text-xs"
                    name="new_password"
                    type={showNewPassword ? "text" : "password"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <button
                    className="ml-3 mr-1"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <img src={visibilityIcon} />
                    ) : (
                      <img src={visibilityOffIcon} />
                    )}
                  </button>
                </div>

                <label className="label text-left text-error text-[10px] sm:text-[12px] w-[135px] sm:w-[165px] md:w-[190px]">
                  <ErrorMessage name="new_password" />
                </label>

                <label className="label text-xs sm:text-sm font-medium">
                  Confirm New Password
                </label>
                <div className="flex flex-row">
                  <Field
                    className="input input-bordered input-xs md:input-sm w-full text-xs"
                    name="confirm_password"
                    type={showConfirmPassword ? "text" : "password"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <button
                    className="ml-3 mr-1"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <img src={visibilityIcon} />
                    ) : (
                      <img src={visibilityOffIcon} />
                    )}
                  </button>
                </div>

                <label className="label text-left text-error text-[10px] sm:text-[12px] w-[135px] sm:w-[165px] md:w-[190px]">
                  <ErrorMessage name="confirm_password" />
                </label>
                <br />
                <div className="flex flex-row justify-between">
                  <label
                    htmlFor="my_modal_6"
                    className="link link-primary text-sm font-semibold mt-3"
                  >
                    CLOSE
                  </label>
                  <button
                    className="btn btn-neutral"
                    type="submit"
                    disabled={
                      !(
                        Object.keys(errors).length === 0 &&
                        Object.keys(touched).length !== 0
                      )
                    }
                  >
                    Update Password
                  </button>
                </div>
                {errorMessage !== null &&
                  (errorMessage === "Invalid password" ? (
                    <p className="label text-left text-error text-[10px] sm:text-[12px] w-[135px] sm:w-[165px] md:w-[190px]">
                      Wrong password
                    </p>
                  ) : (
                    <p className="label text-left text-error text-[10px] sm:text-[12px] w-[135px] sm:w-[165px] md:w-[190px]">
                      {errorMessage}
                    </p>
                  ))}
              </Form>
            )}
          </Formik>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_6">
          Close
        </label>
      </div>
    </>
  );
}

export default UpdatePassword;