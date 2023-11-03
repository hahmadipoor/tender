import React, { useState,useContext } from "react";
import { verifyCode } from "../../api/auth";
import { useHistory } from "react-router-dom";
import { currentUser } from "../../api/user";
import { TenderContext } from "../../context/TenderContext";

const Verify = () => {
  const phone=localStorage["phone"];
  const [code,setCode]=useState("");
  const history=useHistory();
  const {setUser,setToken}=useContext(TenderContext);

  const handleClick=async()=>{
    const {token}=await verifyCode(phone,code);
    localStorage["token"]=token;
    setToken(token);
    const fetchedUser=await currentUser(token);
    setUser(fetchedUser);
    localStorage["user"]=JSON.stringify(fetchedUser);
    history.push("/");
  }

  return (
    <div>
      <h1>Verify</h1>
      <br />
      <input placeholder="123456" onChange={(e)=>{setCode(e.target.value)}}/>
      <button onClick={()=>{handleClick()}}>send</button>
    </div>
  );
};

export default Verify;
