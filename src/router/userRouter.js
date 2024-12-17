import { Router } from "express";
import userService from "../service/userService.js";
import {verifyAdmin,verify} from '../middleware/verify.js'



const routes = Router()

routes.post('/create',userService.createUser)
routes.post('/login',userService.loginUser)
routes.get('/all-users',verify,userService.getAllUsers)
routes.get('/view-user/:userId',verify,verifyAdmin,userService.getUserById)



export default routes