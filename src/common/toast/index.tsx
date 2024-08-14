import { ToastContainer, ToastContainerProps, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
injectStyle();
const toastContainerProps: ToastContainerProps = {
  position: "bottom-center",
  autoClose: false,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
  limit: 3,
  bodyStyle: {
    fontFamily: "Poppins",
    fontSize: 16,
  },
};
export const ToastContainerWrapper = (props: ToastContainerProps) => {
  return <ToastContainer {...toastContainerProps} {...props} />;
};
export { ToastContainer, toast };
