import React from "react";
import search from './assets/frontend_assets/src_icon.png'
import logo from './assets/frontend_assets/logo.png'
import cart from './assets/frontend_assets/cart_icon.png'
const Header = () => {
  return (
    <header className="sticky top-0 z-50">
      <nav className="text-black shadow-md flex justify-between items-center p-4">
        {/* Logo */}
        <div>
          <img
            src={logo}
            className="mr-3 h-12"
            alt="Logo"
          />
        </div>

        {/* Navigation */}
        <div>
          <ul className="flex space-x-4 text-xl font-serif">
            <li>Home</li>
            <li>Collection</li>
            <li>About</li>
            <li>Contact</li>
            <li className="bg-transparent text-sm border rounded-full p-1 font-light">Admin Pannel</li>
          </ul>
        </div>

        {/*icons  */}
        <div className="flex space-x-5">
            {/* give search icon */}
            <img src={search} alt="" className="h-5 cursor-pointer" />
            <img src={cart} alt="" className="h-5 cursor-pointer" />
            <img src={cart} alt="" className="h-5 cursor-pointer" />
        </div>

      </nav>
    </header>
  );
};

export default Header;
