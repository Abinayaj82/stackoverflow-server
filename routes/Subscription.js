import express from 'express';
import { order ,verifyOrder ,checkSubscription} from '../controllers/Subscription.js';
import auth from '../middlewares/auth.js'

const router = express.Router();

router.post('/order',auth, order);
router.post('/verify-Order',auth,verifyOrder);
router.post('/check-Subscription/:userId',auth,checkSubscription)

export default router
