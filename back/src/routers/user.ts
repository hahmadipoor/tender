import express,{Request,Response} from "express";
import {body,header} from 'express-validator';
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { authGuard } from "../middlewares/auth";

const router=express.Router();
router.patch('/api/user/edit-profile',
[
    body('name')
        .optional({ nullable: true, checkFalsy: true })
        .isString()
        .withMessage('name is string'),
    body('role')
        .trim()
        .isString()
        .withMessage('role number is string'),
],
validateRequest,
authGuard,
async(req,res)=>{
    const {name,role}=req.body;
    const user=await User.findById(req.user.id);
    if(role){
        user.role=role;
    }
    if(name){
        user.name=name;
    }
    await user.save();
    res.status(200).send(user);
});

router.get('/api/user/current',
[
    header('Authorization')
        .isString()
        .withMessage('authorization header is string'),
],
validateRequest,
authGuard,
async(req,res)=>{    
    const user=await User.findById(req.user.id);
    console.log(user);
    
    res.status(200).send(user);
});

export {router as userRouter}

