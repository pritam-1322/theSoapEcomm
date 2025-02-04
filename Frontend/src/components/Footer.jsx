import React from 'react';
import { SlHeart } from "react-icons/sl";

const Footer = () => {
  return (
    <footer className=' py-10 px-6 md:px-12'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10'>
        {/* Logo and Description */}
        <div>
          <h2 className='text-2xl font-bold tracking-wide'>LOGO</h2>
          <p className=' mt-4 text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque vero harum, saepe numquam quam maiores assumenda debitis adipisci nulla.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Company</h3>
          <ul className='space-y-2 '>
            <li className='hover:text-gray-900 cursor-pointer transition'>Home</li>
            <li className='hover:text-gray-900 cursor-pointer transition'>About Us</li>
            <li className='hover:text-gray-900 cursor-pointer transition'>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Get In Touch</h3>
          <ul className='space-y-2 text-gray-900'>
            <li>📞 +91-9828046336, 7340696336</li>
            <li>✉️ contact@company.com</li>
            <li>📍 Alwar,Rajasthan,India</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className='mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm'>
        <p>&copy; 2025. All rights reserved.</p>
        <p className='flex justify-center items-center mt-2 text-black text-md'>Made with <SlHeart className='text-red-500 mx-1' /> by Pritam Singh</p>
      </div>
    </footer>
  );
}

export default Footer;
