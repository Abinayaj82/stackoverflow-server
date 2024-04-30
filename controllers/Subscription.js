import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import users from '../models/auth.js'
import crypto from 'crypto';


dotenv.config();

const razorpay = new Razorpay({
    key_id :process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
})
export const order = async (req,res) =>{
    let options = {
        amount : Number(req.body.amount * 100),
        currency:'INR',
        receipt:'order_rcptid_11',
    }
    try {
        const order = await razorpay.orders.create(options);
        console.log(order);
        res.json({
            success:true,
            order,
        })
    } catch (error) {
        res.status(500).json({error :"Something went wrong"})
    }
}
export const verifyOrder = async (req,res) =>{
    console.log(req.body);
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature} =req.body.id.response;
    const _id = req.body.id.id;
    const amount =req.body.id.amount;
    try{
        const hmac = crypto.createHmac('sha256', process.env.KEY_SECRET);
       hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
       const generatedSignature = hmac.digest('hex'); 
       if(generatedSignature === razorpay_signature){
            if(amount === 100){
                const user = await users.findByIdAndUpdate(_id,{
                    subscription:'Silver',
                    subscriptionExpire :new Date().getTime() +30 *24 *60 *60 *1000
                });
                res.status(200).json({
                    success :true,
                    result:user
                })
            }else if(amount === 1000){
                const user = await users.findByIdAndUpdate(_id,{
                    subscription:'Gold',
                    subscriptionExpire: new Date().getTime() + 30 * 24 * 60 * 60 * 1000
                });
                res.status(200).json({
                    success:true,
                    result:user
                })
            }else{
                console.log('subscription amount is incorrect')
            }

       }else{
        res.status(400).json({
            success:false,
        })
       }
    }catch(err){
        console.log(err)
    }
}
export const checkSubscription = async (req,res) =>{
    try {
        const {userId : _id} =req.params;
        const user = await users.findById(_id);
        if(user.subscription === 'Silver' || user.subscription === 'Gold'){
            let currentTime = new Date.getTime();
            const diff = user.subscriptionExpire - currentTime;
            if(diff < 0){
                const newUser = await users.findById(_id,{
                    subscription : 'Free',
                    subscriptionExpire : 0,
                })
                res.status(200).json({subs :'Free',newUser})
            }else{
                res.status(200).json({ subs: 'same' });
            }
        }else{
            res.status(200).json({ subs: 'same' });
        }
    } catch (error) {
        console.log(error)
    }
}