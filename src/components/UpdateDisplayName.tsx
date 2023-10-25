import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import updateDisplayNameValidation from "../validations/updateDisplayNameValidation.js";
import tooltip from "../content/tooltip/data.js";
import infosvg from "../content/svg/Info_fill.svg";
import { toast } from "react-toastify";
import IProfileDetails from "../types/ProfileDetailsInterface.js";
import urlcat from "urlcat";

const SERVER = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_PROD
  : import.meta.env.VITE_API_URL_DEV;

  type updateDisplayNameProps = {
    profileDetails: IProfileDetails; 
    displayNameChanged: boolean; 
    setDisplayNameChanged: React.Dispatch<React.SetStateAction<boolean>>; 
  }

function UpdateDisplayName({ profileDetails, displayNameChanged, setDisplayNameChanged }: updateDisplayNameProps) {
  const token = sessionStorage.getItem("token");
  const [errorMessage, setErrorMessage] = useState(null);
  const updateDisplayNameModal = document.querySelector("#my_modal_7") as HTMLInputElement | null; 

  const submitUpdateDisplayName = (values: { new_display_name: string }, resetForm: any) => {
    const url = urlcat(SERVER, "/user/update_display_name");
    axios
      .post(url, values, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data.status === "success"){
          updateDisplayNameModal!.checked = false; 
          toast.success("Display name updated successfully!"); 
          setDisplayNameChanged(!displayNameChanged); 
          resetForm({ values: '' })
        }
      })
      .catch((err) => setErrorMessage(err.response.data.message));
  };

  return (
    <>
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <Formik
            initialValues={{ current_display_name: "", new_display_name: "" }}
            validationSchema={updateDisplayNameValidation}
            onSubmit={(values, {resetForm}) => {
              submitUpdateDisplayName(values, resetForm);
              setErrorMessage(null);
            }}
          >
            {({ errors, touched, handleChange, handleBlur }) => (
              <Form>
                <label className="label text-xs sm:text-sm font-medium">
                  Current Display Name
 
                </label>
                <Field
                  className="input input-bordered input-xs md:input-sm w-full text-xs" disabled
                  name="current_display_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={profileDetails.display_name}
                />
                <label className="label text-left text-error text-[10px] sm:text-[12px] w-[135px] sm:w-[165px] md:w-[190px]">
                  <ErrorMessage name="current_display_name" />
                </label>

                <label className="label text-xs sm:text-sm font-medium">
                  New Display Name
                  <div
                    className="tooltip tooltip-left"
                    data-tip={tooltip.username}
                  >
                    <img src={infosvg} />
                  </div>
                </label>
                <Field
                  className="input input-bordered input-xs md:input-sm w-full text-xs"
                  name="new_display_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label className="label text-left text-error text-[10px] sm:text-[12px] w-[135px] sm:w-[165px] md:w-[190px]">
                  <ErrorMessage name="new_display_name" />
                </label>

                <br />
                <div className="flex flex-row justify-between">
                  <label
                    htmlFor="my_modal_7"
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
                    Update Display Name
                  </button>
                </div>
                {errorMessage !== null && <p className="label text-left text-error text-[10px] sm:text-[12px] w-[135px] sm:w-[165px] md:w-[190px]">{errorMessage}</p>}
              </Form>
            )}
          </Formik>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </>
  );
}
export default UpdateDisplayName;
