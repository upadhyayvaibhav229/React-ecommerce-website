import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectShop } from "../Features/shopSlice";
import Header from "../Header";
import Title from "../Components/Title";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { products, currency } = useSelector(selectShop);

  const [cartData, setCartData] = useState([]);

console.log(cart);


  return (
    <>
      <div className="border-l pl-14">
      <div className="mt-11">

       <Title text1={"Your"} text2={"Cart"}/>
      </div>
        {
          cart.cart?.map((el,id)=>(
            <div key={id}>
              <p>{el.title}</p>
              <p>{el.price}</p>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default Cart;
