import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Title from './Title';
import Products from './Products';
import { selectShop } from '../Features/shopSlice';

const Latest_Collection = () => {
  const {products, currency, deliveryFee} = useSelector((selectShop))
  const [latestProduct, setLatestProduct] = useState([])

  useEffect(()=>{
    setLatestProduct(products.slice(0,10))
  },[])
  // console.log(products);
  
  return (
    <div className = "my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"Latest"} text2={"Collection"} />
        <p className='m-auto w-3/4 text-base '>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nihil dicta at delectus delectus 
        </p>
      </div>
      <Products/>
    </div>
  )
}

export default Latest_Collection
