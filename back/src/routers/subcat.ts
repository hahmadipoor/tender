import express,{Request,Response} from "express";
import {body} from 'express-validator';
import { validateRequest } from "../middlewares/validate-request";
import { authGuard, isAdmin } from "../middlewares/auth";
import { Cat } from "../models/category";
import { BadRequestError } from "../errors/bad-request-error";
import { SubCat } from "../models/subcat";
import mongoose from 'mongoose';

const router=express.Router();

router.post('/api/domain/subcat',
[
    body('name')
        .isString()
        .withMessage('phone number is string'),
],
validateRequest,
authGuard,
isAdmin,
async(req,res)=>{
    const {name,parentId}=req.body;
    let cat=await Cat.findById(parentId);
    if(!cat){
        throw new BadRequestError("Cat not found");
    }
    const subcat=SubCat.build({
        name,
        parent:cat
    });
    await subcat.save();
    res.status(200).send(subcat);
});

router.get('/api/domain/subcat/:catid',
async(req:Request,res:Response)=>{
    let subcats;
    const catid=req.params.catid;
    if(catid && catid!=="undefined"){
        subcats=await SubCat.find({
            //parent:mongoose.Types.ObjectId(catid)
            parent:new mongoose.Types.ObjectId(catid)
        }).populate('parent')
    }else{
        subcats=await SubCat.find({});
    }
    res.status(200).send(subcats);
});

export {router as subcatRouter}
