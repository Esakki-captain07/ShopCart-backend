import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


export const hashPassword = async(password)=>{
   try {
    let salt = await bcrypt.genSalt(Number(process.env.SALT))
    let hashedPassword = await bcrypt.hash(password,salt)
    return hashedPassword
   } catch (error) {
    throw error
   }
}

export const hashCompare = async(password,hashedPassword)=>{
try {
    return await bcrypt.compare(password,hashedPassword)
    
} catch (error) {
    throw error
}
}

export const createToken = async(payload)=>{
    try {
return await jwt.sign(payload,process.env.JWT_SERECT_KEY,{expiresIn:'1d'})
    } catch (error) {
        throw error
    }
}

export const decodeToken = async(token)=>{
    try {
        const decodeToken = await jwt.verify(token,process.env.JWT_SERECT_KEY)
        return decodeToken
    } catch (error) {
        throw error
    }
}