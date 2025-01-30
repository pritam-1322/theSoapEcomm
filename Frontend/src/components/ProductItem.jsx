import React from 'react'
import { ShopContext } from '../context/ShopContext';
import {Link} from 'react-router-dom';
import { useContext } from 'react';
const ProductItem = ({id,image,name,price}) => { 
    const {currency} = useContext(ShopContext);
  return (
    <>
    <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
    <div className='overflow-hidden h-[400px]'>
        <img className='hover:scale-110 transition ease-in-out object-cover w-full h-full' src={Array.isArray(image) ? image[0] : image} alt="" />
    </div>
    <p className='pt-3 pb-1 text-sm font-robo'>{name}</p>
    <p className='text-sm font-medium'>{currency} {price}</p>
    </Link>
    </>
  )
}

export default ProductItem