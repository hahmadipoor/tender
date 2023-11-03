import React,{useContext } from "react";
import { TenderContext } from "../context/TenderContext";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Header = () => {
  const { token } = useContext(TenderContext);
  const {user,setUser,setToken}=useContext(TenderContext);
  const history=useHistory();

  const handleClick=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    history.push("/login");
  }

  return (
    <div className="container">
      <Link to="/" >Tender</Link>
      &nbsp;&nbsp;
      {
        !token && <Link to="/login">Login</Link>
      }
      &nbsp;&nbsp;
      {
        token && <a href="/login" onClick={()=>handleClick()} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer'}}>Sign Out</a>
      }
      &nbsp;&nbsp;
      {
        token && user && user.role==="Admin" && <Link to="/admin/dashboard">Dashboard</Link>
      }
      &nbsp;&nbsp;
      {
        token && user && user.role==="Customer" && <Link to="/customer/dashboard">Dashboard</Link>
      }
        &nbsp;&nbsp;
      {
        token && user && user.role==="Owner" && <Link to="/owner/dashboard">Dashboard</Link>
      }

      &nbsp;&nbsp;
      {
        user && user.phone
      }          
    </div>
  );
};

export default Header;
