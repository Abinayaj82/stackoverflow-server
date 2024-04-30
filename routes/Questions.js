import express from 'express';

import { AskQuestion,getAllQuestions,deleteQuestion,voteQuestion, askedQuestions} from '../controllers/Questions.js'
import auth from '../middlewares/auth.js'

const router=  express.Router()

 router.post('/Ask', auth, AskQuestion)
 router.get('/get', getAllQuestions)
router.delete('/delete/:id', auth, deleteQuestion)
router.patch('/vote/:id', auth, voteQuestion);
router.get('/asked-questions/:id',auth,askedQuestions)

 export default router; 