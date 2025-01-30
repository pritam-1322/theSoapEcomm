import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import {backendURL} from "../App"
import toast from 'react-hot-toast';
const Orders = ({token}) => {
  const [orders,setOrders]=useState([]);
  const fetchAllOrders=async()=>{
    if(!token){
      return;
    }
    try {
      const response=await axios.post(backendURL+'/api/order/list',{},{headers:{token}});
    console.log(response.data);
    if(response.data.success){
      setOrders(response.data.orders);
    }else{
      toast.error(response.data.message);
    }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }

  }

  const statusHandler=async(orderId,event)=>{
    try {
      const response=await axios.post(backendURL+'/api/order/status',{orderId,status:event.target.value},{headers:{token}});
      if(response.data.success){
        await fetchAllOrders();
        toast.success('Status Updated');
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  }

  useEffect(()=>{
    fetchAllOrders();
  },[token])
  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Order Page</h3>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, orderIndex) => (
            <div key={orderIndex} className="p-4 border rounded shadow-md">
              {/* Order Items */}
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Items:</h4>
                {order.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center space-x-4 mb-2">
                    <img
                      src={item.itemInfo.image[0]} // Display the first image
                      alt={item.itemInfo.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.itemInfo.name}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        Price: ₹{item.itemInfo.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Address */}
              <div className="mb-4">
                <h4 className="font-semibold">Shipping Address:</h4>
                <p>
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>
                  {order.address.street}, {order.address.city}, {order.address.state},{' '}
                  {order.address.country}, {order.address.zipCode}
                </p>
                <p>Phone: {order.address.phone}</p>
              </div>

              {/* Order Details */}
              <div className="space-y-2">
                <p>
                  <strong>Order ID:</strong> {order._id}
                </p>
                <p>
                  <strong>Number of Items:</strong> {order.items.length}
                </p>
                <p>
                  <strong>Total Amount:</strong> ₹{order.amount}
                </p>
                <p>
                  <strong>Payment:</strong> {order.payment ? 'Paid' : 'Not Paid'}
                </p>
                <p>
                  <strong>Order Date:</strong>{' '}
                  {new Date(order.date).toLocaleString()}
                </p>
                <p>
                <strong>Status : </strong>
                  <select onChange={(event)=>{
                    statusHandler(order._id,event)
                  }} value={order.status} className='p-2 font-semibold'>
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders