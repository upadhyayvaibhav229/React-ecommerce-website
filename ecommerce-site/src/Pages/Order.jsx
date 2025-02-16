import React from 'react';
import { useSelector } from 'react-redux';
import { selectShop } from '../Features/shopSlice';
import Title from '../Components/Title';

const Order = () => {
  const { products, currency } = useSelector(selectShop);

  return (
    <div className='border-t pt-8 px-4 sm:px-6 lg:px-8'>
      <div className='text-2xl text-center mb-6'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div className='space-y-6'>
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className='p-4 border border-gray-300 rounded-lg shadow-md flex flex-col sm:flex-row md:items-center md:justify-between gap-4 bg-white'
          >
            <div className='flex flex-col sm:flex-row items-start gap-4 text-sm w-full'>
              <img className='w-20 h-20 object-cover rounded-md' src={item.image[0]} alt={item.name} />
              <div className='flex-1'>
                <p className='sm:text-base font-medium'>{item.name}</p>
                <div className='flex flex-wrap items-center gap-3 mt-2 text-gray-600'>
                  <p className='text-lg font-semibold'>{currency}{item.price}</p>
                  <p className='text-sm'>Quantity: 1</p>
                  <p className='text-sm'>Size: {item.size || 'M'}</p>
                </div>
                <p className='mt-2 text-gray-500 text-sm'>Date: <span className='text-gray-400'>Sun Feb 09 2025</span></p>
                <p className='mt-1 text-gray-500 text-sm'>Payment: <span className='text-gray-400'>COD</span></p>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row sm:items-center justify-between w-full md:w-auto gap-4'>
              <div className='flex items-center gap-2'>
                <span className='w-3 h-3 rounded-full bg-green-500'></span>
                <p className='text-sm md:text-base'>Order Placed</p>
              </div>
              <button className='border px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 transition'>
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;