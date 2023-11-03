import React, { useEffect } from "react";
import { useState,useContext } from "react";
import { TenderContext } from "../../context/TenderContext";
import { getAllCat,addCat } from "../../api/category";

const AdminCat=()=>{
    const [name,setName]=useState("");
    const {token}=useContext(TenderContext);
    const {categories,setCategories}=useContext(TenderContext);

    useEffect(()=>{
        const fetchCats=async ()=>{
            if(!categories){
                const cats=await getAllCat();
                setCategories(cats);
            }
        }
        fetchCats();
    },[categories,setCategories])
  
    const handleClick=async ()=>{
        const newCat=await addCat(token,name);
        setCategories([...categories,newCat]);
    }

    return(
        <div>
            <h1>admin cat</h1>
            <input placeholder="cat name" onChange={(e)=>{setName(e.target.value)}}  />
            <button onClick={handleClick}>add category</button>
            <br />
            <br />
            { 
                categories && 
                    categories.length>0 && 
                        categories.map((cat)=>{
                            return (<div key={cat._id}>{cat.name}</div>)
                        })
            }
        </div>
    )
}

export default AdminCat;