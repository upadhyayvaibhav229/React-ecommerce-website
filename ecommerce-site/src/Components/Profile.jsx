import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectShop } from "../Features/shopSlice";
import { img } from "./img"; // Default image

const Profile = () => {
  const navigate = useNavigate();

  // Redux state
  const { currency } = useSelector(selectShop);
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.auth.user); // <-- get user from Redux auth

  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(img.default_img);
  const [showPopup, setShowPopup] = useState(false);
  const [newImage, setNewImage] = useState(null);

  // toggle popup
  const handlePopup = () => setShowPopup(!showPopup);

  // clear image
  const removeImage = () => {
    setImageUrl(img.default_img);
    setNewImage(null);
  };

  useEffect(() => {
    if (user) {
      // when user details available
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [user]);

  // popup scroll lock
  useEffect(() => {
    document.body.style.overflow = showPopup ? "hidden" : "auto";
  }, [showPopup]);

  // handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-start justify-center bg-gray-100">
        <div className="bg-white w-[450px] mt-4 shadow-2xl rounded-2xl p-8 text-center">
          {loading ? (
            <>
              <div className="animate-spin h-8 w-8 border-b-2 border-blue-500 rounded-full mx-auto"></div>
              <span className="block mt-4 text-gray-600">Loading...</span>
            </>
          ) : user ? (
            <div>
              <div className="flex flex-row justify-around items-center">
                {/* Profile Image */}
                <div className="relative">
                  <img
                    src={imageUrl}
                    alt="Profile"
                    className="w-28 h-28 rounded-full border-4 border-blue-400 shadow-md"
                  />
                  <button
                    onClick={handlePopup}
                    className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition"
                  >
                    ✎
                  </button>
                </div>

                <div className="mt-5 text-gray-700 space-y-2 text-left">
                  <p className="text-xl font-semibold">{user.fullName}</p>
                  <p className="text-gray-500">{user.username}</p>
                  <p className="text-gray-500">{user.email || "N/A"}</p>
                  <p className="text-gray-500">{user.phone || "N/A"}</p>
                <button className="bg-blue-500 px-5 py-2 font-bold text-sm rounded cursor-pointer text-white ">Edit</button>
                </div>
              </div>

              <div className="mt-6 text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Selected Items:
                </h3>
                {cart.length > 0 ? (
                  <ul className="space-y-3 text-gray-700">
                    {cart.map((item, index) => (
                      <li
                        key={index}
                        className="p-3 bg-gray-100 rounded-lg flex items-center gap-4 shadow-sm"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-12 rounded-md"
                        />
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-gray-500">
                            {currency} {item.price} | Qty: {item.quantity}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No items selected yet.</p>
                )}
              </div>
            </div>
          ) : (
            <div>
              <p className="text-red-500 mb-4">You are not logged in.</p>
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-[400px] shadow-2xl rounded-2xl p-6 text-center relative animate-fade-in">
            <button
              onClick={handlePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Edit Profile
            </h2>

            {/* Profile Image */}
            <img
              src={imageUrl}
              alt="Profile"
              className="w-24 h-24 mx-auto rounded-full border-4 border-blue-400 shadow-md mb-4"
            />

            {!newImage && (
              <input
                type="file"
                onChange={handleImageChange}
                className="mb-4 block w-full text-gray-600 text-sm border p-2 rounded-lg shadow-sm"
              />
            )}

            <button
              onClick={handlePopup}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
            >
              Save Changes
            </button>

            {newImage && (
              <button
                onClick={removeImage}
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all mt-3"
              >
                Remove Image
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
