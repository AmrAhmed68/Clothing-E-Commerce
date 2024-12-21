import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import './Login.css';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); // State for error message


  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .max(15, "Username must be at most 15 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const result = await login(values.username, values.password);
        if (result.token) {
          console.log('Login successful:', result.user);
          navigate('/');
        } else {
          setErrorMessage(result.message || "Invalid credentials");
        }
      } catch (err) {
        console.error('Error:', err);
        setErrorMessage(err.response?.data?.message || 'Invalid credentials');
      }
    },
  });

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
      <div className='Login-container'>
        <div className='Login-header'>
          <p>Login</p>
          <h1> </h1>
        </div>

        <form className="Login-inputs"   onSubmit={formik.handleSubmit}>
          <div className="Login-input">
            <MdEmail />
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.errors.username && formik.touched.username ? "input-error" : ""}
              />
          </div>
          {formik.touched.username && formik.errors.username && (
            <p className="error-message">{formik.errors.username}</p>
          )}

          <div className="Login-input">
            <RiLockPasswordFill />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.errors.password && formik.touched.password ? "input-error" : ""}
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="error-message">{formik.errors.password}</p>
          )}

          <button type="submit" className="Login-submit">Login</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        
      <div className='Login-header'>
        <h2 onClick={handleSignUp} style={{cursor : "pointer"  ,  textDecoration: "underline"}}>Forget Password?</h2>
        <h2>Don't have an account? <span onClick={handleSignUp} style={{cursor : "pointer" , color : "black"}} >Sign Up</span></h2>
      </div>
      </div>

  );
};

export default Login;
