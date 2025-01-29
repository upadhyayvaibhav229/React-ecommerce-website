import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectShop, setSearchTerm } from "./Features/shopSlice";
import { Menu, X, Search, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "./assets/frontend_assets/logo.png";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { searchTerm } = useSelector(selectShop);

  const handleSearch = (e) => dispatch(setSearchTerm(e.target.value));

  
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/collection" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Admin Panel", path: "/admin" }, 
  ];

  return (
    <header className="shadow-md bg-white">
      <nav className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/">
          <img src={logo} className="h-12 cursor-pointer" alt="Logo" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-lg font-serif">
          {menuItems.map(({ name, path }) => (
            <li key={name}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `py-2 px-3 transition ${
                    isActive ? "text-orange-700 font-bold" : "text-gray-700"
                  } hover:text-orange-700`
                }
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-5">
          <button onClick={() => setShowSearch(!showSearch)}>
            <Search className="w-5 h-5 cursor-pointer text-gray-700" />
          </button>

          <button>
            <ShoppingCart className="w-5 h-5 cursor-pointer text-gray-700" />
          </button>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-gray-100 absolute w-full left-0 top-16 shadow-lg flex flex-col items-center py-4 space-y-4"
          >
            {menuItems.map(({ name, path }) => (
              <li key={name}>
                <NavLink
                  to={path}
                  className="text-lg hover:text-orange-700 transition"
                  onClick={() => setIsMenuOpen(false)} // Close menu on click
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Search Bar */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full flex justify-center items-center bg-gray-100 py-3 gap-x-4"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search..."
              className="w-11/12 md:w-1/4 border border-gray-400 rounded-full py-2 px-4"
            />
            <button
              className="border-b rounded-full cursor-pointer text-2xl"
              onClick={() => setShowSearch(false)}
            >
              X
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
