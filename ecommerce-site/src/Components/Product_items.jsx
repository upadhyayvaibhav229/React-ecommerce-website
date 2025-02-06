import React from "react";
import { useSelector } from "react-redux";
import { selectShop } from "../Features/shopSlice";
import { Link } from "react-router-dom";

const Product_item = ({ id, img, name, price }) => {
    const { currency } = useSelector(selectShop);

    return (
        <Link to={`/product/${id}`} className="cursor-pointer text-gray-700">
            <div className="overflow-hidden text-md">
                <img className="hover:scale-110 transition ease-in-out lg:w-full lg:h-auto  w-48" src={img[0]} alt={name} />
            </div>
            <p className="pt-3">{name}</p>
            <p className="pt-3 font-bold">
                Price {currency}
                {price}
            </p>
        </Link>
    );
};

export default Product_item;
