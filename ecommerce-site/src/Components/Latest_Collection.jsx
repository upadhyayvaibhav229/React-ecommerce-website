import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Title from './Title';
// import Products from '../Pages/Products';
// Products
import { selectShop } from '../Features/shopSlice';
import Product_item from './Product_items';
// import Products from '../Pages/Products';

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
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-4 p-5'>
      {latestProduct.map((item, i)=> (
        <Product_item key={i} id={item._id} img={item.image} name={item.name} price={item.price}/>
      ))}

      </div>
    </div>
  )
}

export default Latest_Collection
