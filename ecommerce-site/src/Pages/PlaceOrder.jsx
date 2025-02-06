import React from "react";
import Title from "../Components/Title";
import Input from "../Components/Input";
import CartTotal from "../Components/CartTotal";
import { img } from "../Components/img";

const PlaceOrder = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-8 pt-8 sm:pt-14 min-h-[80vh] px-6 sm:px-16">
      {/* Left Side - Delivery Information */}
      <div className="w-full sm:max-w-[500px] bg-white p-6 sm:p-8 rounded-lg shadow-lg border">
        <div className="mb-6">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input placeholder="First Name" type="text" />
          <Input placeholder="Last Name" type="text" />
        </div>

        <div className="space-y-4 mt-4">
          <Input placeholder="Email Address" type="email" />
          <Input placeholder="Street" type="text" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input placeholder="City" type="text" />
            <Input placeholder="State" type="text" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input placeholder="Zip Code" type="number" />
            <Input placeholder="Country" type="text" />
          </div>

          <Input placeholder="Phone" type="number" />
        </div>
      </div>

      {/* Right Side - Cart Total */}
      <div className="mt-8">

        <div className="min-w-80 mt-5">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={'METHOD'} />

          <div className="flex gap-3 flex-col lg:flex-row">
            <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className="min-w-3.5 h-3.5 border rounded-full"></p>
              <img src={img.stripe_logo} alt="stripe_logo" className="h-5 mx-4" />
            </div>
            <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className="min-w-3.5 h-3.5 border rounded-full"></p>
              <img src={img.razorpay_logo} alt="stripe_logo" className="h-5 mx-4" />
            </div>
            <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className="min-w-3.5 h-3.5 border rounded-full"></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>         
               </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default PlaceOrder;
