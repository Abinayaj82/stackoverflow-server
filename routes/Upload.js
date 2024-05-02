import express from 'express';
import multer from 'multer';
import cloudinary from '../utils/cloudinary.js';
import Post from '../models/post.js';

const router = express.Router();

  const storage = multer.diskStorage({
    //destination: (req, file, cb) => {
      //cb(null, "public/images");
   // },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
const upload = multer({ storage: storage });


router.post('/',upload.single('file'), async(req,res)=>{
  console.log(req.body)
  try {
    //const id = req.params.id;
    const {userId:_id} =req.params;
    const result = await cloudinary.uploader.upload(req.file.path)
    console.log(result)
   const data ={
     avatar: result.secure_url,
     cloudinary_id: result.public_id,
    }
    let post = await Post.updateMany(_id , data ,
      {new:true}
     
  );
   

    res.status(200).json(post);
    
    //return res.status(200).json("File uploaded successfully")
  } catch (error) {
     console.log(error)
  }
})



export default router;
