import axios from "axios";

export const addProduct = async (token, name,catid,subid) => {
    const product={
        name:name,
        catid:catid,
        subid:subid
    }
    const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/product`,
        {
            product
        },
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return data;
}

export const getAllProducts = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/product/all`);
    return data;
}
