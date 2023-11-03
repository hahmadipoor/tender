import React, { useEffect, useState,useContext } from "react";
import { Route } from "react-router-dom";
import { TenderContext } from "../../context/TenderContext";

const AdminRoute = ({ children, ...rest }) => {
  const { token,user } = useContext(TenderContext);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && token) {
          setOk(true);
    }else{
      setOk(false);
    }  
  }, [user,token]);

  return ok ? <Route {...rest} /> : <h1>loading...</h1>;
};

export default AdminRoute;
