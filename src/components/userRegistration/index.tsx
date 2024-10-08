import React, { useState } from "react";
import styles from "./userRegister.module.scss";
import { Box, Button, CircularProgress, MenuItem } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useUserRegistrationMutation } from "../../services/invite";

const UserRegistration: React.FC = () => {
  const [userRegistration, { isLoading: registerMutationLoading }] =
    useUserRegistrationMutation();

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required*"),
    email: Yup.string()
      .required("Email is required*")
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email address"
      )
      .matches(
        /@[a-zA-Z0-9._-]{3,}\.+[a-zA-Z]{2,}$/,
        "Please enter a valid email address"
      ),
    phoneNumber: Yup.string()
      .required("Contact number is required*")
      .max(15, "Contact number must not exceed 14 digits"),
  });
  const handleSubmit = async (values: any) => {
    const payload = {
      fullName: values.fullName,
      email: values.email,
      phoneNumber: values.phoneNumber,
    };

    try {
      const response = await userRegistration(payload);
      if (response.error) {
        toast.error("Email already exists.");
      } else {
        toast.success("User registered succesfully.");
      }
    } catch {
      toast.error("Failed to submit.");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <Box className={styles.centeredBox}>
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              phoneNumber: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ isSubmitting }) => (
              <Form className={styles.contentColumn}>
                <div className={styles.headingLabel}>User Registration</div>
                <div className={styles.fieldDiv}>
                  <label className={styles.labelStyles} htmlFor="fullName">Full Name</label>
                  <Field
                    name="fullName"
                    id="fullName"
                    className={styles.textField}
                    label="Full Name"
                  ></Field>
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className={styles.error}
                  />
                </div>
                <div className={styles.fieldDiv}>
                  <label className={styles.labelStyles}  htmlFor="email">Email</label>
                  <Field
                    name="email"
                    id="email"
                    type="email"
                    className={styles.textField}
                    label="Email"
                  ></Field>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={styles.error}
                  />
                </div>
                <div className={styles.fieldDiv}>
                  <label className={styles.labelStyles}  htmlFor="phoneNumber">Contact Number</label>
                  <Field
                    name="phoneNumber"
                    id="phonenumber"
                    type="number"
                    className={styles.textField}
                    label="Phone number"
                  ></Field>
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className={styles.error}
                  />
                </div>
                <Button type="submit" className={styles.inviteButton}>
                  {registerMutationLoading === true ? (
                    <CircularProgress className={styles.loaderStyles} />
                  ) : (
                    "User Register"
                  )}
                </Button>
                <a href="/" className={styles.hrefStyles}>
                  Invite User
                </a>
              </Form>
            )}
          </Formik>
        </Box>
      </div>
    </div>
  );
};
export default UserRegistration;
