import React, { useEffect, useState } from "react";
import { Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../functions/auth";

const AdminRoute = ({ children, ...rest }) => {
  const userReducer = useSelector((state) => state.user);
  const {user}=userReducer;
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.role==="Admin") {
          setOk(true);
    }
    else{
      setOk(false);
    } 
  }, []);

  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
