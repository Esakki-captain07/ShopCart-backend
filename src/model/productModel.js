import mongoose from "./index.js";

const productSchema = new mongoose.Schema({
    productId: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true 
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    }, category: {
        type: String,
        trim: true,
    },
    brand: {
        type: String,
        required: true,
        trim: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0, 
    },
    rating: {
        average: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
        count: {
            type: Number,
            default: 0, 
        },
    },
    images:{
        type:String,
        required:true
    },createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
},{
    collection:'product',
    versionKey:false
})

const productModel = mongoose.model('product',productSchema)

export default productModel

