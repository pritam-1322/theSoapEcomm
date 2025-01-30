import {v2 as cloudinary} from "cloudinary";
import productModel from "../models/product.model.js";
// addingProduct
const addProduct = async (req, res) => {
    try {
        // Extract form data
        const { name, price, quantity, description, category } = req.body;

        // Access files safely
        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];

        // check undefined for cloudinary upload 
        const images=[image1,image2,image3,image4].filter((item)=>
            item!==undefined
        )

        // cloudinary 
        let imagesURL=await Promise.all(
            images.map(async(item)=>{
                let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
        )
        const productData={
            name:name,
            description:description,
            price:Number(price),
            image:imagesURL,
            category:category,
            quantity:quantity,
            date:Date.now(),

        }

        const product=new productModel(productData);
        await product.save();
        res.json({
            success: true,
            message: "Product added successfully",
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: error.message
        });
    }
};

// listProduct
const listProduct=async(req,res)=>{
    try {
        const products=await productModel.find({});
        res.json({
            success:true,
            products:products
        })
    } catch (error) {
        console.error(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}
// removeProduct
const removeProduct=async(req,res)=>{
    try {
        const {id}=req.body;
        await productModel.findByIdAndDelete(id);
        res.json({
            success:true,
            message:"Product removed successfully"
        })
    } catch (error) {
        console.error(error);
        res.json({
            success:false,
            message:error.message
        })
    }

}
// singleProductinfo
const singleProduct=async(req,res)=>{
    try {
        const {id}=req.body;
        const product=await productModel.findById(id);
        res.json({
            success:true,
            product:product
        })
    } catch (error) {
        console.error(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}


export {addProduct,removeProduct,singleProduct,listProduct};