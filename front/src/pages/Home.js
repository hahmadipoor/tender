import React from "react";
import { getProducts } from "../functions/product";
import { useState,useEffect } from "react";
import ProductCard from "../components/cards/ProductCard";
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { currentUser } from '../functions/user';
import { useDispatch } from "react-redux";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const history=useHistory();
  const loginReducer = useSelector((state) => state.login);
  const { token } = loginReducer;
  const userReducer = useSelector((state) => state.user);
  const {user}=userReducer;
  const dispatch=useDispatch();

  useEffect(() => {
    loadAllProducts();
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
  },[dispatch,history,token,user]);

  const loadAllProducts = () => {
    setLoading(true);
    getProducts().then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="container">
        {loading ? (<div>loading......</div>) 
        : (<div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
