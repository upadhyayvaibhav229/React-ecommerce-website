import React from 'react';
import Login from './Pages/Login';
import { ToastContainer } from 'react-toastify';
// import { useAdminContext } from './Contexts/AdminContext';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import { Outlet } from 'react-router-dom';

const App = () => {
  // const { adminToken } = useAdminContext();

  return (
    <div className="min-h-screen bg-[#F8F9FD] max-w-[1600px] mx-auto">
      <ToastContainer />
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
          <Outlet />
        </div>
      </div>
    </div>
  // ) : (
  //   <div>
  //     <Login />
  //     <ToastContainer />
  //   </div>
  // );
  )
};

export default App;
