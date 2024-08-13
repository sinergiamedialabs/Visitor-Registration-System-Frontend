import {
  createBrowserRouter
} from "react-router-dom";
import "./index.css";
import Test from './components/test'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Test />,
  },
]);