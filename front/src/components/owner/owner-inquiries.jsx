import React, { useEffect } from "react";
import { useState,useContext } from "react";
import { TenderContext } from "../../context/TenderContext";
import { getAllInquiries } from "../../api/inquiry";
import { createOffer } from "../../api/offer";
import { useHistory } from "react-router-dom";

const OwnerInquiries=()=>{
    const {token}=useContext(TenderContext);
    const [inquiries,setInquiries]=useState([]);
    const [bid,setBid]=useState(0);
    const history=useHistory();
    const {user}=useContext(TenderContext);

    useEffect(()=>{
        const fetchInquiries=async ()=>{
                const fetchedInquiries=await getAllInquiries(token);
                console.log(fetchedInquiries);
                setInquiries(fetchedInquiries);
                }
        fetchInquiries();
    },[setInquiries,token])
  
    const handleClick=async (bid,inquiryid)=>{
        const createdOffer=await createOffer(token,bid,inquiryid);
        history.push("/owner/offers");
    }
  
    return(
        <div>
            <h1>Inquiries</h1>
            <br />
            { 
                inquiries && 
                    inquiries.length>0 && 
                        inquiries.map((inquiry)=>{
                            return (
                                <div key={inquiry._id}>
                                    {inquiry._id}&nbsp;&nbsp;
                                    {inquiry.status}&nbsp;&nbsp;
                                    {inquiry.product.name}&nbsp;&nbsp;
                                    {
                                        inquiry.offers.find((offer)=>offer.owner===user._id) && 
                                        (inquiry.offers.find((offer)=>offer.owner===user._id)).bid &&
                                        <span>
                                            {
                                                (inquiry.offers.find((offer)=>offer.owner===user._id)).status==="AcceptedByCustomer" &&
                                                <button>Deliver</button>
                                            }
                                        </span>
                                    }
                                    { 
                                        !(inquiry.offers.find((offer)=>offer.owner===user._id))&&
                                        <span >
                                            <input type="number" onKeyUp={(e)=>{setBid(e.target.value)}}/> 
                                            <button onClick={()=>handleClick(inquiry._id, bid)}>create Offer</button> 
                                        </span>    
                                    }
                                </div>)
                        })
            }
        </div>
    )
}

export default OwnerInquiries;