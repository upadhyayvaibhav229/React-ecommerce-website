import React, { useState } from "react";
import search from "./assets/frontend_assets/src_icon.png";
import logo from "./assets/frontend_assets/logo.png";
import cart from "./assets/frontend_assets/cart_icon.png";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectShop, setSearchTerm } from "./Features/shopSlice";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const { searchTerm } = useSelector(selectShop); // Get searchTerm from Redux store

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value)); // Update searchTerm in Redux store
  };

  return (
    <header>
      <nav className="text-black shadow-md flex justify-between items-center p-4">
        <div>
          <Link to={"/"}>
            <img src={logo} className="mr-3 h-12 cursor-pointer" alt="Logo" />
          </Link>
        </div>

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
                    isActive ? "text-orange-700 font-bold" : "text-gray-700"
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
        <div className="flex space-x-5 relative">
          {/* Search Icon */}
          <img
            src={search}
            alt="Search Icon"
            className="h-5 cursor-pointer"
            onClick={() => setShowSearch(!showSearch)}
          />

          {/* Cart Icon */}
          <img
            src={cart}
            alt="Cart Icon"
            className="h-5 cursor-pointer"
          />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button className="text-gray-700 hover:text-orange-700">
            <i className="fas fa-bars text-xl"></i> {/* Hamburger icon */}
          </button>
        </div>
      </nav>

      {/* Full-Width Search Input */}
      {showSearch && (
        <div className="w-full flex justify-center items-center bg-gray-100 py-3 gap-x-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search..."
            className="w-11/12 md:w-1/4 border border-gray-400 rounded-full py-2 px-4"
          />
          <div
            className="border-b rounded-full cursor-pointer text-2xl"
            onClick={() => setShowSearch(!showSearch)}
          >
            X
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
