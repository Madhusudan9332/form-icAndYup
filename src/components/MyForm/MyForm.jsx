import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Styles from './MyForm.module.css'; 

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const MyForm = () => {
  // Initial form values
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  // Function to handle form submission
  const onSubmit = async (values, { resetForm }) => {
    const formValues ={
      name: values.name,
      email: values.email,
      password: values.password,
    }
    console.log("Form data submitted:", formValues);
    try {
      const response = await fetch('https://usersapp-vhoy.onrender.com/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      console.log("Form data submitted successfully:", formValues);
      resetForm(); // Reset form after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className={Styles.container}>
      <h1 className={Styles.heading}>Classic Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isValid, isSubmitting }) => (
          <Form className={Styles.form}>
            <div className={Styles.fieldContainer}>
              <label htmlFor="name">Name:</label>
              <Field type="text" id="name" name="name" className={Styles.input} />
              <ErrorMessage name="name" component="div" className={Styles.error} />
            </div>

            <div className={Styles.fieldContainer}>
              <label htmlFor="email">Email:</label>
              <Field type="email" id="email" name="email" className={Styles.input} />
              <ErrorMessage name="email" component="div" className={Styles.error} />
            </div>

            <div className={Styles.fieldContainer}>
              <label htmlFor="password">Password:</label>
              <Field type="password" id="password" name="password" className={Styles.input} />
              <ErrorMessage name="password" component="div" className={Styles.error} />
            </div>

            <div className={Styles.fieldContainer}>
              <label htmlFor="confirm_password">Confirm Password:</label>
              <Field type="password" id="confirm_password" name="confirm_password" className={Styles.input} />
              <ErrorMessage name="confirm_password" component="div" className={Styles.error} />
            </div>

            {/* Conditionally display the submit button if the form is valid */}
            {isValid && (
              <div>
                <button type="submit" className={Styles.button} disabled={isSubmitting}>
                  Submit
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MyForm;
