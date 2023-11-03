import express,{Request,Response} from "express";
import {body, header} from 'express-validator';
import { validateRequest } from "../middlewares/validate-request";
import { authGuard, isAdmin, isAdminOrOwner } from "../middlewares/auth";
import { Cat } from "../models/category";
import { BadRequestError } from "../errors/bad-request-error";
import { SubCat } from "../models/subcat";
import mongoose, { mongo } from 'mongoose';
import {Product} from "../models/product";
import { Inquiry } from "../models/inquiry";
import { InquiryState } from "../types/inquiry-status";
import { Offering, OfferingDoc } from '../models/offering';
import { OfferingState } from "../types/offering-status";
import { UserRole } from "../types/user-role";

const router=express.Router();

router.post('/api/offering',
[
    body('inquiryid')
        .isString()
        .withMessage('inquiry id is string'),
    body('bid')
        .isNumeric()
        .withMessage('bid is number'),
],
validateRequest,
authGuard,
isAdminOrOwner,
async(req,res)=>{
    const {inquiryid,bid}=req.body;
    let inquiry=await Inquiry.findById(new mongoose.Types.ObjectId(inquiryid))
    if(!inquiry){
        throw new BadRequestError("Cat or subcat not found");
    }
    const offering=Offering.build({
        inquiry:inquiryid,
        owner:req.user.id,
        status:OfferingState.Pending,
        bid:bid
    });
    await offering.save();
    inquiry.offers.push(offering);
    inquiry.status=InquiryState.AnsweredByOwner;
    await inquiry.save();
    res.status(200).send(offering);
});

router.get('/api/offering/all',
    [
        header('Authorization')
            .isString()
            .withMessage('phone number is string'),
    ],
    validateRequest,
    authGuard, 
    async(req,res)=>{
        let offerings;
        if(req.user.role===UserRole.Customer){
            offerings=await Offering.find({'inquiry.customer':req.user.id}).populate({
                path : 'inquiry',
                populate : {
                    path : 'product'
                }
            });
        }else if(req.user.role===UserRole.Owner){
            offerings=await Offering.find({owner:req.user.id}).populate({
                path : 'inquiry',
                populate : {
                    path : 'product'
                }
            });
        }else{
            offerings=await Offering.find().populate({
                path : 'inquiry',
                populate : {
                    path : 'product'
                }
            });
        }
        res.status(200).send(offerings);
    }
);

router.patch('/api/offering/:id',
    [
        body('status')
          .isString()
          .withMessage('state should be accepted or sent'),
    ],
    validateRequest,
    authGuard, 
    async(req,res)=>{
        const offeringId=req.params.id;
        const status=req.body.status;
        let offering:OfferingDoc;
        if(req.user.role===UserRole.Customer){
            offering=await Offering.findOne({
                '_id':offeringId
            });
            offering.status=status;
            await offering.save();            
        }else if(req.user.role===UserRole.Owner){
            offering=await Offering.findOne({
                '_id':offeringId,
                'owner':req.user.id
            });
            offering.status=status;
            await offering.save();
        } 
        res.status(200).send(offering);
    }
);

export {router as offeringRouter}
