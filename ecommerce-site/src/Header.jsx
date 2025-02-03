import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartCount } from "./Features/cartSlice";  // Importing the selector
import { setSearchTerm } from "./Features/shopSlice";
import { Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { searchTerm } = useSelector(state => state.shop);
  const totalQuantity = useSelector(getCartCount);  // Using the selector here
  const handleSearch = (e) => dispatch(setSearchTerm(e.target.value));

  return (
    <header className="shadow-md bg-white">
      <nav className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/">
          <img src="/path/to/logo.png" className="h-12 cursor-pointer" alt="Logo" />
        </Link>

        {/* Icons */}
        <div className="flex items-center gap-5">
          <button onClick={() => setShowSearch(!showSearch)}>
            <Search className="w-5 h-5 cursor-pointer text-gray-700" />
          </button>

          <Link to="/cart" className="relative">
            {/* Shopping Cart Icon */}
            <ShoppingCart className="w-5 h-5 cursor-pointer text-gray-700" />

            {/* Display the cart quantity */}
            {totalQuantity > 0 && (
              <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-white bg-red-500 rounded-full text-xs">
                {totalQuantity}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
