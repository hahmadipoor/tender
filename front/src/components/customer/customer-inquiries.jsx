import React, { useEffect } from "react";
import { useState,useContext } from "react";
import { TenderContext } from "../../context/TenderContext";
import { getAllInquiries } from "../../api/inquiry";
import { acceptOffer } from "../../api/offer";

const CustomerInquiries=()=>{
    const {token}=useContext(TenderContext);
    const [inquiries,setInquiries]=useState([]);

    useEffect(()=>{
        const fetchInquiries=async ()=>{
                const fetchedInquiries=await getAllInquiries(token);
                setInquiries(fetchedInquiries);

        }
        fetchInquiries();
    },[setInquiries,token])
  
    const handleClick=async (offerid)=>{
        const res=await acceptOffer(token,offerid);
        window.location.reload(false);
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
                                    {inquiry.address}
                                    {
                                        inquiry.offers.length &&
                                        inquiry.offers.map((offer)=>(
                                            <div key={offer._id} style={{background:'grey', width:'200px', alignContent:'right', justifyContent:'right'}}>
                                                {offer.bid}
                                                {   
                                                    offer.status==="Pending" &&
                                                        <button onClick={()=>handleClick(offer._id)}>accept</button>
                                                }
                                            </div>
                                        ))
                                    }
                                </div>)
                        })
            }
        </div>
    )
}

export default CustomerInquiries;