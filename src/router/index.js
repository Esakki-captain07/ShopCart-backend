import { Router } from "express";
import userRoutes from './userRouter.js'
import productRoutes from './productRouter.js'

const routes = Router()

routes.get('/',(req,res)=>{
    res.status(200).send({
        message:`<h1>Backend Server connected</h1>`
    })
})

routes.use('/user',userRoutes)
routes.use('/product',productRoutes)
export default routes