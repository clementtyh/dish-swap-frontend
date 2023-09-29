import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import urlcat from "urlcat";

import signupsigninimg from "/mock-images/signupsignin/signup_signin.jpg?url";
import signInValidation from "../validations/signInValidation.js";

import ISignIn from "../types/SignInInterface.js";

const SERVER = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_PROD
  : import.meta.env.VITE_API_URL_DEV;

const SignIn = ({ setIsSignedIn }: ISignIn) => {
  // if (isSignedIn === true) {
  //   console.log("do smtg here.. if alr signed in then show ??? page????");
  // }

  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const submitSignIn = (values: {
    email: string;
    password: string;
  }) => {
    const url = urlcat(SERVER, "/auth/login");

    axios
      .post(url, values)
      .then((result) => {
        localStorage.setItem("token", result.data.payload.token);
        navigate("/recipes");

        //every time render necessary page with data, will check if token is still valid(through api etc). if not, bring to signup page
        
        // setIsSignedIn(true);
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
            RESUME YOUR
            <br /> <span className="text-primary">CULINARY</span> JOURNEY
          </h1>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={signInValidation}
            onSubmit={(values) => {
              submitSignIn(values);
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
                  Password
                </label>
                <Field
                  className="input input-bordered input-xs md:input-sm w-full text-xs"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
                <label className="label text-left text-error text-[10px] sm:text-[12px] w-[135px] sm:w-[165px] md:w-[190px]">
                  <ErrorMessage name="password" />
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
                  BROWSE RECIPES
                </button>
                <br />
                <br />
                <label className="label-text-alt">
                  Don't have an account?{" "}
                  <Link className="link" to="/signup">
                    Sign Up
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

export default SignIn;
