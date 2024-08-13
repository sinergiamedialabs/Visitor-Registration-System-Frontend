import React, { useState } from "react";
import styles from "./inviteRequest.module.scss";
import { Box, Button, MenuItem } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const Invite: React.FC = () => {
  const [dropdownOptions, setDropdownOptions] = useState({
    dropdownOne: [],
    dropdownTwo: [],
    dropdownThree: [],
  });

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
                <div className={styles.headingLabel}>Heading Label</div>
                <div className={styles.fieldDiv}>
                  <label className={styles.labelStyles}>Name</label>
                  <Field
                    name="name"
                    as="select"
                    label="Name"
                    className={styles.fieldStyles}
                  >
                    {dropdownOptions.dropdownOne.map((option: any) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={styles.error}
                  />
                </div>
                <div className={styles.fieldDiv}>
                  <label>Venue</label>
                  <Field
                    name="venue"
                    id="venue"
                    as="select"
                    className={styles.fieldStyles}
                    label="Venue"
                  >
                    {dropdownOptions.dropdownTwo.map((option: any) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="venue"
                    component="div"
                    className={styles.error}
                  />
                </div>
                <div className={styles.fieldDiv}>
                  <label>Event</label>
                  <Field
                    name="event"
                    as="select"
                    className={styles.fieldStyles}
                    label="Event"
                  >
                    {dropdownOptions.dropdownThree.map((option: any) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="event"
                    component="div"
                    className={styles.error}
                  />
                </div>
                <Button
                  type="submit"
                  className={styles.inviteButton}
                  disabled={isSubmitting}
                >
                  Invite
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </div>
    </div>
  );
};
export default Invite;
