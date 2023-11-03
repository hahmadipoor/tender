import express,{Request,Response} from "express";
import {body, header} from 'express-validator';
import { validateRequest } from "../middlewares/validate-request";
import { authGuard, isAdmin } from "../middlewares/auth";
import { Cat } from "../models/category";
import { BadRequestError } from "../errors/bad-request-error";
import { SubCat } from "../models/subcat";
import mongoose, { mongo } from 'mongoose';
import {Product} from "../models/product";
import { Inquiry } from "../models/inquiry";
import { InquiryState } from "../types/inquiry-status";
import { UserRole } from "../types/user-role";

const router=express.Router();

router.post('/api/inquiry',
[
    body('pid')
        .isString()
        .withMessage('pid is string'),
],
validateRequest,
authGuard,
async(req,res)=>{
    
    const {pid,address}=req.body;
    let product=await Product.findById(new mongoose.Types.ObjectId(pid))
    if(!product){
        throw new BadRequestError("Cat or subcat not found");
    }
    const inquiry=Inquiry.build({
        product:pid,
        customer:req.user.id,
        status:InquiryState.Pending,
        address:address
    });
    await inquiry.save();
    res.status(200).send(product);
});


router.get('/api/iquiry/all',
    [
        header('Authorization')
            .isString()
            .withMessage('phone number is string'),
    ],
    validateRequest,
    authGuard, 
    async(req,res)=>{
        let inquiries;
        if(req.user.role===UserRole.Customer){
            inquiries=await Inquiry.find({customer:req.user.id}).populate('product').populate('offers');
        }else if(req.user.role===UserRole.Owner){
            inquiries=await Inquiry.find().populate('product').populate('offers');
        }
        res.status(200).send(inquiries);
    }
);

export {router as inquiryRouter}
