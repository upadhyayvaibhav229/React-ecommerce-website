import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectShop } from '../Features/shopSlice'
import { img } from '../Components/img'
import Title from '../Components/Title'
import Product_item from '../Components/Product_items'

const Collection = () => {
  const {products} = useSelector(selectShop)
  const [showfilter, setShowFilter] = useState(true)
  const [filterProducts, setFilterProducts] = useState([])
  const [Category, setCategory] = useState([])

  const [subCategory, setSubCategory] = useState([])

  const toggleCategory = (e) => {
    if (Category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      setFilterProducts(products);
    }
  }, [products]);

  const applyFilter = () => {
    let productCpy = products.slice();

    if (Category.length > 0) {
      productCpy = productCpy.filter(item => Category.includes(item.Category));
    }

    if (subCategory.length > 0) {
      productCpy = productCpy.filter(item => subCategory.includes(item.SubCategory));
    }

    setFilterProducts(productCpy);
  };

  useEffect(() => {
    applyFilter();
  }, [Category, subCategory]);

  return (
    <>
      <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t-2'>
        {/* filter Option */}
        <div className='min-w-60'>
            <p className='text-2xl'>Filter Option</p>

          <p onClick={()=>setShowFilter(!showfilter)} className="border flex justify-between border-gray-300 pl-5 py-3 gap-2 mt-2">FILTERS
            <img src={img.dropdown_icon} className={`h-4 mt-1 mr-2 sm:hidden ${showfilter ? 'rotate-90' : ""  } `} alt="" />
          </p>

            {/* Category filter */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter ? "" : "hidden"} sm:block`}>
            <p className='mb-3 text-sm font-medium'>Categories</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input type="checkbox" className='w-3' value="Men" onChange={toggleCategory}/> MEN
              </p>
              <p className="flex gap-2">
                <input type="checkbox" className='w-3' value="Women" onChange={toggleCategory}/> Women
              </p>
              <p className="flex gap-2">
                <input type="checkbox" className='w-3' value="Kids" onChange={toggleCategory}/> Kids
              </p>  
            </div>
          </div>

          {/* Sub Category */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter ? "" : "hidden"} sm:block`}>
            <p className='my-3 text-sm font-medium'>TYPE</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input type="checkbox" className='w-3' value="Topwear" onChange={toggleSubCategory}/> Topwear
              </p>
              <p className="flex gap-2">
                <input type="checkbox" className='w-3' value="Bottomwear" onChange={toggleSubCategory}/> BottomWear
              </p>
              <p className="flex gap-2">
                <input type="checkbox" className='w-3' value="Winterwear" onChange={toggleSubCategory}/> Winterwear
              </p>  
            </div>
          </div>
        </div>
        {/* right side */}
        <div className='flex-1 ml-3'>

        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"}/>

          {/* Product sort */}

          <select  className="border-gray-100 border-2 text-sm py-2">
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
      {/* Products */}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, i)=>(
            <Product_item key={i} id={item._id} img={item.image} name={item.name} price={item.price}/>
          ))}
      </div>
        </div>



          
      </div>
    </>
  )
}

export default Collection
