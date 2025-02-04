import React from "react";
import Title from "./Title";
import { useSelector } from "react-redux";
import { selectShop } from "../Features/shopSlice";

const CartTotal = () => {
  const cart = useSelector((state) => state.cart);
  const { currency } = useSelector(selectShop);
  return (
    <>
      <div className="mt-11 w-full  flex flex-col items-end ">
        <div className="w-1/3 mb-4">
          <div className="flex justify-between items-center mr-10">
            <Title text1="CART" text2={"TOTAL"} />
          </div>
          <div className="flex justify-between items-center mr-10">
            <span className="font-bold text-lg">SubTotal:</span>
            <span className="font-bold text-lg">
              {currency} {cart.totalprice}
            </span>
          </div>
          <div className="flex justify-between items-center mr-10">
            <span className="font-bold text-lg">Shipping Price:</span>
            <span className="font-bold text-lg">
              {currency} {cart.totalprice + 10}
            </span>
          </div>
          <div className="flex justify-between items-center mr-10">
            <span className="font-bold text-lg">Total:</span>
            <span className="font-bold text-lg">
              {currency} {cart.totalprice + 10}
            </span>
          </div>
        </div>
        <button className="bg-black text-white mt-4 px-4 py-2 mr-5 rounded">
          PROCEED TO CHECKOUT
        </button>
      </div>
    </>
  );
};

export default CartTotal;
