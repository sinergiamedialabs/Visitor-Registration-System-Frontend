import React, { useState } from "react";
import styles from '../inviteApproval/inviteApproval.module.scss'

interface PageNotFoundProps {
  // Define any props here if needed
}

export const PageNotFound: React.FC<PageNotFoundProps> = () => {

  return (
    <div className={styles.inviteMainContainer}>
      <div className={styles.inviteSubContainer}>
        Page Not Found
      </div>
    </div>
  );
}
