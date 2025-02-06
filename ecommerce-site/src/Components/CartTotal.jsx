import React from "react";
import Title from "./Title";
import { useSelector } from "react-redux";
import { selectShop } from "../Features/shopSlice";
import { useNavigate } from "react-router-dom";

const CartTotal = () => {
  const cart = useSelector((state) => state.cart);
  const { currency } = useSelector(selectShop);
  const navigate = useNavigate();

  return (
    <div className="mt-11 w-full  flex flex-col items-end">
      <div className="w-full bg-white p-6">
        <div className="flex justify-between items-center mb-4">
          <Title text1="CART" text2="TOTAL" />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-600">Subtotal:</span>
            <span className="font-bold text-lg">
              {currency} {cart.totalprice}
            </span>
          </div>
          <hr />

          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-600">Shipping Price:</span>
            <span className="font-bold text-lg">
              {currency} {cart.totalprice + 10}
            </span>
          </div>
          <hr />

          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-600">Total:</span>
            <span className="font-bold text-xl text-green-600">
              {currency} {cart.totalprice + 10}
            </span>
          </div>
        </div>

     
      </div>
    </div>
  );
};

export default CartTotal;
