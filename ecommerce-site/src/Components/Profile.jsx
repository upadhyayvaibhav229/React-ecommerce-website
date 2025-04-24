import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { auth } from "../Config/firebaseConfig";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { selectShop } from "../Features/shopSlice";
import { img } from "./img"; // Default image
import { useNavigate } from "react-router-dom"; // Fixed navigation

const Profile = () => {
  const navigate = useNavigate(); // Added useNavigate
  const [userDetail, setUserDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(img.default_img);
  const [showPopup, setShowPopup] = useState(false);
  const [newImage, setNewImage] = useState(null); // Fixed state name

  const handlePopup = () => setShowPopup(!showPopup);

  const RemoveImage = () => {
    setImageUrl(img.default_img);
    setNewImage(null);
  };

  const { currency } = useSelector(selectShop);
  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    document.body.style.overflow = showPopup ? "hidden" : "auto";
  }, [showPopup]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = auth.currentUser;
        console.log(user);
        if (user) {
          const db = getFirestore();
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            setTimeout(() => {
              setUserDetail(userDocSnapshot.data());
              setLoading(false);
            }, 2000);
          } else {
            console.log("User document not found");
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
        setNewImage(reader.result); // Ensure new image state is updated
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
          ) : userDetail ? (
            <div>
         
              <div className="flex flex-row justify-around items-center">
              {/* Back button */}
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
                  <p className="text-xl font-semibold">{userDetail.name}</p>
                  <p className="text-gray-500">{userDetail.email}</p>
                  <p className="text-gray-500">{userDetail.phone || "N/A"}</p>
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
            <p className="text-red-500">User details not found.</p>
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

            {/* Display Profile Image */}
            <img
              src={imageUrl}
              alt="Profile"
              className="w-24 h-24 mx-auto rounded-full border-4 border-blue-400 shadow-md mb-4"
            />

            {/* Show Remove Button Only When New Image is Uploaded */}

            {/* if new image then dont show file input */}
            {
              !newImage && (
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="mb-4 block w-full text-gray-600 text-sm border p-2 rounded-lg shadow-sm "
                />
              )
            }
          

          

            {/* Save Button */}
            <button
              onClick={handlePopup}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
            >
              Save Changes
            </button>


            {newImage && (
              <button
                onClick={RemoveImage}
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
