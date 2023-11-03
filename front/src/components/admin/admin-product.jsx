import React from "react";
import { useState,useContext } from "react";
import { TenderContext } from "../../context/TenderContext";
import { getAllCat } from "../../api/category";
import { getSubs } from "../../api/subcat";
import { addProduct } from "../../api/product";
import { useEffect } from "react";

const AdminProduct=()=>{
    const [name,setName]=useState("");
    const {token}=useContext(TenderContext);
    const {categories,setCategories}=useContext(TenderContext);
    const [selectedCatId,setSelectedCatId]=useState("0");
    const [selectedSubId,setSelectedSubId]=useState("0")
    const [subs,setSubs]=useState([]);
    const [products,setProducts]=useState([]);

    useEffect(()=>{
        const fetchCats=async ()=>{
            if(!categories){
                const cats=await getAllCat();
                setCategories(cats);
            }
        }
        fetchCats();
    },[categories,setCategories])
  
    const handleCatChange=async (catid)=>{
        setSelectedCatId(catid);
        const fetchedSubs=await getSubs(catid);
        setSubs(fetchedSubs)
        setProducts([]);
    }

    const handleSubChange=async (subid)=>{
        setSelectedSubId(subid);
    }

    const handleClick=async (selectedCatId,selectedSubId)=>{
        const newProduct=await addProduct(token,name,selectedCatId,selectedSubId);
        setProducts([...products,newProduct]);
        setName("");
    }

    return(
        <div>
            <h1>admin product</h1>
            <br />
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
            { 
                subs && 
                    subs.length>0 && 
                        <select onChange={(e)=>{handleSubChange(e.target.value)}} name="cat">
                            <option value="0" >select sub</option>
                            {
                                subs.map((cat)=>{
                                    return (
                                        <option key={cat._id} value={cat._id}>
                                                {cat.name}
                                            </option>)
                                        })
                           }
                        </select>
            }
            <br /><br />
            <input placeholder="product name" value={name} onChange={(e)=>{setName(e.target.value)}}  />
            <button onClick={()=>handleClick(selectedCatId,selectedSubId)}>add Product</button>
            <br /><br />
            {
                products && products.length>0 && products.map((p)=><div key={p._id}>{p.name}</div>)
            }
        </div>
    )
}

export default AdminProduct;