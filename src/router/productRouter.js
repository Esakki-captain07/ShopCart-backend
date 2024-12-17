import productService from "../service/productService.js";
import { Router } from "express";
import {verifyAdmin,verify} from '../middleware/verify.js'


const routes = Router()

routes.post('/add',verify,verifyAdmin,productService.addProduct)
routes.get('/all-products',productService.getAllProducts)
routes.get('/view-product/:productId',verify,productService.getProductsById)

export default routes