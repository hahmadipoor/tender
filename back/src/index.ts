
import mongoose from 'mongoose';
import { app } from './app';
import * as dotenv from "dotenv";

const start=async ()=>{
    console.log("Starting the Auth service .....");
    dotenv.config();
    if(!process.env.JWT_KEY){
        throw new Error('JWT_KEY must be defined')
    }
    if(!process.env.MONGO_URI){
        throw new Error('MONGO_URI must be defined')
    }

    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDb");
    }catch(err){
        console.error(err);
    }

    app.listen(4000,()=>{
        console.log("Auth service-- listening on port 4000");
    });    
};

start();


