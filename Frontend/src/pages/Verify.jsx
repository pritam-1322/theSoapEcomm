import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast';

const Verify = () => {
    const {token, setCartItems,backendURL}=useContext(ShopContext);
    const navigate=useNavigate();
    const [searchParams,setSearchParams]=useSearchParams();
    const success=searchParams.get('success');
    const orderId=searchParams.get('orderId');


    const verifyPayment=async()=>{
        try {
            if(!token){
                return;
            }
            const response=await axios.post(backendURL+'/api/order/verifyStripe',{orderId,success},{headers:{'authorization':'Bearer '+token}});
            if(response.data.success){
                setCartItems([]);
                navigate('/orders');
            }
            else{
                navigate('/cart');
            }
        } catch (error) {
            console.log(error);
            navigate('/cart');
            toast.error("Payment verification failed");
        }
    }
    useEffect(()=>{
        verifyPayment();
    },[token])
  return (
    <>
    </>
  )
}

export default Verify