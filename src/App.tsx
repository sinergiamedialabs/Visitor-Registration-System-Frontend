import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ToastContainerWrapper } from "./common/toast";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainerWrapper />
    </>
  );
}

export default App;
