import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function SignUp() {

  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
  const phoneRegex = /(?:\+?20)?(0?1[0125]\d{8}|0?2\d{7,8}|0?3\d{7,8}|0?[4689]\d{7})/;
  const [backEndSignUpErrorMsg, setBackEndSignUpErrorMsg] = useState(null);
  const navigate = useNavigate();
  
  const validateSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .matches(
        nameRegex,
        "name must be two words separate with space and greater than 3 chars and less than 15 without any special chars"
      ),
    phone: Yup.string()
      .required("Phone is required")
      .matches(phoneRegex, "phone must start with 01 followed by 0|1|2|5 then nine numbers"),
    email: Yup.string()
      .required("Email is required")
      .email("please enter valid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password must contain at least one capital letter and one special character"
      ),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref('password')],'rePassword and password must be the same'),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validateSchema,
    onSubmit: submitRegister
  });


  async function submitRegister(values){
    let loadingID = toast.loading('SignUp...');
    try{
      const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values);
      toast.dismiss(loadingID);
        console.log(data); //todo save token in local storage 
        toast.success('Account Created Successfully');
        setTimeout(()=>{
            if(data.message == 'success'){
              navigate('/login');
            }
        },1000);
      }
      catch(error){
        toast.dismiss(loadingID);
        console.error('Error submitting form:', error);
        setBackEndSignUpErrorMsg(error.response.data.message);
      }
  }

  return (
    <>
      <section>
        <h2 className="text-mainColor text-2xl">
          <i className="fa-regular fa-circle-user me-3"></i>
          <span>Register Now</span>
        </h2>
        <form
          className="flex flex-col gap-3 p-5"
          onSubmit={formik.handleSubmit}
        >
          <div>
          <input
            type="text"
            placeholder="username"
            name="name"
            className="form-control"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="error">* {formik.errors.name}</div>
          ) : (
            ""
          )}
          </div>
          <div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="form-control"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="error">* {formik.errors.email}</div>
          ) : (
            ""
          )}
          </div>
          <div>
            <input
            type="tel"
            placeholder="phone"
            name="phone"
            className="form-control"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="error">* {formik.errors.phone}</div>
          ) : (
            ""
          )}
          </div>
          <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="form-control"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="error">* {formik.errors.password}</div>
          ) : (
            ""
          )}
          </div>
          <div>
          <input
            type="password"
            placeholder="rePassword"
            name="rePassword"
            className="form-control"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="error">* {formik.errors.rePassword}</div>
          ) : (
            ""
          )}
          </div>
          {backEndSignUpErrorMsg ? (
            <div className="error">* {backEndSignUpErrorMsg}</div>
          ) : (
            ""
          )}
          <button type="submit" className="btn-primary w-fit">
            Sign Up
          </button>
        </form>
      </section>
    </>
  );
}
