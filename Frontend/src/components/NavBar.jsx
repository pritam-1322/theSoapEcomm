import React, { useContext, useState } from "react";
import { Link, NavLink,useNavigate} from "react-router-dom";
import { LiaSearchSolid } from "react-icons/lia";
import { PiShoppingCartLight } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { CiMenuFries } from "react-icons/ci";
import { TfiAngleLeft } from "react-icons/tfi";
import { ShopContext } from "../context/ShopContext";
import toast from "react-hot-toast";
const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const navigate=useNavigate();
  const {setShowSearch,getCartCount,token, setToken , setCartItems, }=useContext(ShopContext)
  const logout=()=>{
    localStorage.removeItem('token');
    setToken('');
    toast.success('Logout Successfull !');
    navigate('/login');
    // setCartItems({});
  }
  return (
    <div className="flex items-center justify-between py-10 font-medium">
      <h2 className="w-26 font-robo">Logo</h2>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-600 font-robo">
        <NavLink to={"/"} className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
        </NavLink>
        <NavLink
          to={"/collection"}
          className="flex flex-col items-center gap-1"
        >
          <p>Collection</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
        </NavLink>
        <NavLink to={"/about"} className="flex flex-col items-center gap-1">
          <p>About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
        </NavLink>
        <NavLink to={"/contact"} className="flex flex-col items-center gap-1">
          <p>Contact</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
        </NavLink>
      </ul>

      <div className="flex item-center gap-5">
        <LiaSearchSolid onClick={()=>setShowSearch(true)} className="cursor-pointer text-2xl" />

        <div className="group relative ">
          <CiUser onClick={()=>{
            token?null:navigate('/login');
          }} className="cursor-pointer text-2xl" />
          {/* drop down menu  */}

          {token && <div className="group-hover:block hidden absolute dropdown right-0 pt-4 z-10">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-200 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black ">Profile </p>
              <p onClick={()=>{
                navigate('/orders');
              }} className="cursor-pointer hover:text-black ">Orders </p>
              <p onClick={logout} className="cursor-pointer hover:text-black ">Logout</p>
            </div>
          </div>}
        </div>

        <Link to={"/cart"} className="relative">
          <PiShoppingCartLight className="text-2xl min-w-5" />
          <p className="absolute right-[-13px] top-[-6px] w-4 text-center leading 4 bg-black font-robo text-white aspect-square rounded-full text-[10px] ">
            {getCartCount()}
          </p>
        </Link>

        <CiMenuFries
          onClick={() => setVisible(true)}
          className="text-2xl sm:hidden "
        />
      </div>

      {/* sidebar drawer  */}

      <div
        className={`absolute top-0 right-0 bottom-0 bg-white overflow-hidden transition-all ${
          visible ? "w-full z-10" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600 ">
          <div
            onClick={() => {
              setVisible(false);
            }}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <TfiAngleLeft className="text-2xl"></TfiAngleLeft>
            <p>Back</p>
          </div>

          <NavLink onClick={()=>{
            setVisible(false)
          }} className="py-2 pl-6 border" to={'/'}>Home</NavLink>
          <NavLink onClick={()=>{
            setVisible(false)
          }} className="py-2 pl-6 border" to={'/collection'}>Collection</NavLink>
          <NavLink onClick={()=>{
            setVisible(false)
          }} className="py-2 pl-6 border" to={'/about'}>About</NavLink>
          <NavLink onClick={()=>{
            setVisible(false)
          }} className="py-2 pl-6 border" to={'/contact'}>Contact</NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
