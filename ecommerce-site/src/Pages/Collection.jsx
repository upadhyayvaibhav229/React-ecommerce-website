import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectShop } from "../Features/shopSlice";
import { img } from "../Components/img";
import Title from "../Components/Title";
import Product_item from "../Components/Product_items";
import { useSearchFilter } from "../Features/SearchFilter";

const Collection = () => {
  const { products } = useSelector(selectShop);
  const [showfilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [Category, setCategory] = useState([]);

  const [subCategory, setSubCategory] = useState([]);

    const {searchTerm, setSearchTerm, setShowSearch, showSearch} = useSearchFilter();

  const toggleCategory = (e) => {
    if (Category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      setFilterProducts(products);
    }
  }, [products]);

  const applyFilter = () => {
    let productCpy = products.slice();

    if (showSearch && searchTerm.length > 0) {
      productCpy = productCpy.filter(
        (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (Category.length > 0) {
      productCpy = productCpy.filter((item) =>
        Category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productCpy = productCpy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productCpy);
  };

  const lowToHigh = () => {
    setFilterProducts((prev) => [...prev.sort((a, b) => a.price - b.price)]);
  };

  const highToLow = () => {
    setFilterProducts((prev) => [...prev.sort((a, b) => b.price - a.price)]);
  };

  const sortProducts = (e) => {
    if (e.target.value === "low-high") {
      lowToHigh();
    } else if (e.target.value === "high-low") {
      highToLow();
    }
  };

  useEffect(() => {
    applyFilter();
    // console.log(Category);
    // console.log(subCategory);
  }, [Category, subCategory, searchTerm, showSearch]);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t-2 border-gray-200 lg:ml-5 p-2">
        {/* filter Option */}
        <div className="min-w-60">
          <p className="text-2xl">Filter Option</p>

          <p
            onClick={() => setShowFilter(!showfilter)}
            className="border flex justify-between border-gray-300 pl-5 py-3 gap-2 mt-2"
          >
            FILTERS
            <img
              src={img.dropdown_icon}
              className={`h-4 mt-1 mr-2 sm:hidden ${showfilter ? "rotate-90" : ""} `}
              alt=""
            />
          </p>

          {/* Category filter */}
          <div
            className={`border border-gray-300 pl-5 py-3 mt-6 ${
              showfilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium">Categories</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value="Men"
                  onChange={toggleCategory}
                />{" "}
                MEN
              </p>
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value="Women"
                  onChange={toggleCategory}
                />{" "}
                Women
              </p>
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value="Kids"
                  onChange={toggleCategory}
                />{" "}
                Kids
              </p>
            </div>
          </div>

          {/* Sub Category */}
          <div
            className={`border border-gray-300 pl-5 py-3 mt-6 ${
              showfilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="my-3 text-sm font-medium">TYPE</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value="Topwear"
                  onChange={toggleSubCategory}
                />{" "}
                Topwear
              </p>
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value="Bottomwear"
                  onChange={toggleSubCategory}
                />{" "}
                BottomWear
              </p>
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value="Winterwear"
                  onChange={toggleSubCategory}
                />{" "}
                Winterwear
              </p>
            </div>
          </div>
        </div>
        {/* right side */}
        <div className="flex-1 lg:ml-3 p-2 ">
          <div className="flex flex-row lg:flex-row justify-between text-base sm:text-2xl mb-4">
            <div>
              <Title text1={"ALL"} text2={"COLLECTIONS"} />
            </div>

            <div className="lg:self-end ml-4">
              <select
                className="border-gray-300 border-2 text-sm p-2"
                onChange={sortProducts}
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
            </div>
          </div>
          {/* Product sort */}
          {/* Products */}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 sm:place-items-center">
            {filterProducts.map((item, i) => (
              <Product_item
                key={i}
                id={item._id}
                img={item.image}
                name={item.name}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
