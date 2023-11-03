import axios from "axios";

export const sendPhone=async (phone)=>{
    const {data}= await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        {
            phone
        }
      );
    return data;
}

export const verifyCode=async (phone,code)=>{
    const {data}= await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/verify`,
        {
            phone,
            code
        }
      );
    return data;
}
