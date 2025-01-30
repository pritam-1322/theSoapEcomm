import React, { useContext, useState} from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';
import {toast} from 'react-hot-toast';
const Product = () => {
  const {productId}=useParams();
  const {products,currency,addToCart}=useContext(ShopContext);
  const [productData,setProductData]=useState(null);
  const [image,setImage]=useState('');

  const fetchProductData=async()=>{
    products.map((item)=>{
      if(item._id==productId){
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    })

  }

  useEffect(()=>{
    if (products && products.length > 0) {
      fetchProductData();
    }
  },[productId,products])


  return productData ? (
    <div className='border-t pt-10 transition-opacity ease-in duartion-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-hidden sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full '>
            {
              productData.image.map((item,index)=>(
                
                  <img onClick={()=>{
                    setImage(item)
                  }} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer object-cover ' src={item} key={index} alt="" />
                
              ))
            }
          </div>

          <div className='w-full sm:w-[80%] relative pb-[56.25%]'>
            <img className='absolute top-0 left-0 w-full h-full object-contain' src={image} alt="" />
          </div>
        </div>

        {/* product details */}
        <div className='flex-1'>
          <h1 className='font-robo font-medium text-3xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-3 '>
            {/* ratings */}
          </div>
          <p className='mt-5 text-3xl font-medium font-robo'>{currency} {productData.price}</p>
          <p className='mt-5 text-gray-500 w-4/5'>{productData.description}</p>

          <div className='flex flex-col gap-4 my-8 mt-5'>
            <div className='flex items-center gap-2 font-robo '>
              {/* quantity */}
              <span className='bg-gray-200 px-3 py-3 rounded-full border border-gray-800'>Quantity:  {productData.quantity} ml</span>
            </div> 
          </div>

          <button onClick={()=>{
            addToCart(productData._id);
            toast.success('Product added to cart');
          }} className='bg-black text-white px-8 py-3 font-robo active:bg-gray-600'>Add to Cart</button>
          <hr className='mt-8 sm:w-4/5' />

          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1 '>
            <p>100 % Genuine Products</p>
            <p>Customer Satisfaction Guaranteed</p>
          </div>
        </div>
      </div>


      {/* description and reviews */}

      {/* <div className='mt-20 '>
        <div className='flex '>
          <b className='border px-5 py-3 text-sm'></b>
        </div>
      </div> */}


      {/* relatedProducts */}
      <RelatedProducts category={productData.category} />
    </div>
  ): <div className='opacity-0'></div>
}

export default Product