import React, { useEffect, useState } from "react";
import { selectShop } from "../Features/shopSlice";
import { useSelector } from "react-redux";
import Title from "./Title";
import Product_item from "./Product_items";

const BestSeller = () => {
    const { products } = useSelector(selectShop);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        if (products?.length) {
            const bestProduct = products.filter((item) => item.bestseller);
            setBestSeller(bestProduct.slice(0, 5));
            console.log("bestProduct", bestProduct);
        }
    }, [products]);

    return (
        <div className="my-10">
            <div className="text-center text-3xl py-8">
                <Title text1={"Best"} text2={"Seller"} />
                <p className="m-auto w-3/4 text-base">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nihil dicta at delectus
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-4 p-5">
                {bestSeller.map((item, i) => (
                    <Product_item key={i} id={item._id} img={item.image} name={item.name} price={item.price} />
                ))}
            </div>
        </div>
    );
};

export default BestSeller;
