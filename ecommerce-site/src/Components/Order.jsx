import React from 'react';
import { useSelector } from 'react-redux';
import { selectShop } from '../Features/shopSlice';

const Order = () => {
    const { products, currency } = useSelector(selectShop);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold border-b pb-2">MY ORDERS</h2>
            <div className="mt-4">
                {products.map((product, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border rounded-lg mb-4">
                        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-gray-600">{currency}{product.price}  |  Quantity: {product.quantity}  |  Size: {product.size}</p>
                            <p className="text-gray-500 text-sm">Date: {product.date}</p>
                            <p className="text-gray-500 text-sm">Payment: {product.paymentMethod}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-500 text-sm flex items-center">
                                ● Order Placed
                            </span>
                            <button className="border px-4 py-1 rounded text-sm hover:bg-gray-100">
                                Track Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Order;
