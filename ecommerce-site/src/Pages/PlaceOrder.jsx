import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../Components/Title";
import Input from "../Components/Input";
import CartTotal from "../Components/CartTotal";
import { img } from "../Components/img";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-10 lg:px-16">
      {/* Back to Cart Button */}
      <button
        onClick={() => navigate("/cart")}
        className="bg-green-800 text-white py-2 px-4 rounded-full hover:bg-green-700 transition-all"
      >
        ← Back to Cart
      </button>

      <div className="flex flex-col lg:flex-row justify-between gap-8 mt-6">
        {/* Left Side - Delivery Information */}
        <div className="w-full lg:max-w-[800px] bg-white p-6 sm:p-8 rounded-lg shadow-lg border">
          <div className="mb-6 text-center">
            <Title text1="DELIVERY" text2="INFORMATION" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input placeholder="First Name" type="text" />
            <Input placeholder="Last Name" type="text" />
          </div>

          <div className="space-y-4 mt-4">
            <Input placeholder="Email Address" type="email" />
            <Input placeholder="Street Address" type="text" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input placeholder="City" type="text" />
              <Input placeholder="State" type="text" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input placeholder="Zip Code" type="number" />
              <Input placeholder="Country" type="text" />
            </div>

            <Input placeholder="Phone Number" type="tel" />
          </div>
        </div>

        {/* Right Side - Cart Total & Payment */}
        <div className="w-full lg:max-w-[400px]">
          <div className="min-w-full mt-5">
            <CartTotal />
          </div>

          <div className="mt-12 bg-white p-6 sm:p-8 rounded-lg shadow-lg border">
            <Title text1={"PAYMENT"} text2={"METHOD"} />

            <div className="flex flex-col gap-4 mt-4">
              {/* Stripe Payment Option */}
              <div
                onClick={() => setMethod("stripe")}
                className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer transition-all ${
                  method === "stripe" ? "bg-gray-100 border-green-600" : "hover:bg-gray-50"
                }`}
              >
                <p
                  className={`w-4 h-4 border rounded-full ${
                    method === "stripe" ? "bg-green-600" : ""
                  }`}
                ></p>
                <img src={img.stripe_logo} alt="Stripe" className="h-5 mx-4" />
              </div>

              {/* Razorpay Payment Option */}
              <div
                onClick={() => setMethod("razorpay")}
                className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer transition-all ${
                  method === "razorpay" ? "bg-gray-100 border-green-600" : "hover:bg-gray-50"
                }`}
              >
                <p
                  className={`w-4 h-4 border rounded-full ${
                    method === "razorpay" ? "bg-green-600" : ""
                  }`}
                ></p>
                <img src={img.razorpay_logo} alt="Razorpay" className="h-5 mx-4" />
              </div>

              {/* Cash on Delivery (COD) Option */}
              <div
                onClick={() => setMethod("cod")}
                className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer transition-all ${
                  method === "cod" ? "bg-gray-100 border-green-600" : "hover:bg-gray-50"
                }`}
              >
                <p
                  className={`w-4 h-4 border rounded-full ${
                    method === "cod" ? "bg-green-600" : ""
                  }`}
                ></p>
                <p className="text-gray-700 text-sm font-medium mx-4">CASH ON DELIVERY</p>
              </div>
            </div>

            {/* Buttons: Back to Cart & Place Order */}
            <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
              {/* Place Order Button */}
              <button
                onClick={() => navigate("/order")}
                className="bg-black text-white px-6 py-3 rounded-lg w-full sm:w-auto hover:bg-gray-900 transition-all"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
