import express from 'express';
import { createPost, getAllPost,getUserPost,likePost} from '../controllers/post.js'

const router = express.Router();

router.post('/', createPost);
router.get('/getAllPost', getAllPost);
router.get('/:id', getUserPost);
router.put('/:id/like', likePost)
export default router;

