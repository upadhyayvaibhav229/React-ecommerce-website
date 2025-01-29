import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product_item from "../Components/Product_items";
import { img } from "../Components/img";
import { useDispatch, useSelector } from "react-redux";
import { selectShop } from "../Features/shopSlice";
import Relatedproducts from "../Components/Relatedproducts";

const Products = () => {
  const { id } = useParams(); // Only import once
  const { products, currency, } = useSelector(selectShop);
  const [productData, setProductData] = useState(null); // Initialize with null
  const [image, setImage] = useState("");
  const [sizes, setSizes] = useState("");

  const dispatch = useDispatch();

  

  const fetchProductData = () => {
    const foundProduct = products.find((item) => item._id === id); // Use find instead of map
    if (foundProduct) {
      setProductData(foundProduct);

      setImage(foundProduct.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
    window.scrollTo({ top: 0, behavior: "smooth" }); // ✅ Scroll to top smoothly
  }, [id, products]); // Depend on id and products
  
  useEffect(() => {
    fetchProductData();
    console.log(productData);
  }, [id, products]); // Depend on id and products

  // Conditional rendering: Show loading or fallback UI
  if (!productData) {
    return <div>Loading...</div>;
  }

  
  return (
    <div className="border-t-2 pt-10 transition-opacity duration-500 opacity-100 p-2">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row ">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full space-y-5">
            {productData.image.map((item, i) => (
              <img
                key={i}
                onClick={() => setImage(item)}
                src={item}
                className="w-[28%] h-auto  sm:w-full flex-shrink-0 cursor-pointer"
                alt={productData.name}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              src={image}
              alt={productData.name}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        {/* Product info */}
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-medium">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={img.star_icon} alt="" className="w-3.5" />
            <img src={img.star_icon} alt="" className="w-3.5" />
            <img src={img.star_icon} alt="" className="w-3.5" />
            <img src={img.star_icon} alt="" className="w-3.5" />
            <img src={img.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="text-2xl font-semibold mt-5">
            {currency} {productData.price}
          </p>
          <p className="text-gray-500 md:w-4/5">{productData.description}</p>

          <div className="flex  flex-col gap-4 my-8">
            <h1 className="font-semibold text-xl">Select Size</h1>
            <div className="flex gap-2">
              {productData.sizes &&
                productData.sizes.map((item, i) => (
                  <button
                    onClick={() => setSizes(item)}
                    className={`border py-2 px-4 bg-gray-100 ${
                      sizes === item ? "border-orange-500" : ""
                    }`}
                    key={i}
                  >
                    {item}
                  </button>
                ))}
            </div>

          </div>
          {products.includes(productData._id) ? (
            <button className="bg-gray-500 text-white py-2 px-4">ADDED</button>
          ) : (
            <button
              onClick={() => dispatch(addToCart(productData))}
              className="bg-black text-white py-2 px-4 active:bg-gray-500"
            >
              ADD TO CART
            </button>
          )}
          <hr className="mt-8 sm:w-4/5 w-full bg-gray-700" />
        <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">

                <p>100% Original product.</p>
                <p>Free Delivery within 3-5 days.</p>
                <p>Easy 15 days returns and exchanges.</p>
        </div>
        </div>


      </div>
      <hr  className="mt-5"/>
        {/* review */}

        <div className="my-20 p-2">
        <div className="flex ">
          <p  className="border text-gray-500 px-5 py-3 font-bold">Description</p>
          <p  className="border text-gray-500 px-5 py-3 font-bold">Reviews</p>
          
        </div>
        <div className="flex flex-col border gap-4 px-5 py-6 text-sm text-gray-500 lg:w-3/4 md:w-1/2 sm:w-1/2">
         <p className="text-gray-500 font-serif">An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
         <p className="text-gray-500 font-serif">E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
        </div>
        {/* display realated product */}

        <Relatedproducts  category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
};

export default Products;
