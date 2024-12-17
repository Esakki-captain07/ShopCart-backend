import mongoose from "mongoose";
import 'dotenv/config.js'

const DBURL = `${process.env.MONGODB_URL}/${process.env.MONGODB_DB}`
console.log(DBURL)

mongoose.connect(DBURL)
.then(()=>console.log('mongodb connected'))
.catch((err)=>console.log(err))

export default mongoose