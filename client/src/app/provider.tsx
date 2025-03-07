"use client";

import ThemeProvider from "@/theme/provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider>{children}</ThemeProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};
export default Provider;
