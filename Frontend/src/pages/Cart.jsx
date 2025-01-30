import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { ImBin } from "react-icons/im";
import CardTotal from '../components/CartTotal';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { products, currency, cartItems, updateCartQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  // Populate cartData with products and their quantities
  useEffect(() => {

    if(products.length>0){
      const tempData = [];
      for (const itemId in cartItems) {
        const product = products.find((product) => product._id === itemId); // No parseInt, as _id is a string
        if (product) {
          tempData.push({ product, quantity: cartItems[itemId] });
        }
      }
      setCartData(tempData);
    }

  }, [cartItems, products]); // Dependency array includes products to handle dynamic updates

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"Your"} text2={"cart"}></Title>
      </div>

      <div>
        {
          cartData.length > 0 ? (
            cartData.map((item, index) => {
              const { product, quantity } = item;

              return (
                <div
                  className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                  key={product._id || index} // Ensure a unique key
                >
                  <div className="flex items-start gap-5">
                    <img
                      className="w-16 sm:w-20"
                      src={product.image?.[0] || 'default-image.jpg'} // Fallback for missing images
                      alt={product.name || 'Product Image'} // Fallback for missing name
                    />
                    <div>
                      <p className="text-sm sm:text-lg font-medium">{product.name}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <p className="text-sm sm:text-lg font-medium">
                          {currency}{product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                  <input
                    onChange={(event) => {
                      const value = parseInt(event.target.value);
                      if (value > 0) {
                        updateCartQuantity(product._id, value);
                      }
                    }}
                    className="border max-w-12 sm:max-w-13 px-1 sm:px-1 py-2"
                    type="number"
                    min={1}
                    defaultValue={quantity}
                  />
                  <ImBin
                    onClick={() => {
                      updateCartQuantity(product._id, 0); // Remove item from cart
                    }}
                    className="text-xl text-red-300 mr-4 sm:w-5 cursor-pointer"
                  />
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-500 py-10">Your cart is empty.</div>
          )
        }
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CardTotal></CardTotal>

          <div className="w-full text-end">
            <Link to="/placeOrder">
              <button className="bg-black text-white px-8 py-3 my-8 font-robo active:bg-gray-600">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;






















































// import React, { useContext,useEffect,useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from '../components/Title'
// import { ImBin } from "react-icons/im";
// import CardTotal from '../components/CartTotal';
// import { Link } from 'react-router-dom';  

// const Cart = () => {
//   const {products,currency,cartItems,updateCartQuantity,}=useContext(ShopContext);
//   const [cartData,setCartData]=useState([]);

//   useEffect(()=>{
//     const tempData=[];
//     for(const items in cartItems){
//       const product=products.find((product)=>product._id===parseInt(items));
//       tempData.push({product,quantity:cartItems[items]});
//     }
//     setCartData(tempData);
//   },[cartItems]);
//   return (
//     <div className='border-t pt-14 '>
//       <div className='text-2xl mb-3'>
//         <Title text1={"Your"} text2={"cart"}></Title>
//       </div>

//       <div>
//       {
//   cartData.map((item, index) => {
//     const productsData = products.find((product) => product._id === item.product._id);


//     return (
//       <div
//         className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
//         key={productsData.id || index}  // Preferably use a unique identifier like product.id
//       >
//         <div className="flex items-start gap-5">
//           <img
//             className="w-16 sm:w-20"
//             src={productsData.src?.[0] || 'default-image.jpg'}  // Fallback for missing images
//             alt={productsData.title || 'Product Image'}  // Fallback for missing title
//           />
//           <div>
//             <p className="text-sm sm:text-lg font-medium">{productsData.title}</p>
//             <div className='flex items-center gap-3 mt-3'>
//               <p className="text-sm sm:text-lg font-medium">{currency}{productsData.price}</p>
//             </div>
//           </div>
//         </div>
//         <input onChange={(event)=>{
//           event.target.value===''|| event.target.value==='0'?null:updateCartQuantity(productsData.id,parseInt(event.target.value));
//         }} className='border max-w-12 sm:max-w-13 px-1 sm:px-1 py-2' type='number' min={1} defaultValue={item.quantity}></input>
//         <ImBin onClick={()=>{
//           updateCartQuantity(productsData._id,0);
//         }} className='text-xl text-red-300 mr-4 sm:w-5 cursor-pointer'></ImBin>
//       </div>
//     );
//   })
// }

//       </div>

//       <div className='flex justify-end my-20'>
//         <div className='w-full sm:w-[450px]'>
//           <CardTotal></CardTotal>

//           <div className='w-full text-end '>
//           <Link to="/placeOrder"><button className='bg-black text-white px-8 py-3 my-8 font-robo active:bg-gray-600'> Proceed to Checkout</button></Link>
//           </div>
//         </div>
//       </div>



//     </div>
//   )
// }

// export default Cart