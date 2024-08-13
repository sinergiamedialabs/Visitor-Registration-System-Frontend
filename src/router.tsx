import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import Test from "./components/test";
import Invite from "./components/invitationRequest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Invite />,
  },
]);
