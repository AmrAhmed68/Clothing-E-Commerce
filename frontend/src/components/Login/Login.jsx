import React from "react";
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
          console.error('Login failed:', result.message);
        }
      } catch (err) {
        console.error('Error:', err);
      }
    },
  });

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <>
      <section className='Login-container'>
        <div className='Login-header'>
          <p>Login</p>
        </div>

        <form className="Login-inputs" onSubmit={formik.handleSubmit}>
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

          <button type="submit" className="Login-submit">Login to my account</button>
        </form>

      </section>

      <section className='Login-container'>
      <div className='Login-header'>
        <p>Don't have an account?</p>
      </div>
        <button onClick={handleSignUp} className="Login-submit">Sign Up</button>
      </section>
    </>
  );
};

export default Login;
