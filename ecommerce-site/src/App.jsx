import { Outlet } from "react-router-dom";
import Home from "./Components/Hero";
import Header from "./Header";
import Footer from "./Pages/Footer";

export default function App() {
  return (
   <>
   
    <Header/>
    <Outlet/>
    <Footer/>
   </>
  )
}