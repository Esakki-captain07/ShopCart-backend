import mongoose from "mongoose"
import productModel from "../model/productModel.js"


const addProduct = async(req,res)=>{
    try {
        let {title,description,images,price} = req.body
        if(!title ||!description  || !images  || !price){
            res.status(400).send({
                message:'All feilds required'
            })
        }
        await productModel.create(req.body)
        res.status(201).send({
            message:'Producted Added Sucessfull'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:"Internel Server"
        })
    }
}


const getAllProducts = async(req,res)=>{
try {
    let products = await productModel.find({})
    if(!products){
        res.status(401).send({
            message:'products not found'
        })
    }else{
        res.status(200).send({
            message:'Products fetched successfull',
            data:products
        })
    }
    
} catch (error) {
    console.log(error)
}
}

const getProductsById = async(req,res)=>{
    try {
        const {productId} = req.params

        if(!mongoose.Types.ObjectId.isValid(productId)){
            return res.status(400).send({
                message:'invalid tour id format'
            })
        }

        console.log('Received productId:', productId);


        const product = await productModel.findById(productId);

        if(!product){
            res.status(400).send({
                message: 'product not found'
            })
        }else{
            res.status(200).send({
                message:'product fetched successfully',
                data:product
            })
        }
    } catch (error) {
        console.error('Error in viewTourById:', error); 
        return res.status(500).send({
            message: error.message || "Internal Server Error",
            error,
        });

    }
}
export default{
    addProduct,
    getAllProducts,
    getProductsById
}