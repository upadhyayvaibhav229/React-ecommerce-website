import React from "react";
import { img } from "../Components/img";

const Footer = () => {
  return (
    <div className="bg-gray-300 p-6 mt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center sm:text-left">
        {/* Logo & Description */}
        <div className="flex flex-col items-center sm:items-start">
          <img className="w-32" src={img.logo} alt="Logo" />
          <p className="text-gray-600 text-sm sm:text-md mt-2 max-w-xs">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>

        {/* Company Links */}
        <div className="space-y-2">
          <h1 className="font-bold text-lg sm:text-xl">Company</h1>
          <ul className="text-gray-600 space-y-1">
            <li className="hover:text-black cursor-pointer">Home</li>
            <li className="hover:text-black cursor-pointer">Collection</li>
            <li className="hover:text-black cursor-pointer">Delivery</li>
            <li className="hover:text-black cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <h1 className="text-lg sm:text-xl font-bold">GET IN TOUCH</h1>
          <ul className="text-gray-600 space-y-1">
            <li className="hover:text-black cursor-pointer">+1-000-000-0000</li>
            <li className="hover:text-black cursor-pointer">greatstackdev@gmail.com</li>
            <li className="hover:text-black cursor-pointer">Instagram</li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center text-gray-600 text-sm mt-6 border-t pt-4">
        &copy; 2025 GreatStack. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
