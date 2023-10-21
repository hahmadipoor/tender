import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getInquiries } from "../functions/inquiry";
import CustomerNav from "../components/nav/CustomerNav";

const Inqueries = () => {
  const { login } = useSelector((state) => ({ ...state }));
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadInqueries();
  },[]);

  const loadInqueries = () => {
    setLoading(true);
    getInquiries(login.token)
      .then((res)=>{
        setInquiries(res.data);
        setLoading(false);
      });
  }

  const acceptOffer=(inquiryId)=>{
    console.log(inquiryId);
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2"><CustomerNav /></div>
        {loading ? (<div>loading......</div>)
        :
        <div className="col">
          {inquiries.map((i) => (
            <div className="alert alert-secondary" key={i._id}>
              <span className="col-md-2">{i._id}</span>
              <span className="col-md-2">{i.status}</span>
              <button className="col-md-2" disabled={i.status==="Pending"} onClick={()=>acceptOffer(i._id)}>accept</button>
            </div>
          ))}
        </div>
        }
      </div>
    </div>
  );
};

export default Inqueries;
