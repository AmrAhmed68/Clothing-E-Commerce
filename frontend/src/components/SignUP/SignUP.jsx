import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import './SignUP.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdEmail, MdOutlineAccountCircle } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";

const SignUP = () => {
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
    retypePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{11}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    age: Yup.number()
      .min(18, "You must be at least 18 years old")
      .required("Age is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      retypePassword: "",
      email: "",
      phone: "",
      age: "",
      gender: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // Check if username and email are unique
        const uniqueCheck = await axios.post("https://e-commerce-data-one.vercel.app/api/checkUnique", {
          username: values.username,
          email: values.email,
        });

        if (uniqueCheck.status === 200) {
          // Proceed with registration
          const response = await axios.post("https://e-commerce-data-one.vercel.app/api/register", values);
          console.log(response.data);
          resetForm();
          navigate("/login");
        }
      } catch (error) {
        const errorMsg = error.response?.data?.error || "An error occurred during sign up";
        setErrorMessage(errorMsg);
        formik.setErrors({ submit: errorMsg });
      }
    },
  });


  const handleLogIn = () => {
    navigate('/login');
  };

  return (
      <div className='signup-container'>
        <div className='signup-header'>
          <p>Sign Up</p>
          <h1> </h1>
        </div>
        <form className="signup-inputs" onSubmit={formik.handleSubmit}>
          <div className="signup-input">
            <MdOutlineAccountCircle />
            <input
              type="text"
              placeholder="Username"
              {...formik.getFieldProps("username")}
            />
            </div>
            {formik.touched.username && formik.errors.username && (
              <p className="error-message">{formik.errors.username}</p>
            )}

          <div className="signup-input">
            <RiLockPasswordFill />
            <input
              type="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="error-message">{formik.errors.password}</p>
            )}

          <div className="signup-input">
            <RiLockPasswordFill />
            <input
              type="password"
              placeholder="Confirm Password"
              {...formik.getFieldProps("retypePassword")}
            />
            </div>
            {formik.touched.retypePassword && formik.errors.retypePassword && (
              <p className="error-message">{formik.errors.retypePassword}</p>
            )}

          <div className="signup-input">
            <MdEmail />
            <input
              type="email"
              placeholder="Email"
              {...formik.getFieldProps("email")}
            />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="error-message">{formik.errors.email}</p>
            )}

          <div className="signup-input">
            <FaPhoneAlt />
            <input
              type="text"
              placeholder="Phone number"
              {...formik.getFieldProps("phone")}
            />
          </div>
            {formik.touched.phone && formik.errors.phone && (
              <p className="error-message">{formik.errors.phone}</p>
            )}

          <div className="signup-input">
            <MdOutlineAccountCircle />
            <input
              type="text"
              placeholder="Age"
              {...formik.getFieldProps("age")}
            />
            </div>
            {formik.touched.age && formik.errors.age && (
              <p className="error-message">{formik.errors.age}</p>
            )}

          <div className="signup-input">
            <select
              {...formik.getFieldProps("gender")}
              defaultValue=""
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            </div>
            {formik.touched.gender && formik.errors.gender && (
              <p className="error-message">{formik.errors.gender}</p>
            )}

          {formik.errors.submit && (
            <p className="error-message">{formik.errors.submit}</p>
          )}
          <button type="submit" className="Signup-submit">
            Register
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        <div className='Login-header'>
        <h2>Already have an account? <span onClick={handleLogIn} style={{cursor : "pointer" , color : "black"}} >LogIn</span></h2>
      </div>
      </div>

  );
};

export default SignUP;
