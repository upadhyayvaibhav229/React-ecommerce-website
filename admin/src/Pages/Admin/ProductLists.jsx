import React from 'react'

const ProductLists = () => {
  return (
    <>
      <p className='mb-2'>All Products</p>
      <div className='flex flex-col gap-3 mb-2'>
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] bg-slate-200 px-2 py-3">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>
        <div className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm">
          <img src="img" className='w-12' alt="img" />
          <p>Kids Tappered Slim Fit Trousers</p>
          <p>Kids</p>
          <p>38₹</p>
          <p className="text-right md:text-center cursor-pointer text-lg">X</p>
        </div>
        <div className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm">
          <img src="img" className='w-12' alt="img" />
          <p>Kids Tappered Slim Fit Trousers</p>
          <p>Kids</p>
          <p>38₹</p>
          <p className="text-right md:text-center cursor-pointer text-lg">X</p>
        </div>
        <div className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm">
          <img src="img" className='w-12' alt="img" />
          <p>Kids Tappered Slim Fit Trousers</p>
          <p>Kids</p>
          <p>38₹</p>
          <p className="text-right md:text-center cursor-pointer text-lg">X</p>
        </div>
        <div className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm">
          <img src="img" className='w-12' alt="img" />
          <p>Kids Tappered Slim Fit Trousers</p>
          <p>Kids</p>
          <p>38₹</p>
          <p className="text-right md:text-center cursor-pointer text-lg">X</p>
        </div>
        <div className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm">
          <img src="img" className='w-12' alt="img" />
          <p>Kids Tappered Slim Fit Trousers</p>
          <p>Kids</p>
          <p>38₹</p>
          <p className="text-right md:text-center cursor-pointer text-lg">X</p>
        </div>

      </div>
    </>
  )
}

export default ProductLists
