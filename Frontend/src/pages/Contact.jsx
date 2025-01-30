import React from 'react'
import Title from '../components/Title'

const Contact = () => {
  return (
    <div>
      <div className='text-center tex-2xl pt-10 border-t'>
        <Title text1={'Contact '} text2={'Us'} />

      </div>

      <div className='font-robo my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src="" alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-700'>Our Store</p>
          <p className='text-gray-500'>Address</p>
          <p className='text-gray-500'>Phone </p>
        </div>
      </div>
    </div>
  )
}

export default Contact