import {v2 as cloudinary} from "cloudinary"

const connectCloudinary=async ()=>{
    cloudinary.config({
        cloud_name: process.env.Cloudinary_NAME,
        api_key: process.env.Cloudinary_API_KEY,
        api_secret: process.env.Cloudinary_SECRET_KEY,

    })
    
}

export default connectCloudinary