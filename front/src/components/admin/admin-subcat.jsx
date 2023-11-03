import React, { useEffect } from "react";
import { useState,useContext } from "react";
import { TenderContext } from "../../context/TenderContext";
import { getAllCat } from "../../api/category";
import { addSub, getSubs } from "../../api/subcat";

const AdminSubcat=()=>{
    const [name,setName]=useState("");
    const {token}=useContext(TenderContext);
    let {categories,setCategories}=useContext(TenderContext);
    const [selectedCatId,setSelectedCatId]=useState(null);
    const [subs,setSubs]=useState([]);

    useEffect(()=>{
        const getCategories=async ()=>{
            if(!categories){
                const cats=await getAllCat();
                setCategories(cats)
            }
        }
        getCategories();    
    },[categories,setCategories])
    const handleCatChange=async (catId)=>{
        if(catId==="0"){
            setSubs([]);
        }else{
            const fetchedSubs=await getSubs(catId)
            setSubs(fetchedSubs);
            setSelectedCatId(catId);
        }
    }

    const handleClick=async (selectedCID)=>{
        const newSub=await addSub(token,selectedCID,name);
        setSubs([...subs,newSub]);
        setName("");
    }

    return(
        <div>
            <h1>admin subcat</h1>
            <br />
            { 
                categories && 
                    categories.length>0 && 
                        <select onChange={(e)=>{handleCatChange(e.target.value)}} name="cat">
                            <option value="0" >select category</option>
                            {
                                categories.map((cat)=>{
                                    return (
                                        <option key={cat._id} value={cat._id}>
                                                {cat.name}
                                            </option>)
                                        })
                           }
                        </select>
            }
            &nbsp;&nbsp;
            <input placeholder="subcat name" value={name} onChange={(e)=>{setName(e.target.value)}}  />
            &nbsp;&nbsp;
            <button onClick={()=>handleClick(selectedCatId)}>add</button>
            <br /><br />
            {
                subs.map((sub)=>{
                    return(<div key={sub._id}>
                        {sub.name}
                        </div>)}
                    )
            }
        </div>
    )
}

export default AdminSubcat;