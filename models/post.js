import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
   userId : {type:String,required:true},
   name:{type:String,required:true},
   desc :{type:String},
   likes:{type : [String],default:[]},
   image: String,
   video: String,
   createdAt:{
    type:Date,
    default:Date.now
   },
},
   {
    timestamps:true
   }
)

export default mongoose.model("Post", postSchema)