import {
  createBrowserRouter
} from "react-router-dom";
import "./index.css";
import Test from './components/test'
import { InviteApproval } from "./components/inviteApproval";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Test />,
  },
  {
    path: "/invite_approval",
    element: <InviteApproval />,
  },
]);