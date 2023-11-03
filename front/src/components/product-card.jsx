import React from "react";

const ProductCard=({product,handleClick})=>{
    const {_id,name,cat,sub}=product;

    return(
        <div style={{background:'#e8b8d8', margin:'1rem'}}>
            {name}
            <br />
            {cat.name}
            <br />
            {sub.name}
            <br />
            <button onClick={()=>{handleClick(_id)}}>create inquiry</button>
        </div>
    )
}

export default ProductCard;

