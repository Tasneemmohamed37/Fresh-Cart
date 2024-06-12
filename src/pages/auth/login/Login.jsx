import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userContext } from "../../../context/User.Context";
import { Helmet } from "react-helmet";

export default function Login() {

  let {token, setToken} = useContext(userContext);
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const [backEndLogInErrorMsg, setBackEndLogInErrorMsg] = useState(null);
  const navigate = useNavigate();
  
  const validateSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("please enter valid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password must contain at least one capital letter and one special character"
      )
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: validateSchema,
    onSubmit: submitLogin
  });


  async function submitLogin(values){
    let loadingID = toast.loading('LogIn...');
    try{
      const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values);
      toast.dismiss(loadingID);
        console.log(data);  
        toast.success('LoggedIn Successfully');
        setTimeout(()=>{
            if(data.message == 'success'){
              localStorage.setItem('token',data.token)
              setToken(data.token)
              navigate('/');
            }
        },1000);
      }
      catch(error){
        toast.dismiss(loadingID);
        console.error('Error Login :', error);
        setBackEndSignUpErrorMsg(error.response.data.message);
      }
  }

  return (
    <>
    <Helmet>
      <title>Login</title>
    </Helmet>
      <section>
        <h2 className="text-mainColor text-2xl">
          <i className="fa-regular fa-circle-user me-3"></i>
          <span>LogIn Now</span>
        </h2>
        <form
          className="flex flex-col gap-3 p-5"
          onSubmit={formik.handleSubmit}
        >
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
          {backEndLogInErrorMsg ? (
            <div className="error">* {backEndLogInErrorMsg}</div>
          ) : (
            ""
          )}
          <button type="submit" className="btn-primary w-fit">
            LogIn
          </button>
        </form>
      </section>
    </>
  );
}
