import {decodeToken} from '../common/auth.js'
import userModel from '../model/userModel.js'

export const verify = async(req,res,next)=>{
    try {
        const token = await req.headers.authorization?.split(' ')[1]
        console.log('midleware',token)
if(token){
    let payload = await decodeToken(token)
    if(payload.exp>Math.floor(Date.now()/1000)){
        req.userId = payload._id
        next()
    }else{
        res.status(400).send({
            message:'Token Expired'
        })
    }

}else{
    res.status(403).send({
        message:'Invalid Token'
    })
}
        
    } catch (error) {
        console.log(error)
    }
}

export const verifyAdmin =  async(req,res,next)=>{
    try {
        let token = await req.headers.authorization?.split(' ')[1]
        console.log('midleware token',token)

        if(token){
            let payload = await decodeToken(token)
            console.log(payload)
            let user = await userModel.findById(payload._id)

            if(user && payload.role === 'admin' && user.role === payload.role){
                next()
            }
        }else{
            res.status(400).send({
                message:'Token Expired'
            })
        }
    } catch (error) {
        console.log(error)
    }
}

