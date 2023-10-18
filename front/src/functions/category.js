import axios from "axios";

export const getCategories = async () =>{
  const res=await axios.get(`${process.env.REACT_APP_API}/domain/cat`);
  return res;
}

export const getCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);


export const createCategory = async (category, authtoken) =>{
  return await axios.post(`${process.env.REACT_APP_API}/domain/cat`, 
    category, 
    { headers: {Authorization: `Bearer ${authtoken}` }
  });
}
  

export const getCategorySubs = async (_id) =>
    await axios.get(`${process.env.REACT_APP_API}/category/subs/${_id}`);
    