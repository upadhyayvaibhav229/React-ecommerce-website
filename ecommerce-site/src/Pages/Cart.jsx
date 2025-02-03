import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectShop } from '../Features/shopSlice'
import Header from '../Header'

const Cart = () => {
    const cart = useSelector((state) => state.cart)
    const {products, currency} = useSelector(selectShop)

    const [cartData, setCartData] = useState([]);

    useEffect(()=>{
        const tempdata = []
        for(const items in cart.cart){
            for (const item in cart.cart[items]) {
                if (cart.cart[items][item].id === item) {
                    tempdata.push({
                    _id: items,
                    title:items,
                    })
                }
            }
            
        }
           
        console.log(tempdata);
    }, [cart.cart, products])


  return (
    <>
    
    <div>
      <p>Cart</p>
    </div>
    </>
  )
}

export default Cart
