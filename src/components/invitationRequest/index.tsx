import React, { useEffect, useState } from "react";
import styles from "./inviteRequest.module.scss";
import { Box, Button, MenuItem } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  useInviteeRequestMutation,
  useMasterApiQuery,
} from "../../services/invite";
import { error } from "console";

const Invite: React.FC = () => {
  const { data: masterApiData } = useMasterApiQuery();
  const [inviteMutation] = useInviteeRequestMutation();

  const [dropdownOptions, setDropdownOptions] = useState<any>({
    nameList: [],
    venueList: [],
    eventList: [],
  });

  useEffect(() => {
    if (masterApiData) {
      const nameList = masterApiData?.data?.user?.map((user: any) => ({
        value: user.id,
        label: user.fullName,
      }));

      const venueList = masterApiData?.data?.venue.map((venue: any) => ({
        value: venue.id,
        label: venue.name,
      }));

      const eventList = masterApiData?.data?.event.map((event: any) => ({
        value: event.id,
        label: event.name,
      }));

      setDropdownOptions({
        nameList,
        venueList,
        eventList,
      });
    }
  }, [masterApiData]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required*"),
    venue: Yup.string().required("Venue is required*"),
    event: Yup.string().required("Event is required*"),
  });

  const initialValues = {
    name: "",
    event: "",
    venue: "",
  };

  const handleSubmit = async (values: any) => {
    const payload = {
      userId: values.name,
      venueId: values.venue,
      eventId: values.event,
      url: `${window.location.href}invite_approval`,
    };
    console.log(window.location.href);

    try {
      const response = await inviteMutation(payload);
      console.log(response);
      if (response?.data?.status === true) {
        toast.success("Invitation successfully send");
      } else if (response?.error) {
        toast.error("Email already sent to the user for this event.");
      }
    } catch {
      toast.error("Error");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <Box className={styles.centeredBox}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ isSubmitting, values }) => (
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
                    <option style={{ color: "black" }} value="" disabled>
                      Select Name
                    </option>
                    {dropdownOptions.nameList.map((option: any) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
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
                    <option style={{ color: "black" }} value="" disabled>
                      Select Venue
                    </option>
                    {dropdownOptions.venueList.map((option: any) => (
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
                    <option value="" disabled>
                      Select Event
                    </option>
                    {dropdownOptions.eventList.map((option: any) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
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
