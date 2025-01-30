import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendURL, currency } from '../App';
import toast from 'react-hot-toast';

const List = ({token}) => {
  const [list, setList] = useState([]); 

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products); 
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  const removeProduct=async(id)=>{
    try {
      const response=await axios.post(backendURL+'/api/product/remove',{id},{headers:{token}});
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
        } else {
          toast.error(response.data.message);
          }

    } catch (error) {
      toast.error(error.message);

    }
  }

  return (
    <div>
      <p className="mb-2">All Product List</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border text-sm">
              <img src={item.image[0]} alt={item.name} className="h-12 w-12 object-cover" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>
                {currency}
                {item.price}/-
              </p>
              <button onClick={()=>{
                removeProduct(item._id)
              }} className="text-red-500">X</button>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default List;
