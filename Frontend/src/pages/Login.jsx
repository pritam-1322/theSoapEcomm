import React, { useContext,useEffect } from 'react'
import { useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [currentState,setCurrentState]=useState('Login');
  const {token,setToken,backendURL}=useContext(ShopContext);
  const [name,setName]=useState('');
  const [password,setPassword]=useState('');
  const [email,setEmail]=useState('');
  const navigate=useNavigate();

  const onSubmitHandler=async(event)=>{
    event.preventDefault();
    try {
      if(currentState==='Sign Up'){
        const response=await axios.post(backendURL+'/api/user/register',{name,email,password});
        // console.log(response.data);
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token);
        }
        else{
          toast.error(response.data.message);
        }
      }
      else{
          const response=await axios.post(backendURL+'/api/user/login',{email,password});
          if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem('token',response.data.token);toast.success('Login Successfull !');
            
          }
          else{
            toast.error(response.data.message);
          }

      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/');
    }
  },[token]);
  return (
    <form className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800' onSubmit={onSubmitHandler}>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl font-robo'>{currentState}
        </p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-600'/>
      </div>

      {currentState==="Login"?" ":<input onChange={(event)=>{
        setName(event.target.value)
      }} value={name} type="text" className='w-full px-3 py-2 border border-gray-800 ' placeholder='Name ' required/>}
      <input type="email" onChange={(event)=>{
        setEmail(event.target.value)
      }} value={email} className='w-full px-3 py-2 border border-gray-800 ' placeholder='Email ' required/>
      <input onChange={(event)=>{
        setPassword(event.target.value)
      }} type="password" value={password} className='w-full px-3 py-2 border border-gray-800 ' placeholder='Password ' required/>

      <div className='w-full flex justify-between  text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot password</p>
        {
          currentState==='Login' ?<p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create New Account <span className='text-blue'></span></p>:<p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Already have an account? <span className='text-blue'></span></p>
        }
      </div>

      <button className='bg-black text-white px-8 py-3 my-8 font-robo active:bg-gray-600'>{currentState==='Login'?'Sign In':'Sign Up'}</button>
    </form>
  )
}

export default Login