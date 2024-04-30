import express from 'express';

import { sendotp, verifyotp} from '../controllers/Otp.js';

const router = express.Router();

router.post('/send-otp',sendotp);
router.post('/verify-otp',verifyotp);

export default router;
