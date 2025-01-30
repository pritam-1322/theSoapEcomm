import React, { useState } from 'react'
import { RiGalleryUploadLine } from "react-icons/ri";
import axios from 'axios'
import { backendURL } from '../App';
import toast from 'react-hot-toast';
const Add = ({token}) => {

  const [image1,setImage1]=useState(false);
  const [image2,setImage2]=useState(false);
  const [image3,setImage3]=useState(false);
  const [image4,setImage4]=useState(false);

  const [name,setName]=useState('');
  const [description,setDescription]=useState('');
  const [price,setPrice]=useState('');
  const [category,setCategory]=useState('BodyWash');
  const [quantity,setQunatity]=useState('');

  const onSubmitHandler=async(event)=>{
    event.preventDefault();
    
    try {
      const formData=new FormData();
      formData.append('name',name);
      formData.append('description',description);
      formData.append('price',price);
      formData.append('category',category);
      formData.append('quantity',quantity);
      image1 && formData.append('image1',image1);
      image2 && formData.append('image2',image2);
      image3 && formData.append('image3',image3);
      image4 && formData.append('image4',image4);
      const response=await axios.post(backendURL+'/api/product/add',formData,{headers:{token}});
      if(response.data.success){
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setPrice('');
        setCategory('BodyWash');
        setQunatity('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);

      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  return (
    <form className='flex flex-col w-full items-start gap-3 ' onSubmit={onSubmitHandler}>
      <div>
        <p className='mb-2 '>Upload Images</p>

        <div className='flex gap-2 '>
          <label htmlFor="image1">
            {!image1 ? (<RiGalleryUploadLine className='text-5xl' />) : (<img className='w-20' src={URL.createObjectURL(image1)} alt="uploaded" />)}
            <input onChange={(e) => {
              setImage1(e.target.files[0])
            }} type="file" id="image1" hidden />
          </label>

          <label htmlFor="image2">
          {!image2 ? (<RiGalleryUploadLine className='text-5xl' />) : (<img className='w-20' src={URL.createObjectURL(image2)} alt="uploaded" />)}
            <input onChange={(e)=>{
              setImage2(e.target.files[0])
            }} type="file" id="image2" hidden />
          </label>

          <label htmlFor="image3">
          {!image3 ? (<RiGalleryUploadLine className='text-5xl' />) : (<img className='w-20' src={URL.createObjectURL(image3)} alt="uploaded" />)}
            <input onChange={(e)=>{
              setImage3(e.target.files[0])
            }} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
          {!image4 ? (<RiGalleryUploadLine className='text-5xl' />) : (<img className='w-20' src={URL.createObjectURL(image4)} alt="uploaded" />)}
            <input onChange={(e)=>{
              setImage4(e.target.files[0])
            }} type="file" id="image4" hidden />
          </label>
        </div>
      </div>


      <div className='w-full '>
        <p className='mb-2 '>Product Name</p>
        <input onChange={(event)=>{
          setName(event.target.value) 
        }} value={name} className='w-full max-w-[500px] px-3 py-3 ' type="text" name="" id="" placeholder='Type Here' required/>
      </div>
      <div className='w-full '>
        <p className='mb-2 '>Product Description</p>
        <textarea onChange={(event)=>{
          setDescription(event.target.value)
        }} value={description} className='w-full max-w-[500px] px-3 py-3 ' type="text" name="" id="" placeholder='Write the description here' required/>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8 '>
        <div>
          <p className='mb-2 '>Product Category</p>
          <select onChange={(event)=>{
            setCategory(event.target.value)
          }} className='w-full px-3 py-3 ' >
            <option value="HandWash">HandWash</option>
            <option value="BodyWash">BodyWash</option>
          </select>
        </div>

        <div>
        <p className='mb-2 '>Product Price</p>
        <input onChange={(event)=>{
          setPrice(event.target.value)
        }} className='w-full px-3 py-2 sm:w-[160px] ' type="number" name="" id=""  placeholder='Enter the Price '/>
      </div>


      </div>


      <div>
        <p className='mb-2 '>Qunatity </p>
        <div>
          <div className='flex gap-2 '>
          <input onChange={(event)=>{
            setQunatity(event.target.value)
          }} className='w-full px-3 py-2 sm:w-full' type="number" name="" id=""  placeholder='Enter the Quantity'/>ml/-
          </div>
        </div>
      </div>


      <button className='bg-black text-white px-8 py-3 my-8 w-28 active:bg-gray-600' type="submit">Add</button>
      

    </form>
  )
}

export default Add