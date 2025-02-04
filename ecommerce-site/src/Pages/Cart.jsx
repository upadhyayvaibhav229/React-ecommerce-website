import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectShop } from "../Features/shopSlice";
import Header from "../Header";
import Title from "../Components/Title";
import { removeFromCart, updateQuantity } from "../Features/cartSlice";
import CartTotal from "../Components/CartTotal";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { currency } = useSelector(selectShop);
  const dispatch = useDispatch();

 
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
    console.log(cart);
    
  };

  const handleQuantityChange = (id, action) => {
    dispatch(updateQuantity({ id, quantity: action }));
    console.log(cart);
  }
  return (
    <>

    <div className="border-l mt-14 ml-5 p-4">
      <div className="text-3xl mb-4">
        <Title text1={"Your"} text2={"Cart"} />
      </div>

      <div className="flex flex-col gap-4">
        {cart.cart?.length > 0 ? (
          cart.cart.map((item, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg shadow-md flex justify-between items-center p-4 hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.title} className="h-24 w-24 object-cover rounded-md" />
                <div>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <div className="flex items-center gap-2 text-md mt-1">
                    <span className="font-semibold text-gray-700">
                      {currency} {item.price}
                    </span>
                    <span className="border border-gray-300 px-2 py-1 rounded-md">
                      {item.selectedSize}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                >
                  -
                </button>
                <span className="text-lg font-medium">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleRemoveItem(item.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-2xl">Your cart is empty.</p>
        )}
      </div>
    </div>

    <CartTotal/>
    </>


  );
};

export default Cart;
