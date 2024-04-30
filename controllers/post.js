import Post from "../models/post.js";
//import users from "../models/auth.js"
//import mongoose from 'mongoose';
import axios from 'axios';

export const createPost = async(req,res)=>{
   const data = req.body;
  // console.log(data)
   const newPost = new Post(data);
   const options = {
    method: 'GET',
    url: 'https://community-purgomalum.p.rapidapi.com/containsprofanity',
    params: {
      text: `${data.desc}`
    },
    headers: {
      'X-RapidAPI-Key': '04a9deb8b0msh1fd03ee4c967522p1d8178jsna1a6da18793e',
      'X-RapidAPI-Host': 'community-purgomalum.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    //console.log(response.data);
    if(response.data === false){
      const savedPost =  await newPost.save();
     res.status(200).json({success:true, Post:savedPost})
    }
  } catch (error) {
    console.error(error);
  }
  // try {
   //  const savedPost =  await newPost.save();
   //  res.status(200).json({success:true, Post:savedPost})
   //} catch (error) {
  //  console.log(error)
  // }
}

export const getAllPost = async(req,res)=>{
   try {
    const posts = await Post.find().sort({createdAt : -1});
      res.status(200).json(posts)
   } catch (error) {
       res.status(500).json(error)
   }
}
export const getUserPost =async(req,res)=>{
    const id = req.params.id;
    try {
        const posts = await Post.find({userId:id})
      res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error) 
    }
}
export const likePost = async(req,res)=>{
    const id = req.params.id
    const {userId} = req.body
    try {
      const post = await Post.findById(id);
      if (post.likes.includes(userId)) {
        await post.updateOne({ $pull:{likes:userId}})
        res.status(200).json("post disliked")
      }else{
        await post.updateOne({$push:{likes:userId}})
        res.status(200).json("Post liked")
      }
    } catch (error) {
      
    }
}

// export const getTimelinePosts = async(req,res)=>{
//     const userId = req.params.id;
//    try {
//     const currentUserPosts = await Post.find({userId:userId})
//     const followingPosts = await users.aggregate([
//        { 
//             $match: {
//               _id: new mongoose.Types.ObjectId(userId),
//             },
//           },
//           {
//             $lookup: {
//               from: "posts",
//               localField: "following",
//               foreignField: "userId",
//               as: "followingPosts",
//             },
//           },
//           {
//             $project: {
//               followingPosts: 1,
//               _id: 0,
//             },
//           },
//     ])
//     res.status(200).json(
//         currentUserPosts
//           .concat(...followingPosts[0].followingPosts)
//           .sort((a, b) => {
//             return new Date(b.createdAt) - new Date(a.createdAt);
//           })
//       );
//    } catch (error) {
//     res.status(500).send(error)
//     //console.log(error)
//    }
// }