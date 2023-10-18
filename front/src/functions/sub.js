import axios from "axios";

export const getSubs = async (catId) =>{
  return await axios.get(`${process.env.REACT_APP_API}/domain/subcat/${catId}`);
}

export const createSub = async (sub, authtoken) =>{
  return await axios.post(`${process.env.REACT_APP_API}/domain/subcat`, 
    sub, 
    { headers: {Authorization: `Bearer ${authtoken}` }}
  );
}
  
