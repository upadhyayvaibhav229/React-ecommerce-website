import React, { useEffect, useState } from 'react'
import { useSearchFilter } from '../Features/SearchFilter'
import { img } from './img';
import { useLocation } from 'react-router-dom';
import { Turtle } from 'lucide-react';

const SearchBar = () => {
    const {searchTerm, setSearchTerm, setShowSearch, showSearch} = useSearchFilter();
    const [Visible, setVisible] = useState(false);

    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes("collection") && showSearch) {
            setVisible(true)
        }else{
            setVisible(false)
        }
        console.log("Location", location.pathname);
    },[location, showSearch])
    
  return showSearch && Visible ? (
    <div className='border-t border-b bg-gray-50 text-center'>
    <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 w-full gap-x-3">
      <input        
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 w-2/4"
      />
      <img src={img.search_icon} alt="" className='w-5 h-5'/>
      <img src={img.cross_icon} onClick={() => setShowSearch(false)} className='w-5 h-5 cursor-pointer' alt="close" />
      </div>
    </div>
  ):null
}

export default SearchBar
