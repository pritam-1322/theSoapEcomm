import mongoose from "mongoose";

const connectDB=async()=>{
    mongoose.connection.on('connected',()=>{
        console.log('connected to MongoDB');
    })
    await mongoose.connect(`${process.env.MONGO_DB_URI}/e-commerce`)
}

export default connectDB;