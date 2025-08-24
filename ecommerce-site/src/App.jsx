import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Pages/Footer";
import { ToastContainer } from "react-toastify";
import Breadcrumb from "./Breadcrump";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./Features/authSlice";
// import { fetchCurrentUser } from "./redux/authSlice";
import { useLocation } from "react-router-dom";

export default function App() {
  const dispatch = useDispatch();


const location = useLocation();

useEffect(() => {
  if (!["/login", "/sign-up"].includes(location.pathname)) {
    dispatch(fetchCurrentUser());
  }
}, [location.pathname]);

  return (
    <>
      <Breadcrumb />
      <ToastContainer />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
