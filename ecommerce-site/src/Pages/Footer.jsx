import React from 'react'
import { img } from '../Components/img'

const Footer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 md:place-items-center place-items-start p-2 absolute">
      <div className="p-2">
        <img className='w-32 ' src={img.logo} alt="" />
        <p className='md:text-xl text-md text-gray-600 mt-2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
      </div>
      <div className="space-y-2">
        <h1 className='font-bold text-xl'>Company</h1>
        <ul className='text-gray-600'>
          <li>Home</li>
          <li>Collection</li>
          <li>Delivery</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div className="space-y-4">
        <h1 className='text-xl font-bold'>GET IN TOUCH</h1>
        <ul className='text-gray-600'>
          <li>+1-000-000-0000</li>
          <li>greatstackdev@gmail.com</li>
          <li>Instagram</li>
        </ul>
      </div>
    </div>
  )
}

export default Footer

