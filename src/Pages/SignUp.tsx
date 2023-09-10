import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import urlcat from "urlcat";

import signupsigninimg from "/mock-images/signupsignin/signup_signin.jpg?url";
import signUpValidation from "../validations/signUpValidation.js";
import infosvg from "../content/svg/Info_fill.svg";
import tooltip from "../content/tooltip/data.js";

const SERVER = import.meta.env.VITE_SERVER;

type SignUp = {
  isSignedIn: boolean;
};

const SignUp = ({ isSignedIn }: SignUp) => {
  // if (isSignedIn === true) {
  //   console.log("do smtg here.. if alr signed in then show ??? page????");
  // }

  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const submitSignUp = (values: {
    email: string;
    display_name: string;
    password: string;
    confirm_password: string;
  }) => {
    const url = urlcat(SERVER, "/user/register");

    axios
      .post(url, values)
      .then((data) => {
        navigate("/signin");
        // save data to local storage
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="w-1/2">
          <img src={`${signupsigninimg}`} className="rounded-3xl" />
        </div>
        <div className="w-1/2 flex flex-col items-center text-center gap-5">
          <h1 className="text-5xl font-bold text-neutral tracking-widest leading-snug">
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
            onSubmit={(values) => {
              submitSignUp(values);
              setErrorMessage(null);
            }}
          >
            {({ errors, touched, handleChange, handleBlur }) => (
              <Form>
                <label className="label text-xs sm:text-sm font-medium">
                  Email
                </label>
                <Field
                  className="input input-bordered input-xs md:input-sm w-full text-xs"
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
                    className="tooltip tooltip-right"
                    data-tip={tooltip.username}
                  >
                    <img src={infosvg} />
                  </div>
                </label>
                <Field
                  className="input input-bordered input-xs md:input-sm w-full text-xs"
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
                    className="tooltip tooltip-right"
                    data-tip={tooltip.password}
                  >
                    <img src={infosvg} />
                  </div>
                </label>
                <Field
                  className="input input-bordered input-xs md:input-sm w-full text-xs"
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
                  className="input input-bordered input-xs md:input-sm w-full text-xs"
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
                  className="btn btn-neutral"
                  type="submit"
                  disabled={
                    !(
                      Object.keys(errors).length === 0 &&
                      Object.keys(touched).length !== 0
                    )
                  }
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
            <label className="label text-error text-[10px] sm:text-[12px]">
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
