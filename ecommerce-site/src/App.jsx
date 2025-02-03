import { Outlet } from "react-router-dom";
import Home from "./Components/Hero";
import Header from "./Header";
import Footer from "./Pages/Footer";
import { ToastContainer, toast } from 'react-toastify';


export default function App() {
  return (
   <>
   <ToastContainer/>
    <Header/>
    <Outlet/>
    <Footer/>
   </>
  )
}