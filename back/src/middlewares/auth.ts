import jwt from "jsonwebtoken";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { User } from "../models/user";
import { UserRole } from "../types/user-role";
import { header } from 'express-validator';

const authGuard = async (req, res, next) => {
    try{
      const tokenArray=req.headers.authorization.split(" ");
      const token = tokenArray[1];
      const payload=jwt.verify(token,process.env.JWT_KEY);
      const user=await User.findById(payload);
      req.user=user;
      next();
    }catch{
      throw new NotAuthorizedError();
    } 
};

const isAdmin = (req, res, next) => {
  if(req.user.role===UserRole.Admin){
    next();
  }else{
    throw new NotAuthorizedError();  
  }
};

const isOwner = async (req, res, next) => {
  if(req.user.role===UserRole.Owner){
    next();
  }else{
    throw new NotAuthorizedError();  
  }
};

const isAdminOrOwner = async (req, res, next) => {
  if(req.user.role===UserRole.Admin || req.user.role===UserRole.Owner){
    next();
  }else{
    throw new NotAuthorizedError();  
  }
};


export {authGuard,isAdmin,isOwner,isAdminOrOwner}