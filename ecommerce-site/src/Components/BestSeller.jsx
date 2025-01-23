import React, { useEffect, useState } from 'react'
import { selectShop } from '../Features/shopSlice'
import { useSelector } from 'react-redux'
import Title from './Title'

const BestSeller = () => {
    const {products} = useSelector(selectShop)
    const [bestSeller, setBestSeller] = useState([])

    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestSeller));
        setBestSeller(bestProduct.slice(0,5))
    }, [])
  return (
    <div className='my-10'>
     <div className="text-center text-3xl py-8">
        <Title text1={"Best"} text2={"Seller"}/>
        <p className='m-auto w-3/4 text-base '>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nihil dicta at delectus delectus 
        </p>
     </div>
    </div>
  )
}

export default BestSeller
