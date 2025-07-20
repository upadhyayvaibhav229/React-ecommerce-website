import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../Components/Title";
import Input from "../Components/Input";
import CartTotal from "../Components/CartTotal";
import { img } from "../Components/img";
import { useDispatch } from "react-redux";
import { placeOrder } from "../Features/cartSlice";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePaymentChange = (selectedMethod) => {
    setMethod(selectedMethod);
    // dispatch(setMethod(selectedMethod)); // Uncomment if needed
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) return;
    dispatch(placeOrder());
    toast.success("Order Placed Successfully")
    navigate("/order");
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-10 lg:px-16">
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
            <Input
              placeholder="First Name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />
            <Input
              placeholder="Last Name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />
          </div>

          <div className="space-y-4 mt-4">
            <Input
              placeholder="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <Input
              placeholder="Street Address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder="City"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                error={errors.city}
              />
              <Input
                placeholder="State"
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                error={errors.state}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder="Zip Code"
                type="number"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                error={errors.zip}
              />
              <Input
                placeholder="Country"
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                error={errors.country}
              />
            </div>

            <Input
              placeholder="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            />
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
                onClick={() => handlePaymentChange("stripe")}
                className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer transition-all ${
                  method === "stripe"
                    ? "bg-gray-100 border-green-600"
                    : "hover:bg-gray-50"
                }`}
              >
                <p
                  className={`w-4 h-4 border rounded-full ${
                    method === "stripe" ? "bg-green-600" : ""
                  }`}
                ></p>
                <img
                  src={img.stripe_logo}
                  alt="Stripe"
                  className="h-5 mx-4"
                />
              </div>

              {/* Razorpay Payment Option */}
              <div
                onClick={() => handlePaymentChange("razorpay")}
                className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer transition-all ${
                  method === "razorpay"
                    ? "bg-gray-100 border-green-600"
                    : "hover:bg-gray-50"
                }`}
              >
                <p
                  className={`w-4 h-4 border rounded-full ${
                    method === "razorpay" ? "bg-green-600" : ""
                  }`}
                ></p>
                <img
                  src={img.razorpay_logo}
                  alt="Razorpay"
                  className="h-5 mx-4"
                />
              </div>

              {/* Cash on Delivery (COD) Option */}
              <div
                onClick={() => handlePaymentChange("cod")}
                className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer transition-all ${
                  method === "cod"
                    ? "bg-gray-100 border-green-600"
                    : "hover:bg-gray-50"
                }`}
              >
                <p
                  className={`w-4 h-4 border rounded-full ${
                    method === "cod" ? "bg-green-600" : ""
                  }`}
                ></p>
                <p className="text-gray-700 text-sm font-medium mx-4">
                  CASH ON DELIVERY
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
              <button
                onClick={handlePlaceOrder}
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
