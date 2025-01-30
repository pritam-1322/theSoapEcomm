import React from 'react'
import toast from 'react-hot-toast';
const Navbar = ({setToken}) => {
  return (
    <div>
        <nav className=" flex items-center py-2 justify-between px-[4%]">
            <h4 className='w-[max(10%,80px)]'>Logo</h4>
            <button onClick={()=>{
              setToken('');
              toast.success("Log Out Successfully !")
            }} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full '>Logout</button>
        </nav>
    </div>
  )
}

export default Navbar