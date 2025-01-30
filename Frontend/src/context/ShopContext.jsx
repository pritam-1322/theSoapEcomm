import { createContext,useEffect,useState } from "react";
// import { products } from "../constants/products";
import { useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { use } from "react";

export const ShopContext=createContext();

const ShopContextProvider=(props)=>{
    const currency='₹';
    const deliveryCharge=50;
    const backendURL=import.meta.env.VITE_BACKEND_URL;
    const [search,setSearch]=useState('');
    const [showSearch,setShowSearch]=useState(false);
    const [cartItems,setCartItems]=useState({});
    const [products,setProducts]=useState([]);
    const [token,setToken]=useState('');

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    },[])


    const addToCart=async(itemId)=>{
        let cartData=structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId]+=1;
        }
        else{
            cartData[itemId]={};
            cartData[itemId]=1;
        }
        setCartItems(cartData);

        if(token){
            try {
                await axios.post(backendURL+'/api/cart/add',{itemId},{ headers: { token } });
                // console.log(itemId);
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartCount=()=>{
        let TotalCount=0;
        for(let item in cartItems){
            TotalCount+=cartItems[item];
        }
        return TotalCount;
    }

    // const updateCartQuantity=async(itemId,quantity)=>{
    //     let cartData=structuredClone(cartItems);
    //     if(quantity===0){
    //         delete cartData[itemId];
    //     }
    //     else{
    //         cartData[itemId]=quantity;
    //     }
    //     setCartItems(cartData);

    //     if(token){
    //         try {
    //             await axios.post(backendURL+'/api/cart/update',{itemId,quantity},{ headers: { token } });
    //             console.log(token);
    //         } catch (error) {
    //             console.log(error);
    //             toast.error(error.message);
    //         }
    //     }
    // }


    const updateCartQuantity = async (itemId, quantity) => {
        let cartData = JSON.parse(JSON.stringify(cartItems)); // Deep clone cartItems
      
        // Handle UI state update
        if (quantity === 0) {
          delete cartData[itemId]; // Remove item from cart state
        } else {
          cartData[itemId] = quantity; // Update quantity
        }
      
        setCartItems(cartData); // Update cartItems state in UI
      
        // Send the update to the server
        if (token) {
          try {
            // Make the API request to update or delete the cart item in the database
            await axios.post(
              `${backendURL}/api/cart/update`,
              { itemId, quantity }, // Send itemId and quantity (0 to remove)
              {
                headers: {
                  token, // Ensure token is in headers
                },
              }
            );
          } catch (error) {
            console.error("Failed to update cart:", error);
            toast.error(error.message);
          }
        }
      };
      

    // const getCartAmount=()=>{
    //     let TotalAmount=0;
    //     console.log(products);
    //     for(let item in cartItems){
    //         const product=products.find((product)=>product._id===parseInt(item));
    //         TotalAmount+=product.price*cartItems[item];
    //     }
    //     return TotalAmount;
    // }
    

    const getCartAmount = () => {
        let totalAmount = 0;
      
        for (let item in cartItems) {
          const product = products.find((product) => product._id === item);
          if (product) {
            totalAmount += product.price * cartItems[item]; // Multiply price by quantity in the cart
          }
        }
      
        return totalAmount;
      };
      
    const getProductsData=async()=>{
        try {
            const response = await axios.get(backendURL+'/api/product/list');
            if(response.data.success){
                setProducts(response.data.products)
            }
            else{
                toast.error(response.data.message);
            }
             
            
        }
        catch (error) {
            console.error(error);
            toast.error(error.message);
            }
    }

    const getUserCart=async(token)=>{
        try {
            const response=await axios.post(backendURL+'/api/cart/get',{}, {headers:{token}});
            if(response.data.success){
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }
    
    
    useEffect(()=>{
        getProductsData();
    },[]);
    
    const value={
        products,currency,deliveryCharge,search,setSearch,showSearch,setShowSearch,cartItems,addToCart,getCartCount,updateCartQuantity,getCartAmount,backendURL,setToken,token,setCartItems,
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
 export default ShopContextProvider;