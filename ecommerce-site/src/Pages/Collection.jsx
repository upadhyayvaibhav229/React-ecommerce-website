import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectShop } from '../Features/shopSlice'

const Collection = () => {
  const {products} = useSelector(selectShop)
  const [showfilter, setShowFilter] = useState(false)
  return (
    <>
      <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t-2'>
        {/* filter Option */}
        <div className='min-w-60'>
            <p className='text-2xl'>Filter Option</p>
        </div>

          <p className="border border-gray-300 pl-5 py-3 gap-2">FILTERS</p>

            {/* Category filter */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter ? "" : "hidden"}`}></div>

          
      </div>
    </>
  )
}

export default Collection
