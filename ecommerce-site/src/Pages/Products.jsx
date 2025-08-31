import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectShop } from "../Features/shopSlice";
import { addToCart } from "../Features/cartSlice";
import { img } from "../Components/img";
import Relatedproducts from "../Components/Relatedproducts";
import { toast } from "react-toastify";

const Products = () => {
  const { id } = useParams();
  const { products, currency } = useSelector(selectShop);
  const cart = useSelector((state) => state.cart.cart);
  const { status } = useSelector((state) => state.auth); // ✅ logged in status
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [sizes, setSizes] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchProductData = () => {
    const foundProduct = products.find((item) => item._id === id);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    } else {
      setProductData(null);
    }
  };

  useEffect(() => {
    fetchProductData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, products]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    if (!status) {
      setShowPopup(true); // ✅ show popup if not logged in
      return;
    }    

    toast.success("Item Added To cart successfully");

    dispatch(
      addToCart({
        id: productData._id,
        title: productData.name,
        price: productData.price,
        image: productData.image[0],
        totalPrice: productData.price,
        selectedSize: sizes,
      })
    );
  };

  return (
    <div className="border-t-2 pt-10 p-2 font-serif relative">
      {/* ✅ POPUP MODAL */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[300px] text-center">
            <h2 className="text-lg font-semibold mb-3">Login Required</h2>
            <p className="text-gray-600 mb-4">
              Please login or register to add items to cart.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate("/login")}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
              >
                Register
              </button>
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 text-sm text-gray-500 underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* PRODUCT CONTENT */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Left images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll sm:w-[18.7%] w-full space-y-5">
            {productData.image.map((item, i) => (
              <img
                key={i}
                onClick={() => setImage(item)}
                src={item}
                className="w-[28%] h-auto sm:w-full flex-shrink-0 cursor-pointer"
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

        {/* Right product info */}
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-medium">{productData.name}</h1>
          <p className="text-2xl font-semibold mt-5">
            {currency} {productData.price}
          </p>
          <p className="text-gray-500 md:w-4/5">{productData.description}</p>

          <div className="flex flex-col gap-4 my-8">
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

          {cart.some(
            (item) => item.id === productData._id && item.selectedSize === sizes
          ) ? (
            <button className="bg-white border border-black text-black py-2 px-4">
              ADDED TO CART
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-700"
            >
              ADD TO CART
            </button>
          )}
        </div>
      </div>

      {/* Related Products */}
      <hr className="mt-5" />
      <Relatedproducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Products;
