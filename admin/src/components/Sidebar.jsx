import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaListOl } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";

import { MdAdd } from "react-icons/md";


const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border'>
        <div className='flex flex-col gap-4 pt-6 pl-[10%] pr-[10%] text-[15px]'>
        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-1 px-3 py-2 rounded-lg' to={'/add'}>
        <MdAdd className="text-2xl "/>
        <p className='hidden md:block '>Add items</p>
        </NavLink>
    </div>


    <div className='flex flex-col gap-4 pt-6 pl-[10%] pr-[10%] text-[15px]'>
        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-1 px-3 py-2 rounded-lg' to={'/list'}>
        <FaListOl className="text-2xl "/>
        <p className='hidden md:block '>List Items</p>
        </NavLink>
    </div>



    <div className='flex flex-col gap-4 pt-6 pl-[10%] pr-[10%] text-[15px]'>
        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-1 px-3 py-2 rounded-lg' to={'/orders'}>
        <AiFillProduct className="text-2xl "/>
        <p className='hidden md:block '>Orders</p>
        </NavLink>
    </div>
    </div>
  )
}

export default Sidebar