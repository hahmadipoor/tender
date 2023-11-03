import axios from "axios";

export const addCat = async (token, name) => {
    const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/domain/cat`,
        {
            name
        },
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return data;
}

export const getAllCat = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/domain/cat`);
    return data;
}
