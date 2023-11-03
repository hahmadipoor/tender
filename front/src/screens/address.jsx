import React from "react";
import { useState,useContext } from "react";
import { createInquiry } from "../api/inquiry";
import {TenderContext} from "../context/TenderContext"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Address=()=>{
    const [address,setAddress]=useState("");
    const {token}=useContext(TenderContext);
    const {pid}=useContext(TenderContext);
    const history=useHistory();

    const handleClick=async (address)=>{
        await createInquiry(token,pid,address); 
        history.push('/customer/inquiries');
    }

    return(
        <div>
            <input placeholder="address" value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
            <button onClick={()=>{handleClick(address)}} >Send</button>
        </div>
    )
}

export default Address;