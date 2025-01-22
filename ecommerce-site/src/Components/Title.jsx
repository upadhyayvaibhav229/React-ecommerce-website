import React from 'react'

const Title = ({text1, text2}) => {
  return (
    <>
      <div className='inline-flex gap-2 items-center mb-3 text-4xl'>
        <p className=''>{text1} <span className= 'text-gray-700 font-medium'>{text2}</span> </p>
        <p className="w-9 sm:w-12 h-[3px] bg-gray-700 mt-2"></p>
      </div>
    </>
  )
}

export default Title
