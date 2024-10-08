import React, { useEffect, useState } from "react";
import styles from "./inviteApproval.module.scss";
import Barcode from "./barcode";
import {
  useVisitRequestMutation,
  useInviteDetailsQuery,
} from "../../services/invite";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

interface InviteProps {}

export const InviteApproval: React.FC<InviteProps> = () => {
  const { id } = useParams<{ id: string }>();
  const invitees_id = id;

  const {
    data: inviteDetails,
    error,
    isLoading,
  } = useInviteDetailsQuery(invitees_id!);
  const [randomBarcodeNumber, setRandomBarcodeNumber] = useState<string | null>(
    null
  );
  const [visitRequest, { isLoading: visitRequestLoading }] =
    useVisitRequestMutation();
  const [disabled, setDisabled] = useState(false);
  const [rejectMessage, setRejectMessage] = useState<string>("");

  const generateRandomNumber = () => {
    const length = 12;
    let result = "";
    const characters = "0123456789";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setRandomBarcodeNumber(result);

    if (result) {
      // Call the visitRequest API with isAccepted: true
      visitRequest({
        invitees_id: parseInt(invitees_id!),
        barCode: result,
        isAccepted: true,
      })
        .then((res) => {
          if (res?.data) {
            toast.success("Barcode generated successfully.");
          } else {
            toast.error("Failed to submit.");
          }
        })
        .catch(() => {
          toast.error("Failed to submit barcode.");
        });
    }
  };

  const handleNoClick = () => {
    // Call the visitRequest API with isAccepted: false
    visitRequest({
      invitees_id: parseInt(invitees_id!),
      barCode: "",
      isAccepted: false,
    })
      .then((res) => {
        if (res?.data) {
          toast.success("Response submitted successfully.");
        } else {
          toast.error("Failed to submit.");
        }
        setDisabled(true);
        setRejectMessage("Invitation Rejected.");
      })
      .catch(() => {
        toast.error("Failed to submit.");
      });
  };

  useEffect(() => {
    if (inviteDetails?.data.status) {
      setDisabled(true);
    }
  }, [inviteDetails]);

  return (
    <div className={styles.inviteMainContainer}>
      <div className={styles.inviteSubContainer}>
        {!randomBarcodeNumber ? (
          <>
            {isLoading ? (
              <span>
                <CircularProgress className={styles.loaderStyles} />
              </span>
            ) : (
              <>
                <span className={styles.inviteHeaderText}>
                  Do you wish to accept the invitation?
                </span>
                <div className={styles.inviteDetails}>
                  <div className={styles.inviteDetailsLabels}>
                    <span>Event :</span>
                    <span>Venue :</span>
                    <span>Address :</span>
                    <span>Date :</span>
                  </div>
                  <div className={styles.inviteDetailsData}>
                    <span>{inviteDetails?.data?.event?.name || "Event"}</span>
                    <span>{inviteDetails?.data?.venue?.name || "Venue"}</span>
                    <span>
                      {inviteDetails?.data?.venue?.address || "Address"}
                    </span>
                    <span>
                      {inviteDetails?.data?.event?.eventDate
                        ? inviteDetails?.data?.event?.eventDate
                            .split("-")
                            .reverse()
                            .join("-")
                        : "Date"}
                    </span>
                  </div>
                </div>
                <div className={styles.inviteUserAction}>
                  <button
                    className={styles.inviteUserActionYes}
                    onClick={generateRandomNumber}
                  >
                    Yes
                  </button>
                  <button
                    className={styles.inviteUserActionNo}
                    onClick={handleNoClick}
                  >
                    No
                  </button>
                </div>

                {rejectMessage && (
                  <div className={styles.rejectMessageStyles}>
                    {rejectMessage}
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <div className={styles.BarcodeContainer}>
            <span className={styles.inviteHeaderText}>
              {inviteDetails?.data?.event?.name &&
                inviteDetails?.data?.event?.name + ", "}
              {inviteDetails?.data?.venue?.name}
            </span>
            <Barcode value={randomBarcodeNumber} />
            <span className={styles.fullNameStyles}>
              {inviteDetails?.data?.user?.fullName}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
