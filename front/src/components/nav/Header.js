import React, { useState } from "react";
import { Menu } from "antd";
import { AppstoreOutlined, ShoppingOutlined,} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
const { Item } = Menu;

const Header = () => {
  const loginReducer = useSelector((state) => state.login);
  const {token}=loginReducer;
  const userReducer = useSelector((state) => state.user);
  const {user}=userReducer;
  const history=useHistory();
  const dispatch=useDispatch();

  const [current, setCurrent] = useState("home");
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user")
    dispatch(
      {
          type:"LOGOUT_SUCCESS",
      }
    );
    window.location.reload(false);
  }

  const dashboard=()=>{
    if(user && user.role==="Admin"){
      history.push("/admin/dashboard")
    }else if(user && user.role==="Customer"){
      history.push("/customer/dashboard")
    }else if(user && user.role==="Owner"){
      history.push("/owner/dashboard")
    }else{
      history.push("/")
    }
  }

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}><Link to="/">Home</Link></Item>
      {!token && <Item key="login" icon={<ShoppingOutlined />}><Link to="/login">Login</Link></Item>}
      {token && <Item key="logout" icon={<ShoppingOutlined />} onClick={logout}>Logout</Item>}
      {user && <Item key="dashboard" icon={<ShoppingOutlined />} onClick={dashboard}>Dashboard</Item>}
    </Menu>
  );
};

export default Header;