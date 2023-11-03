import axios from "axios";

export const addSub = async (token,catId ,name) => {
    const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/domain/subcat`,
        {
            name,
            parentId:catId
        },
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return data;
}

export const getSubs = async (catId) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/domain/subcat/${catId}`);
    return data;
}



