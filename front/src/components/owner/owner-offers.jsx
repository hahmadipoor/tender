import React, { useEffect } from "react";
import { useState,useContext } from "react";
import { TenderContext } from "../../context/TenderContext";
import { getAllOffers } from "../../api/offer";

const OwnerOffers=()=>{
    const {token}=useContext(TenderContext);
    const [offers,setOffers]=useState([]);

    useEffect(()=>{
        const fetchOffers=async ()=>{
                const fetchedOffers=await getAllOffers(token);
                setOffers(fetchedOffers);
                }
        fetchOffers();
    },[setOffers,token])
  
  
    return(
        <div>
            <h1>Offers</h1>
            <br />
            { 
                offers && 
                    offers.length>0 && 
                        offers.map((offer)=>{
                            return (
                                <div key={offer._id}>
                                    {offer._id}&nbsp;&nbsp;{offer.status}
                                </div>)
                        })
            }
        </div>
    )
}

export default OwnerOffers;