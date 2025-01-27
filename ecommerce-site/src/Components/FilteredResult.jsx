import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectShop } from '../Features/shopSlice';
import { useLocation } from 'react-router-dom';
import Product_item from './Product_item'; // Assuming you have this component for rendering product

const FilteredResult = () => {
  const { searchTerm, products } = useSelector(selectShop);

  // Filter products based on the searchTerm
  const filteredItems = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname); // Log the query string from the URL
  }, [location]);

  return (
    <div>
      {filteredItems.map((item, i) => (
        <Product_item key={i} id={item._id} img={item.image} name={item.name} price={item.price} />
      ))}
    </div>
  );
};

export default FilteredResult;
