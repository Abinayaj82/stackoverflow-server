import mongoose from 'mongoose'
 
const otpSchema = mongoose.Schema({
    email : {type:String, required:true},
    code:{type:String,required:true},
    expiresIn:{type:Number}
},{
    timeStamps :true
})

export default mongoose.model("otp",otpSchema)