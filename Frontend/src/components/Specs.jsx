import React from 'react'
import { TbLeafOff } from "react-icons/tb";
import { GiChemicalDrop } from "react-icons/gi";
import { LuDog } from "react-icons/lu";
import { IoEarthSharp } from "react-icons/io5";
import { MdOutlineGirl } from "react-icons/md";


const Specs = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base font-robo text-gray-700'>
        <div>
        <TbLeafOff className='text-5xl md:text-7xl m-auto mb-5  text-blue-600'/>
        <p className='text-center font-semibold'>100% Paraben Free</p>
        </div>
        <div>
        <GiChemicalDrop className='text-5xl md:text-7xl m-auto mb-5  text-yellow-600'/>
        <p className='text-center font-semibold'>Sulphate Free</p>
        </div>
        <div>
        <LuDog className='text-5xl md:text-7xl m-auto mb-5  text-pink-600'/>
        <p className='text-center font-semibold'>Cruelty Free</p>
        </div>
        <div>
        <IoEarthSharp className='text-5xl md:text-7xl m-auto mb-5  text-green-600'/>
        <p className='text-center font-semibold'>100% Natural Oils</p>
        </div>
        <div>
        <MdOutlineGirl className='text-5xl md:text-7xl m-auto mb-5  text-orange-600'/>
        <p className='text-center font-semibold'>Empowering Womens</p>
        </div>
    </div>
  )
}

export default Specs