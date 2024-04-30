import otp from '../models/Otp.js';
import users from '../models/auth.js';
import *  as nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port:587,
    secure:true,
    auth:{
        user:process.env.MAIL_USERNAME,
        pass:process.env.MAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
      }
})

export const sendotp = async (req,res)=>{
   const { userId,email} =req.body;

   try {
      const existinguser =await users.findById(userId);
      if(!existinguser){
        return res.status(404).json({message:"User doesn't exist"})
      }else{
        const otpCode =Math.floor((Math.random()*100000)+1);
        const otpData =new otp({
            email:email,
            code:otpCode,
            expireIn:new Date().getTime() +300 *1000
        })
        const otpResponse =await otpData.save();
             let info = await transporter.sendMail({
                from :'abinayasan68@gmail.com',
                to:email,
                subject:'OTP verification',
                html:`
                <div class ='container'>
                <h1>${otpCode}</h1>
                </div>
                 `

             })
             res.status(200).json({success:true},otpResponse,info)
      }
   } catch (error) {
      res.status(500).json("something went wrongsss...");
      console.log(error)
   }

}
export const verifyotp = async(req,res)=>{
   const {email,code} =req.body;
   console.log(req.body)
   try {
     const existinguser = await otp.find({email:email, code:code})
     if(existinguser.length === 0){
        return res.status(200).json({message:'code not found', verified:false})
     }else{
        let currentTime =new Date().getTime()
        let diff = existinguser.expireIn - currentTime;
            if(diff < 0){
                res.status(200).json({message: "otp has expired", verified: false});
            } else {
                res.status(200).json({verified: true});
            }
     }
   } catch (error) {
    res.status(500).json('Verification of OTP is wrong');
    console.log(error);
   }
}
