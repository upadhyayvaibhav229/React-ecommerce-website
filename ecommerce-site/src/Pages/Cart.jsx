import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectShop } from "../Features/shopSlice";
// import Header from "../Header";
import Title from "../Components/Title";
import { removeFromCart, updateQuantity } from "../Features/cartSlice";
import CartTotal from "../Components/CartTotal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { currency } = useSelector(selectShop);
  const dispatch = useDispatch();


  const checkout = () =>{
    console.log();
    if (cart.cart.length === 0) {
      toast.error("No item is added to checkout")
    }else{
      navigate('/place-order')
    }
  }
  const handleRemoveItem = (id, selectedSize) => {
    
    dispatch(removeFromCart({ id, selectedSize }));
    // console.log(cart);

  };

  const handleQuantityChange = (id, selectedSize, action) => {
    dispatch(updateQuantity({ id, selectedSize, quantity: action }));
    console.log(cart);
  }
  return (
    <>

      <div className="border-l mt-14 sm:ml-5 sm:p-4 p-1">
        <div className="text-3xl mb-4">
          <Title text1={"Your"} text2={"Cart"} />
        </div>

        <div className="flex flex-col gap-4 text-xl">
          {cart.cart?.length > 0 ? (
            cart.cart.map((item, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg shadow-md flex justify-between items-center sm:p-4 p-1 hover:shadow-lg transition duration-300"
              >
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.title} className="sm:h-24 sm:w-24 h-20 w-20 object-cover rounded-md" />
                  <div>
                    <h2 className="font-bold sm:text-lg text-base text-wrap">{item.title}</h2>
                    <div className="flex items-center gap-2 text-md mt-1">
                      <span className="font-semibold text-base text-gray-700">
                        {currency} {item.price}
                      </span>
                      <span className="border text-base border-gray-300 sm:px-2 sm:py-1 px-1 rounded-md">
                        {item.selectedSize}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity - 1)}
                    className="sm:px-3 sm:py-1 px-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity + 1)}
                    className="sm:px-3 sm:py-1 px-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleRemoveItem(item.id, item.selectedSize)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition hidden md:block"
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

      <div className="flex justify-end sm:my-20 ml-5">
        <div className="w-ful sm:w-[450px] w-full">

          <CartTotal />
          <div className="w-full flex items-center justify-center">
            <button
              onClick={checkout}
              className=" bg-black text-white font-medium mt-6 px-8 py-3 rounded hover:bg-gray-800 transition duration-300"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>

    </>


  );
};

export default Cart;
