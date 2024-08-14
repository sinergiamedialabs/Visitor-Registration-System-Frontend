import React, { useState } from "react";
import styles from './inviteApproval.module.scss'
import Barcode from "./barcode";
// import { useNavigate } from 'react-router-dom';

interface InviteProps {
  // Define any props here if needed
}

export const InviteApproval: React.FC<InviteProps> = () => {
  const [randomBarcodeNumber, setRandomBarcodeNumber] = useState<string | null>(null);
  console.log("randomBarcodeNumber:",randomBarcodeNumber)
//   const navigate = useNavigate(); 

  const generateRandomNumber = () => {
    const length = 12; // Adjust the length of the random number as needed
    let result = '';
    const characters = '0123456789';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setRandomBarcodeNumber(result); // Update the state with the new barcode number
  };

//   const handleCancel = () => {
//     setRandomBarcodeNumber(null); 
//     navigate('/');
//   };

  return (
    <div className={styles.inviteMainContainer}>
      <div className={styles.inviteSubContainer}>
        {!randomBarcodeNumber ? (
          <>
            <span className={styles.inviteHeaderText}>Do you wish to accept the invitation?</span>
            <div className={styles.inviteDetails}>
                <div className={styles.inviteDetailsLabels}>
                <span>Event:</span>
              <span>Venue:</span>
              <span>Date: </span>
              <span>Time:</span>
                </div>
              <div className={styles.inviteDetailsLabels}>
              <span>Conference</span>
              <span>WTC</span>
              <span>15th August 2024</span>
              <span>12 pm</span>
              </div>
            </div>
            <div className={styles.inviteUserAction}>
              <button className={styles.inviteUserActionYes} onClick={generateRandomNumber}>Yes</button>
              <button className={styles.inviteUserActionNo}>No</button>
            </div>
          </>
        ) : (
          <div className={styles.BarcodeContainer}>
              <span className={styles.inviteHeaderText}>Here is your Barcode</span>
            <Barcode value={randomBarcodeNumber} /> {/* Display the barcode */}
            {/* <button className={styles.inviteUserActionNo} onClick={handleCancel}>Cancel</button> */}
          </div>
        )}
      </div>
    </div>
  );
}
