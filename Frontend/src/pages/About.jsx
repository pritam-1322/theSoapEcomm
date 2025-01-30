import React from 'react'
import Title from "../components/Title"
const About = () => {
  return (
    <>
    <div className='text-2xl text-center pt-8 border-t'>
      <Title text1={'About'} text2={'Us'}></Title>
    </div>

    <div className='my-10 flex flex-col md:flex-row gap-16'>
      <img className='w-full md:max-w-[450px]' src="" alt="" />
      <div className='flex flex-col justify-center gap-6 md:w-2/4'>
      <p></p>
      <p></p>
      <b className='text-gray-800'>Our Mission</b>
      <p></p>
      </div>
    </div>

    <div className='text-3xl py-2'>
      <Title text1={"Why"} text2={"Choose Us"}></Title>
    </div>

    <div className='flex flex-col md:flex-row text-sm mb-20'>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <p>Quality</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <p>Parabean Free</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <p>No Harsh Chemicals</p>
      </div>
    </div>
    </>
  )
}

export default About