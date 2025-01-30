import React from 'react'
import { SlHeart } from "react-icons/sl";

const Footer = () => {
  return (
    <>
    <div className='flex flex-col sm:grid grid-cols-[4fr_1fr_1fr] gap-12 my-10 mt-30 text-sm '>
      <div>
        LOGO
        <p className='w-full md:w-2/3 text-gray-500 '>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque at vero harum, saepe numquam quam maiores assumenda debitis adipisci nulla unde quaerat non nemo fuga aliquid officia, laboriosam expedita. Veritatis?</p>
      </div>

      <div>
        <p className='text-xl font-medum mb-5'>Company</p>
        <ul className='flex flex-col gap-1 text-gray-500'>
          <li>Home</li>
          <li>About Us</li>
          <li>Privacy Policy</li>
        </ul>
      </div>


      <div className='flex flex-col '>
      <div>
      <p className='text-xl font-medum mb-5'>Get In Touch</p>
      <ul className='flex flex-col gap-1 text-gray-500'>
          <li>+91-9828046336, 7340696336</li>
      </ul>
      </div>
      </div>


      

    

    </div>

    <div className='flex flex-col text-center w-full  '>
      <hr></hr>
      <p className='py-5 text-sm text-center font-thin'>Copywrite 2025. All rights reserved</p>
      <p className='flex font-baseline'>Made with <span><SlHeart></SlHeart></span></p>
    </div>
    </>
  )
}

export default Footer