import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'

import userRoutes from './routes/users.js';
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'
import otpRoutes from './routes/Otp.js'
import subRoutes from './routes/Subscription.js'
import postRoutes from './routes/post.js';
import uploadRoutes from './routes/Upload.js'


const app =express();
dotenv.config();
app.use(express.json({limit:"30mb" , extended :true}))// it will read in json format, it will give the req
app.use(express.urlencoded({limit:"30mb" ,extended:true}))
app.use(cors());

// to serve images inside public folder
app.use(express.static('public')); 
app.use('/images', express.static('images'));


app.get ('/',(req,res)=>{
    res.send("This is a stack overflow clone API")
})
 app.use('/user',userRoutes)
 app.use('/questions',questionRoutes)
 app.use('/answer',answerRoutes)

 app.use('/otp',otpRoutes);

 app.use('/subscription', subRoutes)

 app.use('/posts',postRoutes)
 app.use('/upload', uploadRoutes)





const PORT = process.env.PORT || 5000

const DATABASE_URL= process.env.CONNECTION_URL

mongoose.connect(DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology:true})
  .then(()=> app.listen(PORT,()=>{console.log(`server running on port ${PORT}`)}))
  .catch((err)=>console.log(err.message))