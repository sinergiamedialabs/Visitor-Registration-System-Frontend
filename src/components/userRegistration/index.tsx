import React, { useState } from "react";
import styles from "./userRegister.module.scss";
import { Box, Button, MenuItem } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const UserRegistration: React.FC = () => {

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required*"),
    venue: Yup.string().required("Venue is required*"),
    event: Yup.string().required("Event is required*"),
  });
  const handleSubmit = () => {
    // alert("Submit");
    toast.success("msg");
  };
  const handletest = () => {
    // alert("Submit");
    toast.success("msg");
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <Box className={styles.centeredBox}>
          <Formik
            initialValues={{
              name: "",
              venue: "",
              event: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className={styles.contentColumn}>
                <div className={styles.headingLabel}>User Registration</div>
                <div className={styles.fieldDiv}>
                  <label>Full name</label>
                  <Field
                    name="fullname"
                    id="fullname"
                    className={styles.textField}
                    label="Full name"
                  >
                  </Field>
                  <ErrorMessage
                    name="fullname"
                    component="div"
                    className={styles.error}
                  />
                </div>      
                <div className={styles.fieldDiv}>
                  <label>Email</label>
                  <Field
                    name="email"
                    id="email"
                    type="email"
                    className={styles.textField}
                    label="Email"
                  >
                  </Field>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={styles.error}
                  />
                </div>   
                <div style={{}}>
                  <label>Email</label>
                  <Field
                    name="email"
                    id="email"
                    type="email"
                    className={styles.textField}
                    label="Email"
                  >
                  </Field>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={styles.error}
                  />
                </div>       
                  <Button
                  type="submit"
                  className={styles.inviteButton}
                  disabled={isSubmitting}
                >
                  User Register
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </div>
    </div>
  );
};
export default UserRegistration;
