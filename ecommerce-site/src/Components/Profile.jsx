import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { auth } from "../Config/firebaseConfig";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { selectShop } from "../Features/shopSlice"; // Importing shop selector
import { img } from "./img"; // Import the default image

const Profile = () => {
  const [userDetail, setUserDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(img.default_img); // Default image

  // Redux state to access selected currency & cart items
  const { currency } = useSelector(selectShop);
  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const db = getFirestore();
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            setTimeout(() => {
              setUserDetail(userDocSnapshot.data());
              setLoading(false);
            }, 3000); // 3 seconds loading before showing data
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

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result); // Update state with selected image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-[500px] shadow-lg rounded-lg p-6 text-center">
        {loading ? (
          <>
            <div className="animate-spin h-5 w-5 border-b-2 border-blue-500 rounded-full"></div>
            <span>Loading...</span>
          </>
        ) : userDetail ? (
          <div>
            <div className="flex flex-col items-center justify-center">
              {/* Profile Image */}
              <img
                src={imageUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full border"
              />
              <input
                type="file"
                onChange={handleImageChange}
                className="ml-4 mt-2"
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Profile
            </h2>
            <div className="space-y-3 text-gray-700 text-left">
              <p>
                <span className="font-medium">Name:</span> {userDetail.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {userDetail.email}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {userDetail.phone || "N/A"}
              </p>
            </div>

            {/* Display Cart Items */}
            <div className="mt-6 text-left">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Selected Items:
              </h3>
              {cart.length > 0 ? (
                <ul className="space-y-2 text-gray-700">
                  {cart.map((item, index) => (
                    <li key={index} className="p-2 bg-gray-100 rounded-md">
                      <p>
                        <span className="font-medium">Product:</span>{" "}
                        {item.title}
                      </p>
                      <p>
                        <span className="font-medium">Price:</span> {currency}{" "}
                        {item.price}
                      </p>
                      <p>
                        <span className="font-medium">Quantity:</span>{" "}
                        {item.quantity}
                      </p>
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
  );
};

export default Profile;
