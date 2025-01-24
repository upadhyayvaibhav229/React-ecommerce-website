import React from "react";
import search from "./assets/frontend_assets/src_icon.png";
import logo from "./assets/frontend_assets/logo.png";
import cart from "./assets/frontend_assets/cart_icon.png";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="text-black shadow-md flex justify-between items-center p-4">
        {/* Logo */}
        <div>
          <Link to={"/"}>
            <img src={logo} className="mr-3 h-12 cursor-pointer" alt="Logo" />
          </Link>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex">
          <ul className="flex space-x-4 text-xl font-serif">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 ${
                    isActive ? "text-orange-700" : "text-gray-700"
                  } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/collection"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 ${
                    isActive ? "text-orange-700" : "text-gray-700"
                  } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                }
              >
                Collection
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 ${
                    isActive ? "text-orange-700" : "text-gray-700"
                  } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 ${
                    isActive ? "text-orange-700" : "text-gray-700"
                  } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                }
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `bg-transparent text-sm border rounded-full p-1 font-light cursor-pointer duration-200 ${
                    isActive ? "text-orange-700" : "text-gray-700"
                  } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                }
              >
                Admin Panel
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Icons */}
        <div className="flex space-x-5">
          {/* Search Icon */}
          <img src={search} alt="Search Icon" className="h-5 cursor-pointer" />
          {/* Cart Icon */}
          <img src={cart} alt="Cart Icon" className="h-5 cursor-pointer" />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button className="text-gray-700 hover:text-orange-700">
            <i className="fas fa-bars text-xl"></i> {/* Hamburger icon */}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
