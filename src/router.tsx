import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import { InviteApproval } from "./components/inviteApproval";
import Invite from "./components/invitationRequest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Invite />,
  },
  {
    path: "/invite_approval",
    element: <InviteApproval />,
  },
]);
