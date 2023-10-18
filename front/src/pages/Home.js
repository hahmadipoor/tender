import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { currentUser } from '../functions/user';
import { useDispatch } from "react-redux";

const  Home=()=>{

    const history=useHistory();
    const loginReducer = useSelector((state) => state.login);
    const { token } = loginReducer;
    const userReducer = useSelector((state) => state.user);
    const {user}=userReducer;
    const dispatch=useDispatch();
 
    useEffect(()=>{
        if(!token){
            history.push("/login");
        }else if(!user){
            currentUser(token)
                .then((res)=>{
                    const user=res.data;
                    dispatch({
                        type:"CURRENT_USER_SUCCESS",
                        payload:user
                    });
                    localStorage["user"]=JSON.stringify(user);
                }).catch((err)=>{
                console.log(err);
            });
        }
    },[dispatch,history,token,user])
    
    return <div className="App">
            Hello
        </div>
} 
    
export default Home;