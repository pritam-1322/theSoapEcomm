import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const currency="INR";
const deliveryCharge=50;
//COD order
const placeOrder=async(req,res)=>{
    try {
        const userId = req.userId;
        const {items,amount,address}=req.body;
        // console.log(req.body);
        const orderData= {
            items,
            amount,
            paymentMethod:"COD",
            payment:false,
            address,
            userId,
            date:Date.now()
        };

        const newOrder=new orderModel(orderData);
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId,{cartData:{}});
        res.json({
            success:true,
            message:"order placed successfully"
        })

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}

//User orders for frontend
const userOrders=async(req,res)=>{
    try {
        const userId = req.userId;
        console.log('the user id is ',userId);
        if (!userId) {
            return res.json({
                success: false,
                message: "User ID is missing"
            });
        }
        const orders=await orderModel.find({userId}).sort({date:-1});
        console.log(orders);
        res.json({
            success:true,
            orders
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}



//Stripe order(NOT WORKING PROPERLY GIVING ERRORS)
const placeOrderStripe = async (req, res) => {
    try {
        const userId = req.userId;
        const { items, amount, address } = req.body;
        const { origin } = req.headers;
    
        // Validate inputs
        if (!items || !Array.isArray(items) || items.length === 0 || !amount || !address || !userId) {
          return res.status(400).json({ success: false, message: "Missing required fields." })
        }
    
        // Ensure amount is a number and convert to paise
        const totalAmount = Math.round(Number(amount) * 100)
        if (isNaN(totalAmount)) {
          return res.status(400).json({ success: false, message: "Invalid amount." })
        }
    
        // Create line items for Stripe
        const line_items = items.map((item) => {
          const itemName = item.name || "Unnamed Item"
          const itemPrice = Math.round(Number(item.price) * 100) 
          const itemQuantity = Number(item.quantity) || 1
    
          console.log(`Item: ${itemName}, Price: ${itemPrice}, Quantity: ${itemQuantity}`)
    
          return {
            price_data: {
              currency: currency,
              product_data: { 
                name: itemName,
              },
              unit_amount: itemPrice,
            },
            quantity: itemQuantity,
          }
        })
    
        // Add delivery charge
        line_items.push({
          price_data: {
            currency: currency,
            product_data: { name: "Delivery Charges" },
            unit_amount: Math.round(deliveryCharge * 100), // Convert to paise
          },
          quantity: 1,
        })
    
        console.log("Line items:", JSON.stringify(line_items, null, 2))
    
        // Calculate total from line items
        const calculatedTotal = line_items.reduce((sum, item) => {
          return sum + (item.price_data.unit_amount * item.quantity)
        }, 0)
    
        console.log(`Calculated total: ${calculatedTotal}, Provided total: ${totalAmount}`)
    
        if (calculatedTotal !== totalAmount) {
          console.warn(`Total mismatch: calculated ${calculatedTotal}, provided ${totalAmount}`)
        }
    
        // Create Stripe session
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items,
          mode: "payment",
          success_url: `${origin}/verify?success=true&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${origin}/verify?success=false&session_id={CHECKOUT_SESSION_ID}`,
          shipping_address_collection: {
            allowed_countries: ["IN"], // Restrict to India
          },
          shipping_options: [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: {
                  amount: Math.round(deliveryCharge * 100),
                  currency: currency,
                },
                display_name: "Standard shipping",
                delivery_estimate: {
                  minimum: {
                    unit: "business_day",
                    value: 3,
                  },
                  maximum: {
                    unit: "business_day",
                    value: 5,
                  },
                },
              },
            },
          ],
          metadata: {
            userId: userId.toString(),
          },
        })
    
        // Create order in database
        const orderData = {
          items,
          amount: totalAmount / 100, // Store in rupees in database
          paymentMethod: "Stripe",
          payment: false,
          address,
          userId,
          date: Date.now(),
          stripeSessionId: session.id,
        }
    
        const newOrder = new orderModel(orderData)
        await newOrder.save()
    
        // Respond with session details
        res.json({
          success: true,
          sessionId: session.id,
          session_url: session.url,
        })
      } catch (error) {
        console.error("Stripe error:", error)
        res.status(400).json({ success: false, message: error.message })
      }
};

// verify the stripe payments 
const verifyStripe=async(req,res)=>{
    try{
        const {orderId,success,userId}=req.body;
        if(success){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}});
            res.json({success:true});
            
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false});
        }
    }
    catch(error){
        console.error("Stripe verification payment error:", error)
        res.status(400).json({ success: false, message: error.message })
    }
}




//Razorpay order
const placeOrderRazorpay=async(req,res)=>{
    
}


//All order for Admin
const allOrders=async(req,res)=>{
    try {
        const orders=await orderModel.find({}).sort({date:-1});
        res.json({
            success:true,
            orders
            })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}




//update order status from admin
const updateStatus=async(req,res)=>{
    try {
        const {orderId,status}=req.body;
        await orderModel.findByIdAndUpdate(orderId,{status});
        res.json({
            success:true,
            message:"Status updated successfully"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}


export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus,verifyStripe}