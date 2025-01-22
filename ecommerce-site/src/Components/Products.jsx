import React from 'react'
import { useSelector } from 'react-redux'
import { selectShop } from '../Features/shopSlice'
import {Link} from 'react-router-dom'

const Products = ({id, img, name, price}) => {

    const {currency} = useSelector(selectShop)
    console.log(currency);
    
    
  return (
    <>
    <Link to={`/product/${id}`}  className='cusor-pointer text-gray-700'/>
    <div className='overflow-hidden'>
      <img className='hover:scale-100 transition ease-in-out' src={img[0]} alt="" />
    </div>
    <p className='pt-3'>{name}</p>
    <p className='pt-3'>{currency}</p>
    </>
  )
}

export default Products
