import { useEffect, useState } from "react";
import LoginForm from "../components/forms/Login";
import { login } from "../functions/auth";
import { useHistory } from "react-router-dom";

const  Login=()=>{
    const [phone,setPhone]=useState("");
    const history=useHistory();

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const {data}=await login(phone);
        localStorage["phone"]=phone;
        history.push("/verify");
    }
    return (
        <div className="App">
            <LoginForm setPhone={setPhone} handleSubmit={handleSubmit} />
        </div>
    )
} 
    
export default Login;