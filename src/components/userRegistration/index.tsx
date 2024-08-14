import React, { useState } from "react";
import styles from "./userRegister.module.scss";
import { Box, Button, MenuItem } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useUserRegistrationMutation } from "../../services/invite";

const UserRegistration: React.FC = () => {
  const [userRegistration] = useUserRegistrationMutation();

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Fullname is required*"),
    email: Yup.string().required("Email is required*"),
    phoneNumber: Yup.string().required("Phone number is required*"),
  });
  const handleSubmit = async(values: any) => {
    const payload = {
      "fullName": "megha",
      "email": "megha.mohandas@simelabs.com",
      "phoneNumber": "9400315869"
    }
    
    try {
      const response = await userRegistration(payload);
      console.log(response);
    } catch {
      toast.error("Error");
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
                  <label>Contact number</label>
                  <Field
                    name="phonenumber"
                    id="phonenumber"
                    type="email"
                    className={styles.textField}
                    label="Phone number"
                  >
                  </Field>
                  <ErrorMessage
                    name="phonenumber"
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
