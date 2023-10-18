import axios from "axios";

export const login = async (phone) =>{
  return await axios.post(
    `${process.env.REACT_APP_API}/auth/login`,
    { phone },
  );
}

export const verify = async (phone,code) =>{
  return await axios.post(
    `${process.env.REACT_APP_API}/auth/verify`,
    { 
      phone,
      code 
    }
  );
}

