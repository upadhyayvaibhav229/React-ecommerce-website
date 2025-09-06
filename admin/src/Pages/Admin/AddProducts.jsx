import React from 'react'
import { assets } from '../../assets/admin_assets/assets'

const AddProducts = () => {
  return (
    <>
      <form className="flex flex-col w-full items-start gap-3 p-5">
        <div>
          <p className="mb-2">Upload Image</p>
          <div className="flex gap-2 mb-2">
            <label htmlFor="image1" className='cursor-pointer'>
              <img src={assets.upload_area} className='w-20' alt="image1" />
              <input type="file" id='image1' hidden />
            </label>
            <label htmlFor="image2" className='cursor-pointer'>
              <img src={assets.upload_area} className='w-20' alt="image2" />
              <input type="file" id='image2' hidden />
            </label>
            <label htmlFor="image3" className='cursor-pointer'>
              <img src={assets.upload_area} className='w-20' alt="image3" />
              <input type="file" id='image3' hidden />
            </label>
            <label htmlFor="image4" className='cursor-pointer'>
              <img src={assets.upload_area} className='w-20' alt="image4" />
              <input type="file" id='image4' hidden />
            </label>
          </div>


        </div>
        <div className="w-full">
          <p className='mb-2'>Product name</p>
          <input
            className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-[#c586a5]"
            type="text"
            placeholder="Type here"
            required
          />
        </div>
        <div className="w-full">
          <p className='mb-2'>Product name</p>
          <textarea className='w-full max-w-[500px] px-3 py-2 border-2 border-gray-300 rounded-md outline-none focus:border-[#c586a5]' placeholder='Write Content here' required />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div>
            <p className='mb-2'>Product Category</p>
            <select className='w-full px-3 py-2 border-2 border-gray-300 rounded-md outline-none focus:border-[#c586a5]'>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <p className="mb-2">Sub category</p>
            <select className="w-full px-3 py-2 border-2 border-gray-300 rounded-md outline-none focus:border-[#c586a5]">
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <p>Product Price</p>
            <input class="w-full px-3 py-2 sm:w-[120px]  border-2 border-gray-300 rounded-md outline-none focus:border-[#c586a5]" type="Number" placeholder="25" value=""></input>
          </div>
        </div>

        <div>
          <p className='mb-2'>Product Sizes</p>
          <div className="flex gap-3">
            <div>
              <p className="bg-slate-200 px-3 py-1 cursor-pointer ">
                S
              </p>
            </div>

            <div>
              <p className="bg-slate-200 px-3 py-1 cursor-pointer ">
                M
              </p>
            </div>
            <div>
              <p className="bg-slate-200 px-3 py-1 cursor-pointer ">
                L
              </p>
            </div>
            <div>
              <p className="bg-slate-200 px-3 py-1 cursor-pointer ">
                XL
              </p>
            </div>
            <div>
              <p className="bg-slate-200 px-3 py-1 cursor-pointer ">
                XXL
              </p>
            </div>
          </div>

        </div>

        <div className='flex gap-2 mt-2'>
          <input type="checkbox"  id="bestseller" />
          <label htmlFor="bestseller" className=' cursor-pointer'>
            Add to bestseller
          </label>
        </div>

        <button type="submit" className='w-28 py-3 mt-4 bg-black text-white hover:bg-white hover:text-black hover:border-2 hover:border-black rounded cursor-pointer'>ADD</button>
      </form>
    </>
  )
}

export default AddProducts
