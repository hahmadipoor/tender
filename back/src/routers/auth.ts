import express,{Request,Response} from "express";
import {body} from 'express-validator';
import { BadRequestError } from "../errors/bad-request-error";
import { Verification } from "../models/verification";
import jwt from 'jsonwebtoken';
import { validateRequest } from "../middlewares/validate-request";
import { NotFoundError } from "../errors/not-found-error";
import { User } from "../models/user";

const router=express.Router();
router.post('/api/auth/login',
[
    body('phone')
        .trim()
        .notEmpty()
        .withMessage('phone number is required'),
],
validateRequest,
async(req:Request,res:Response)=>{
    const {phone}=req.body;
    const code="123456";
    const verificationCode=Verification.build({
        phone,
        code
    });
    await verificationCode.save();
    res.status(200).send(verificationCode);
});

router.post('/api/auth/verify',
[
    body('phone')
        .trim()
        .notEmpty()
        .withMessage('phone number is required'),
    body('code')
        .trim()
        .notEmpty()
        .withMessage('phone number is required'),    
],
validateRequest,
async(req:Request,res:Response)=>{
    let user;
    const {phone,code}=req.body;
    const verification=await Verification.findOne({
        phone,
        code
    });
    if(! verification){
        throw new NotFoundError();
    }
    user=await User.findOne({phone});
    if(!user){
        user=User.build({phone});
        await user.save();    
    }
    const token=jwt.sign(user.id,process.env.JWT_KEY);
    res.status(200).send({
        token,
        user
    });
});

export {router as authRouter}
