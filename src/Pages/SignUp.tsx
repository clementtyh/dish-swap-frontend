import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import urlcat from "urlcat";
import signupsigninimg from "/mock-images/signupsignin/signup_signin.jpg?url";
import signUpValidation from "../validations/signUpValidation.js";
import infosvg from "../content/svg/Info_fill.svg";
import tooltip from "../content/tooltip/data.js";
import ITokenValid from "../types/TokenValidInterface.js";
import verifyToken from "../functions/verifyToken.js";

const SERVER = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_PROD
  : import.meta.env.VITE_API_URL_DEV;

const SignUp = ({ setIsTokenValid, isTokenValid }: ITokenValid) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  //check if token valid
  useEffect(() => {
    const authenticate = async () => {
      (await verifyToken()) ? setIsTokenValid(true) : setIsTokenValid(false);
    };

    authenticate();
  }, []);

  //since token valid, signup page not accessible
  useEffect(() => {
    if (isTokenValid) {
      navigate("/recipes");
    }
  }, [isTokenValid]);

  const submitSignUp = (values: {
    email: string;
    display_name: string;
    password: string;
    confirm_password: string;
  }) => {
    const url = urlcat(SERVER, "/user/register");
    axios
      .post(url, values)
      .then(() => {
        navigate("/signin")
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row mt-36">
        <div className="w-1/2">
          <img src={`${signupsigninimg}`} className="rounded-3xl" />
        </div>
        <div className="w-1/2 flex flex-col items-center text-center gap-5">
          <h1 className="text-xl md:text-3xl lg:text-5xl font-bold text-neutral tracking-widest leading-snug">
            START YOUR
            <br /> <span className="text-primary">CULINARY</span> JOURNEY
          </h1>
          <Formik
            initialValues={{
              email: "",
              display_name: "",
              password: "",
              confirm_password: "",
            }}
            validationSchema={signUpValidation}
            onSubmit={(values, { resetForm }) => {
              submitSignUp(values);
              setErrorMessage(null);
              resetForm();
            }}
          >
            {({ errors, touched, handleChange, handleBlur }) => (
              <Form>
                <label className="label text-xs sm:text-sm font-medium">
                  Email
                </label>
                <Field
                  data-test="signup-email-input"
                  className="input input-bordered input-xs sm:input-sm md:input-md w-full text-xs"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label className="label text-left text-error text-[10px] sm:text-[12px] w-[135px] sm:w-[165px] md:w-[190px]">
                  <ErrorMessage name="email" />
                </label>

                <label className="label text-xs sm:text-sm font-medium">
                  Username
                  <div
                    className="tooltip tooltip-top"
                    data-tip={tooltip.username}
                  >
                    <img src={infosvg} />
                  </div>
                </label>
                <Field
                  data-test="signup-display_name-input"
                  className="input input-bordered input-xs sm:input-sm md:input-md w-full text-xs"
                  name="display_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label className="label text-left text-error text-[10px] sm:text-[12px] w-[135px] sm:w-[165px] md:w-[190px]">
                  <ErrorMessage name="display_name" />
                </label>

                <label className="label text-xs sm:text-sm font-medium">
                  Password
                  <div
                    className="tooltip tooltip-top"
                    data-tip={tooltip.password}
                  >
                    <img src={infosvg} />
                  </div>
                </label>
                <Field
                  data-test="signup-password-input"
                  className="input input-bordered input-xs sm:input-sm md:input-md w-full text-xs"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label className="label text-left text-error text-[10px] sm:text-[12px] w-[135px] sm:w-[165px] md:w-[190px]">
                  <ErrorMessage name="password" />
                </label>

                <label className="label text-xs sm:text-sm font-medium">
                  Confirm Password
                </label>
                <Field
                  data-test="signup-confirm_password-input"
                  className="input input-bordered input-xs sm:input-sm md:input-md w-full text-xs"
                  name="confirm_password"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label className="label text-left text-error text-[10px] sm:text-[12px] w-[135px] sm:w-[165px] md:w-[190px]">
                  <ErrorMessage name="confirm_password" />
                </label>
                <br />
                <button
                  data-test="signup-submit-button"
                  className="btn btn-neutral btn-xs md:btn-md"
                  type="submit"
                  disabled={!(Object.keys(errors).length === 0  &&
                    Object.keys(touched).length !== 0)}
                >
                  BROWSE RECIPES
                </button>
                <br />
                <br />
                <label className="label-text-alt">
                  Already have an account?{" "}
                  <Link className="link" to="/signin">
                    Sign In
                  </Link>
                </label>
              </Form>
            )}
          </Formik>
          {errorMessage ? (
            <label data-test="signup-error-message" className="label text-error text-[10px] sm:text-[12px]">
              {errorMessage}
            </label>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
