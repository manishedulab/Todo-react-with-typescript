import { useHistory } from "react-router-dom";
import "./style.css";
import * as yup from "yup";
import {Formik } from "formik";
import axios from "axios";

const Register: React.FC = (): JSX.Element =>{
 const history = useHistory();
  
  const initialValues = {
    fullname: "",
    email: "",
    password: "",
  };

  const onsubmit =async(values: unknown) => {
    try {
        const res = await axios.post("http://localhost:3001/register", values);
        
        console.log("Registered",res)
        
        if(res.data.status==400){
          alert("Email already registered");

        }
        else if(res.data.status===200){
          // const userid= localStorage.setItem("userid", res.data.data)
          const storage = localStorage.setItem("token", res.data.token );
          history.push({
            pathname:"/todo-dashboard",
            });
        }
        else if ( localStorage.getItem("token")===undefined ){
          alert("something went wrong with the token");
        } 
      } catch (err) {
        alert("something went wrong please check your credentials");
      }
  }

  const validationSchema = yup.object().shape({
    fullname: yup
      .string()
      .matches(/^[A-Za-z ]*$/, "Please enter valid name")
      .max(30)
      .required(),
    checkEmail: yup.boolean(),
    email: yup.string()
    .required("Email is required")
    .email("Email is invalid")
    .when('check email',{ is:true, then:yup.string()}),

    password: yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(14, "Password must not exceed 18 characters"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onsubmit}
    >
      {(formikProps) => (
        <div className="wrapper">
          <div className="form-wrapper">
            <h2>Register</h2>
            <form onSubmit={formikProps.handleSubmit}>
              <div className="fullname">
                <label htmlFor="fullname">Full Name</label>
                <input
                  name="fullname"
                  id="fullname"
                  type="fullname"
                  placeholder="Enter your full name"
                  required
                  onChange={formikProps.handleChange("fullname")}
                  value={formikProps.values.fullname}
                />
                {formikProps.errors.fullname ? (
                  <div className="error"> {formikProps.errors.fullname} </div>
                ) : null}
              </div>
              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  required
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
                  placeholder="Enter your password"
                  required
                  onChange={formikProps.handleChange}
                  value={formikProps.values.password}
                />
                {formikProps.errors.password ? (
                  <div className="error"> {formikProps.errors.password} </div>
                ) : null}
              </div>
              <div className="">
                <button type="submit"
                  className="button"
                >
                  <span>Register</span>
                </button>
              </div>
            </form>
            <br />
            <a href="/login">Already have account! Login</a>
          </div>
          <br />
        </div>
      )}
    </Formik>
  );
}
export default Register;