import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from "../context/ShopContext"
import { RiArrowDropDownLine } from "react-icons/ri";
import Title from "../components/Title"
import ProductItem from '../components/ProductItem';
const Collections = () => {
  const {products,search,showSearch}=useContext(ShopContext);
  const [showFilter,setShowFilter]=useState(false);
  const [filterBy, setFilterBy] = useState([]);
  const [category,setCategory]=useState([]);
  const [sortType,setSortType]=useState("relevent");

  const toggleCategory=(event)=>{
    if(category.includes(event.target.value)){
      setCategory(prev=>prev.filter(item=>item!=event.target.value))
    }
    else{
      setCategory(prev=>[...prev,event.target.value])
    }
  }






  const applyFilters=()=>{
    let productsCopy=products.slice();
    if(showSearch && search){
      productsCopy=productsCopy.filter(item=>item.title.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length>0){
      productsCopy=productsCopy.filter(item=>category.includes(item.category))
    }
    setFilterBy(productsCopy);
  }
  useEffect(()=>{
    applyFilters();
  },[category,search,showSearch,products])



  const sortProducts=()=>{
    let fpCopy=filterBy.slice();
    switch(sortType){
      case "low-high":
        setFilterBy(fpCopy.sort((a,b)=>a.price-b.price))
        break;
      case "high-low":
        setFilterBy(fpCopy.sort((a,b)=>b.price-a.price))
        break;
      default:
        applyFilters();
        break;
    }
  }
  useEffect(()=>{
    sortProducts();
  },[sortType])


  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* fliters */}
      <div className='min-w-60'>
        <p onClick={()=>{
          setShowFilter(!showFilter)
        }} className='my-2 text-xl flex items-center cursor-pointer gap-2'>Filters
          <RiArrowDropDownLine className={`text-3xl sm:hidden ${showFilter ?'rotate-180':''}`}></RiArrowDropDownLine>
        </p>

        {/* {categoryFilters} */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter?(""):("hidden")} sm:block`}>
          <p className='mb-3 text-sm font-medium'>Categories </p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-600'>
            <p className='flex gap-2 '>
              <input type="checkbox" onChange={toggleCategory}  className='w-3' value={"HandWash"} />Hand wash
            </p>
            <p className='flex gap-2 '>
              <input type="checkbox" onChange={toggleCategory} className='w-3' value={"BodyWash"} />Body wash
            </p>
          </div>
        </div>
      </div>



      {/* right section  */}

      <div className='flex-1'>
        <div className='flex justify-between text-base font-robo sm:text-2xl mb-4'>
          <Title text1={"All"} text2={"Collections"}></Title>

          {/* sorting */}
          <select onChange={(event)=>{
            setSortType(event.target.value);
          }} className='border border-gray-600 rounded-xl text-sm px-2'>
            <option value="relevent">Sort by relevent</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </div>

        {/* {mapping} */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterBy.map((item,index)=>{
             return <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}></ProductItem>})
          }

        </div>
      </div>

    </div>
  )
}

export default Collections