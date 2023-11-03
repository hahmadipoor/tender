import axios from "axios";

export const createInquiry = async (token, pid,address) => {
    const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/inquiry`,
        {
            pid,
            address
        },
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return data;
}

export const getAllInquiries = async (token) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/iquiry/all`,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return data;
}
