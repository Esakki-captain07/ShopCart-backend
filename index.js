import express from 'express'
import 'dotenv/config.js'
import routes from './src/router/index.js'
import cors from 'cors'


const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.use(cors())
app.use(routes)


app.listen(PORT,()=>console.log(`server is listerning on port ${PORT}`))