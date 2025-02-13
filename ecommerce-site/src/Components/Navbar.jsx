import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCartCount } from "../Features/cartSlice";
import { ShoppingCart, Search } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { img } from "./img";
import SearchBar from "./SearchBar";
import { useSearchFilter } from "../Features/SearchFilter";
import { logout } from "../Features/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../Config/firebaseConfig";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalQuantity = useSelector(getCartCount);
  const location = useLocation();
  const { showSearch, setShowSearch } = useSearchFilter();
  const user = useSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      dispatch(clearCart());
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

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
          <img src={img.logo} className="sm:h-12 h-9 cursor-pointer" alt="Logo" />
        </Link>

        {/* Navbar Links (Desktop) */}
        <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`relative pb-2 ${location.pathname === link.path ? "text-blue-600" : ""}`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Icons Section */}
        <div className="flex items-center gap-4">
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

          {/* Profile / Login */}
          {user ? (
            <div className="group relative">
              <img src={img.profile_icon} className="w-6 h-6 cursor-pointer" alt="Profile" />
              <div className="hidden group-hover:flex flex-col absolute right-0 mt-2 p-2 w-36 bg-slate-100 text-gray-600 shadow-md rounded-md pointer-events-auto">
                <Link to="/profile" className="block px-4 py-2 hover:text-black">My Profile</Link>
                <Link to="/order" className="block px-4 py-2 hover:text-black">Orders</Link>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:text-black">Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="text-gray-700 hover:underline">Login</Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden" onClick={handleMenu}>
          <img src={img.menu_icon} className="w-6 h-6 cursor-pointer" alt="Menu" />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden w-full bg-blue-200 py-4 px-6">
          <ul className="flex flex-col gap-y-4 text-gray-700 font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`relative pb-2 ${location.pathname === link.path ? "text-blue-600" : ""}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Search Bar */}
      {showSearch && <SearchBar />}
    </header>
  );
};

export default Navbar;
