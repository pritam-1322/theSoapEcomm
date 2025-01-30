import React, { useContext } from 'react'
import Title from "../components/Title"
import CartTotal from "../components/CartTotal"
import { useState } from 'react';
import { FaCcStripe } from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";
import { GiCash } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import toast from 'react-hot-toast';


const PlaceOrder = () => {
  const [method,setMethod]=useState('cod');
  const [formData,setFormData]=useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    state:'',
    city:'',
    zipCode:'',
    country:'',
    phone:''
  });

  const navigate=useNavigate();
  const {backendURL,token,cartItems,setCartItems,getCartAmount,deliveryCharge,products}=useContext(ShopContext);

  const onChangeHandler=(event)=>{
    let name=event.target.name;
    let value=event.target.value;
    setFormData({...formData,[name]:value});
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (let item in cartItems) {
        const itemInfo = structuredClone(products.find(product => product._id === item));
        orderItems.push({
          quantity: cartItems[item],
          itemInfo: itemInfo,
        });
      }
  
      // Build the order data object
      let orderData = {
        items: orderItems,
        amount: getCartAmount() + deliveryCharge,
        address: formData,
      };
  
      switch (method) {
        case 'cod':
          const response = await axios.post(
            backendURL + '/api/order/placeorder',
            orderData,
            { headers: { token } } // The userId will be derived from the token on the server side
          );
          if (response.data.success) {
            setCartItems({}); // Clear the cart after order is placed
            navigate('/orders'); // Navigate to the orders page
            toast.success(responseStripe.data.message);
          } else {
            toast.error(response.data.message);
          }
          break;
  
        case 'stripe':
          const responseStripe = await axios.post(backendURL+'/api/order/stripe', orderData, { headers: { token } });
          // console.log(responseStripe);
          if (responseStripe.data.success) {
            const {session_url}=responseStripe.data;
            window.location.replace(session_url);
            // setCartItems({}); // Clear the cart after order is placed
            // navigate('/orders'); // Navigate to the orders page
            toast.success(responseStripe.data.message);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
  
        case 'razorpay':
          orderData.paymentMethod = 'Razorpay';
          break;
  
        default:
          break;
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place the order. Please try again.");
    }
  };
  
  return (
    <form onSubmit={onSubmitHandler} className='font-robo flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={"Delivery"} text2={"Information"}></Title>
        </div>

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder='first name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName}  type="text" placeholder='last name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email}  type="email" placeholder='email address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
        <input required onChange={onChangeHandler} name='street' value={formData.street}  type="text" placeholder='street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='state' value={formData.state}  type="text" placeholder='state' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
          <input required onChange={onChangeHandler} name='city' value={formData.city}  type="text" placeholder='city' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipCode' value={formData.zipCode}  type="number" placeholder='zipCode' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
          <input required onChange={onChangeHandler} name='country' value={formData.country}  type="text" placeholder='country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone}  type="number" placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
      </div>




      {/* right */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal></CartTotal>
        </div>

        <div className='mt-12'>
          <Title text1={"Payment"} text2={"Method"}></Title>

          <div className='flex gap-3 flex-col lg:flex-row'>
            <div  onClick={()=>{
              setMethod("stripe")
            }}  className='flex items-center gap-3 border p-2 px-3 cursor-pointer '>
              <p className={`min-w-3.5 h-3.5 border rounded-full  ${method==='stripe'?'bg-green-600': ""}`}></p>
              <FaCcStripe className='text-3xl text-violet-600 mx-4'/>Stripe
            </div>



            {/* <div onClick={()=>{
              setMethod("razorpay")
            }}  className='flex items-center gap-3 border p-2 px-3 cursor-pointer '>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='razorpay'?'bg-green-600':''} `}></p>
              <SiRazorpay className='text-3xl text-blue-600 mx-4'/>Razorpay
            </div> */}



            <div  onClick={()=>{
              setMethod("cod")
            }} className='flex items-center gap-3 border p-2 px-3 cursor-pointer '>
              <p className={`min-w-3.5 h-3.5 border rounded-full  ${method==='cod'?'bg-green-600':''}`}></p>
              <GiCash className='text-3xl text-yellow-600 mx-4'/>Cash
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-8 py-3 my-8 font-robo active:bg-gray-600'>Place Order</button>
          </div>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder