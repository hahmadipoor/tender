import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { createInquiry, getInquiries } from "../../functions/inquiry";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const { Meta } = Card;

const ProductCard = ({ product }) => {
  const loginReducer = useSelector((state) => state.login);
  const { token } = loginReducer;  
  const { name,_id } = product;
  const history=useHistory();
  const createNewInquiry = async () => {
    const res=await createInquiry(_id,token);
    history.push("/customer/dashboard");
  };
  return (
    <Card
      actions={[
        <Link to={`/product/${_id}`}><EyeOutlined className="text-warning" /> <br /> 
          View Product
        </Link>,
        <button onClick={createNewInquiry}> 
            <ShoppingCartOutlined className="text-danger" /> Create Inquiry  
        </button>
      ]}>
      <Meta title={name} />
    </Card>
  );
};

export default ProductCard;
