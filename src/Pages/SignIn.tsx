import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import urlcat from "urlcat";
import { decodeJwt } from "jose";

import signupsigninimg from "/mock-images/signupsignin/signup_signin.jpg?url";
import signInValidation from "../validations/signInValidation.js";
import verifyToken from "../functions/verifyToken.js";
import ITokenValid from "../types/TokenValidInterface.js";

const SERVER = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_PROD
  : import.meta.env.VITE_API_URL_DEV;

const SignIn = ({ setIsTokenValid, isTokenValid }: ITokenValid) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  //check if token valid
  useEffect(() => {
    const authenticate = async () => {
      (await verifyToken()) ? setIsTokenValid(true) : setIsTokenValid(false);
    };

    authenticate();
  }, []);

  //since token valid, signin page not accessible
  useEffect(() => {
    if (isTokenValid) {
      navigate("/recipes");
    }
  }, [isTokenValid]);

  const submitSignIn = (values: { email: string; password: string }) => {
    const url = urlcat(SERVER, "/auth/login");

    axios
      .post(url, values)
      .then((result) => {
        sessionStorage.setItem("token", result.data.payload.token);
        const userInfo = decodeJwt(result.data.payload.token);
        sessionStorage.setItem("userId", userInfo.id as string);
        // sessionStorage.setItem("userDisplayName", userInfo.displayName); //will uncomment after implemented
        setIsTokenValid(true);
        sessionStorage.setItem("displayName", result.data.payload.displayName);
        navigate("/recipes");
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
            {({ errors, handleChange, handleBlur }) => (
              <Form>
                <label className="label text-xs sm:text-sm font-medium">
                  Email
                </label>
                <Field
                  data-test="signin-email-input"
                  className="input input-bordered input-xs sm:input-sm md:input-md w-full text-xs"
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
                  data-test="signin-password-input"
                  className="input input-bordered input-xs sm:input-sm md:input-md w-full text-xs"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {/* <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
                <label className="label cursor-pointer justify-start gap-3 mt-3">
                  <input type="checkbox" className="checkbox checkbox-xs" />
                  <span className="label-text-alt">Remember me</span>
                </label> */}
                <label className="label text-left text-error text-[10px] sm:text-[12px] w-[135px] sm:w-[165px] md:w-[190px]">
                  <ErrorMessage name="password" />
                </label>
                <button
                  data-test="signin-submit-button"
                  className="btn btn-neutral btn-xs md:btn-md"
                  type="submit"
                  disabled={!(Object.keys(errors).length === 0)}
                >
                  BROWSE RECIPES
                </button>
                <br />
                <br />
                <label className="label-text-alt text-xs sm:text-sm">
                  Don't have an account?{" "}
                  <Link className="link" to="/signup">
                    Sign Up
                  </Link>
                </label>
              </Form>
            )}
          </Formik>
          {errorMessage ? (
            <label
              data-test="signin-error-message"
              className="label text-error text-[10px] sm:text-[12px]"
            >
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
