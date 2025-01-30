
import express from 'express';

import { placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus, verifyStripe } from '../controllers/order.controller.js';

import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';
const orderRouter=express.Router();


//admin features
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);

//payments
orderRouter.post('/stripe',authUser,placeOrderStripe);
orderRouter.post('/placeorder',authUser,placeOrder);
orderRouter.post('/razorpay',authUser,placeOrderRazorpay);
orderRouter.post('/verifyStripe',authUser,verifyStripe);

//user features
orderRouter.post('/userorders',authUser,userOrders);

export default orderRouter;


