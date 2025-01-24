import React from 'react'
import { useSelector } from 'react-redux'
import { selectShop } from '../Features/shopSlice'

const Collection = () => {
  const {products} = useSelector(selectShop)
  return (
    <>
      <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t-2'>
        {/* filter Option */}
        <div className='min-w-60'>
            <p className='text-2xl'>Filter Option</p>
        </div>
      </div>
    </>
  )
}

export default Collection
