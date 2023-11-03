import React from "react";
import { useEffect,useState,useContext } from "react";
import { getAllProducts } from "../api/product";
import ProductCard from "../components/product-card";
//import { createInquiry } from "../api/inquiry";
import {TenderContext} from "../context/TenderContext"
import {useHistory} from 'react-router-dom';

const Home = () => {
  const [products,setProducts]=useState([]);
  //const {token}=useContext(TenderContext);
  const history=useHistory();
  const {setPid}=useContext(TenderContext);

  useEffect(()=>{
    const fetchProducts=async()=>{
      const fetchedProducts=await getAllProducts();
      setProducts(fetchedProducts)
    }
    fetchProducts();
  },[])

  const handleClick=async (pid)=>{
    // await createInquiry(token,pid); 
    // history.push('/customer/inquiries');
    setPid(pid);
    history.push('/address');
  }

  return (
    <div>
    <div style={{display: 'flex',flexWrap:'wrap', justifyContent: 'space-between', alignItems:'center'}}>
      <br />
      {
        products && 
          products.length>0 &&
            products.map((product)=>(
                <ProductCard key={product._id} product={product} handleClick={handleClick}/>
            ))
      }
    </div>
    </div>

  );
};

export default Home;
