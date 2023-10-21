import axios from "axios";

export const createProduct = async (product, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, 
    {product}, 
    { headers: {Authorization: `Bearer ${authtoken}` }}
);

export const getProductsByCount = async (count) =>{
    return await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
}

export const getProduct = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

export const getProducts = async () =>
   await axios.get(`${process.env.REACT_APP_API}/product/all`);


