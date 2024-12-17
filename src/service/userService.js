import userModel from "../model/userModel.js";
import {hashPassword,hashCompare,createToken} from '../common/auth.js'
import mongoose from "mongoose";

const createUser = async(req,res)=>{
    try {

        let user = await userModel.findOne({email:req.body.email})
        if(!user){
            req.body.password = await hashPassword(req.body.password)
            await userModel.create(req.body)
            res.status(201).send({
                message:`User Created Successfull`
            })
        }else{
            res.status(403).send({
                message:`User already exsists this email ${req.body.email}`
            })

        }
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:"Internel Server"
        })
        
    }
}

const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body

        const user = await userModel.findOne({email})

        if(!user){
            return res.status(400).send({message:'user not found'})
        }
console.log('password :'+ password)
        const isPasswordValid = await hashCompare(password,user.password)
        console.log('user password :'+ user.password)

        
        if(!isPasswordValid){
         return res.status(400).send({message:'invalid Password'})
        }

        const payload = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role:user.role

        }

        const token = await createToken(payload)
        return res.status(200).send({
            message:'login successfull',
            token,
            role:user.role
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:"Internel Server"
        })
    }
}

const getAllUsers = async(req,res)=>{
    try {
        let users = await userModel.find({})
        if(!users){
            res.status(401).send({
                message:'users not found'
            })
        }else{
            res.status(200).send({
                message:'users fetched successfull',
                data:users
            })
        }
        
    } catch (error) {
        console.log(error)
    }
    }


    const getUserById = async(req,res)=>{
        try {

            let {userId} = req.params

            if(!mongoose.Types.ObjectId.isValid(userId)){
                return res.status(403).send({
                    message:'invalid format id'
                })
            }

            const user = await userModel.findById(userId)
            if(!user){
                return res.status(400).send({
                    message : 'no users found'
                })
            }else{
                res.status(200).send({
                    message:'user found successfully',
                    data:user
                })
            }
            
        } catch (error) {
            console.log(error)
        }
    }
export default{
    createUser,
    loginUser ,
    getAllUsers,
    getUserById
}