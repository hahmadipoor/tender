import express,{Request,Response} from "express";
import {body} from 'express-validator';
import { validateRequest } from "../middlewares/validate-request";
import { authGuard, isAdmin } from "../middlewares/auth";
import { Cat } from "../models/category";
import { BadRequestError } from "../errors/bad-request-error";

const router=express.Router();

router.post('/api/domain/cat',
[
    body('name')
        .isString()
        .withMessage('phone number is string'),
],
validateRequest,
authGuard,
isAdmin,
async(req,res)=>{
    const {name}=req.body;
    let existingCat=await Cat.findOne({name});
    if(existingCat){
        throw new BadRequestError("Cat Already exists");
    }
    const cat=Cat.build({name});
    await cat.save();
    res.status(200).send(cat);
});

router.get('/api/domain/cat',
async(req,res)=>{
    const cats=await Cat.find();
    res.status(200).send(cats);
});



export {router as catRouter}
