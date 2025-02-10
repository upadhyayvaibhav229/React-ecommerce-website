import React from 'react';
import { useSelector } from 'react-redux';
import { selectShop } from '../Features/shopSlice';
// import { selectCart } from '../Features/cartSlice';

const Order = () => {
    const { currency } = useSelector(selectShop);
    const cart = useSelector((state) => state.cart.cart);

    const date = new Date();

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold border-b pb-2">MY ORDERS</h2>
            <div className="mt-4">
                {cart.length > 0 ? (
                    cart.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 border rounded-lg mb-4">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                            <div className="flex-1">
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-gray-600">
                                    {currency}{item.price}  |  Quantity: {item.quantity}  |  Size: {item.selectedSize}
                                </p>
                                <p className="text-gray-500 text-sm">Date: {date.toLocaleString()}</p>
                                {/* <p className="text-gray-500 text-sm">Payment: {item.paymentMethod}</p> */}
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
                    ))
                ) : (
                    <p className="text-gray-500 mt-4">No orders placed yet.</p>
                )}
            </div>
        </div>
    );
};

export default Order;

