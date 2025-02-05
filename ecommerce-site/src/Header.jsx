import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartCount } from "./Features/cartSlice";
import { ShoppingCart, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { img } from "./Components/img";
import { useSearchFilter } from "./Features/SearchFilter";
import SearchBar from "./Components/SearchBar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const totalQuantity = useSelector(getCartCount);
  const location = useLocation();

  // Get search filter state
  const { showSearch, setShowSearch } = useSearchFilter();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/collection" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="shadow-md bg-white">
      <nav className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/">
          <img src={img.logo} className="h-12 cursor-pointer" alt="Logo" />
        </Link>

        {/* Navbar Links */}
        <ul className="flex gap-6 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`relative pb-2 ${
                  location.pathname === link.path ? "text-blue-600" : ""
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-5">
          <button onClick={() => setShowSearch(!showSearch)}>
            <Search className="w-5 h-5 cursor-pointer text-gray-700" />
          </button>

          <Link to="/cart" className="relative">
            <ShoppingCart className="w-5 h-5 cursor-pointer text-gray-700" />
            {totalQuantity > 0 && (
              <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-white bg-red-500 rounded-full text-xs">
                {totalQuantity}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Conditionally render the Search Bar */}
      {showSearch && <SearchBar />}
    </header>
  );
};

export default Header;
