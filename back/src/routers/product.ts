import express,{Request,Response} from "express";
import {body} from 'express-validator';
import { validateRequest } from "../middlewares/validate-request";
import { authGuard, isAdmin } from "../middlewares/auth";
import { Cat } from "../models/category";
import { BadRequestError } from "../errors/bad-request-error";
import { SubCat } from "../models/subcat";
import mongoose, { mongo } from 'mongoose';
import {Product} from "../models/product";

const router=express.Router();

router.post('/api/product',
[
    body('product')
        .notEmpty()
        .withMessage('product is required'),
],
validateRequest,
authGuard,
isAdmin,
async(req,res)=>{
    
    const {name,catid,subid}=req.body.product;
    let cat=await Cat.findById(new mongoose.Types.ObjectId(catid) )
    let subcat=await SubCat.findById(new mongoose.Types.ObjectId(subid));
    if(!cat || !subcat){
        throw new BadRequestError("Cat or subcat not found");
    }
    const product=Product.build({
        name,
        cat:catid,
        sub:subid
    });
    await product.save();
    res.status(200).send(product);
});

router.get('/api/product/all/', 
    async(req:Request,res:Response)=>{
        const catid=req.query.catid;
        const subid=req.query.subid;
        let products;
        if(catid){
            products=await Product.find({
                cat:catid
            }).populate('cat sub');
        }else if(subid){
            products=await Product.find({
                sub:subid
            }).populate('cat sub');
        }else{
            products=await Product.find().populate('cat sub')
        }
        res.status(200).send(products);
    }
);

export {router as productRouter}
