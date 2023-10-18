import { useEffect, useState } from "react";
import { verify } from "../functions/auth";
import VerifyForm from "../components/forms/Verify";
//import { useNavigate } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const  Verify=()=>{
    const [code,setCode]=useState("");
    const [phone,setPhone]=useState("");
    //const navigate=useNavigate();
    const history=useHistory();
    const dispatch=useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setPhone(localStorage["phone"]);
    },[])
    

    const handleSubmit= async (e)=>{
        e.preventDefault();
        setLoading(true);
        const {data}=await verify(phone, code);
        setLoading(false);
        dispatch(
            {
                type:"LOGIN_SUCCESS",
                payload:data
            }
        )
        localStorage.removeItem("phone");
        localStorage["token"]=data.token;
        history.push("/");
    }
    return loading?
            (<div>...loading</div>)
            :
            (<div className="App">
                <VerifyForm setCode={setCode} handleSubmit={handleSubmit} />
            </div>)
    
} 
    
export default Verify;
