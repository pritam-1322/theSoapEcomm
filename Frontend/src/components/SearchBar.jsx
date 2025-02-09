import React, { useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useContext } from 'react'
import { BiSearchAlt } from "react-icons/bi";
import { TfiClose } from "react-icons/tfi";
import { useLocation } from 'react-router-dom';


const SearchBar = () => {
    const {search,setSearch,showSearch,setShowSearch}=useContext(ShopContext);
    const[visible,setVisible]=useState(false);
    const location=useLocation();

    useEffect(()=>{
        if(location.pathname.includes('collection')){
            setVisible(true);
        }
        else{
            setVisible(false);
        }
    },[location])

  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50 text-center'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='search' value={search} onChange={(event)=>setSearch(event.target.value)} />
        <BiSearchAlt className='text-xl'></BiSearchAlt>
        </div>
        <TfiClose onClick={()=>{
            setShowSearch(false)
        }} className='text-xl cursor-pointer inline'></TfiClose>
    </div>
  ) : null
}

export default SearchBar