import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import "./style.css";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";

const Login: React.FC = (): JSX.Element => {
 const history = useHistory();

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (data: unknown) => {
    try {
      const res = await axios.post("http://localhost:3001/login",data);
      if(res.status===200){
        const userid = localStorage.setItem("userid", res.data.data);
        const storage = localStorage.setItem("token", res.data.token);
        setTimeout(() => localStorage.removeItem('token'), 2*60*60*1000)
      }
      else{
        alert("login error")
      }
      if (localStorage.getItem("token") === res.data.token) {
        history.push("/todo-dashboard"); 
      }
      else{
        alert("please check your credentials");
      }
    } catch (err) {
      alert("something went wrong please check your credentials");
    }
  };
  const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(18, "Password must not exceed 18 characters"),
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formikProps) => (
        <div className="wrapper">
          <div className="form-wrapper">
            <h2>Login</h2>
            <form onSubmit={formikProps.handleSubmit}>
              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Email"
                  onChange={formikProps.handleChange}
                  value={formikProps.values.email}
                />
                {formikProps.errors.email ? (
                  <div className="error"> {formikProps.errors.email} </div>
                ) : null}
              </div>
              <div className="password">
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Password"
                  onChange={formikProps.handleChange}
                  value={formikProps.values.password}
                />
                {formikProps.errors.password ? (
                  <div className="error">{formikProps.errors.password}</div>
                ) : null}
              </div>
              <div className="loginsubmit">
                <button
                  className="button"
                >
                  <span>Login</span>
                </button>
              </div>
            </form>
            <br />
            <a  href="/register">Don't have an account?</a>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Login;
