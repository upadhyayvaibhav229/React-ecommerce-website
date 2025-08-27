import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectShop } from "../Features/shopSlice";
import { addToCart } from "../Features/cartSlice";
import { img } from "../Components/img";
import Relatedproducts from "../Components/Relatedproducts";
// import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase authentication

const Products = () => {
  const { id } = useParams();
  const { products, currency } = useSelector(selectShop);
  const cart = useSelector((state) => state.cart.cart);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [sizes, setSizes] = useState("");
  const [user, setUser] = useState(null); // Store user authentication status

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const auth = getAuth();

  // Check user authentication status
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });

  //   return () => unsubscribe();
  // }, []);

  // useEffect(() => {
  //   console.log(cart);
  // }, [cart]);

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
    if (!user) {
      alert("Please log in to add items to the cart!");
      navigate("/login"); 
      return;
    }

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
    <div className="border-t-2 pt-10 transition-opacity duration-500 opacity-100 p-2 font-serif">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full space-y-5">
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

        {/* Product info */}
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-medium">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={img.star_icon} alt="" className="w-3.5" />
            ))}
            <img src={img.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
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
              className={`py-2 px-4 ${
                user
                  ? "bg-black text-white active:bg-gray-500"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!user}
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

      <hr className="mt-5" />

      {/* Related Products */}
      <Relatedproducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Products;
