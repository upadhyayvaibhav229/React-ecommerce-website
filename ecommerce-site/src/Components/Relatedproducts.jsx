import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectShop } from "../Features/shopSlice";
import Product_item from "./Product_items";
import Title from "./Title";

const Relatedproducts = ({ category, subCategory }) => {
  const { products } = useSelector(selectShop);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products?.length) {
      const filteredProducts = products.filter(
        (item) => item.category === category && item.subCategory === subCategory
      );
      setRelated(filteredProducts.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <>
      {/* display related product */}
      <div className="my-24">
        <div className="text-center py-8 text-3xl">
          <Title text1={"Related"} text2={"Products"} />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {related.length > 0 ? (
          related.map((item,i) => (
            <Product_item
              key={i} 
              id={item._id}
              img={item.image}
              name={item.name}
            price={item.price}
          />
        ))
      ) : (
        <p className="text-gray-500 text-center">No related products found.</p>
      )}
      </div>
    </>
  );
};

export default Relatedproducts;
