import React from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
const CartTotal = () => {
    const {currency,deliveryCharge,getCartAmount}=useContext(ShopContext);
  return (
    <div className='w-full '>
        <div className='text-2xl'>
            <Title text1={"Cart"} text2={"Total"}></Title>
        </div>

        <div className='flex font-robo flex-col gap-2 text-sm justify-between mt-5'>
            <div className='flex justify-between'>
                <p>Subtotal</p>
                <p>{currency} {getCartAmount()}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <p>Delivery Charge</p>
                <p>{currency} {deliveryCharge}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <b>Total</b>
                <b>{currency} {getCartAmount()===0 ? 0: getCartAmount()+deliveryCharge}</b>
            </div>

        </div>
    </div>
  )
}

export default CartTotal