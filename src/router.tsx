import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import { InviteApproval } from "./components/inviteApproval";
import Invite from "./components/invitationRequest";
import UserRegistration from "./components/userRegistration";
import { PageNotFound } from "./components/pageNotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Invite />,
  },
  {
    path: "/invite_approval/:id",
    element: <InviteApproval />,
  },
  {
    path: "/user_registration",
    element: <UserRegistration />,
  },
  { path: '*', element: <PageNotFound />},
]);
