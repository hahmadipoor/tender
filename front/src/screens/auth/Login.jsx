import React, { useState } from "react";
import { sendPhone } from "../../api/auth";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [phone,setPhone]=useState("");
  const history=useHistory();

  const handleClick=async ()=>{
    const {code}=await sendPhone(phone)
    console.log(code);
    localStorage["phone"]=phone;
    history.push("/verify")
  }
  return (
    <div>
        <h1>login</h1>
        <br />
        <input placeholder="091xxxxxxxx" onChange={(e)=>setPhone(e.target.value)}/>
        <button onClick={handleClick}>send</button>
    </div>
  );
};

export default Login;
