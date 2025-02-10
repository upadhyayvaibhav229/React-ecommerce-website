import { Outlet } from "react-router-dom";
import Home from "./Components/Hero";
import Header from "./Header";
import Footer from "./Pages/Footer";
import { ToastContainer, toast } from 'react-toastify';
import Breadcrumb from "./Breadcrump";


export default function App() {
  return (
   <>
    <Breadcrumb/>
   <ToastContainer/>
    <Header/>
    <Outlet/>
    <Footer/>
   </>
  )
}