import axios from "axios";

export const createOffer = async (token, inquiryid,bid) => {
    const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/offering`,
        {
            inquiryid,
            bid
        },
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return data;
}

export const getAllOffers = async (token) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/offering/all`,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return data;
}

export const acceptOffer = async (token, offerid) => {
    const { data } = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/offering/${offerid}`,
        {
            status:"AcceptedByCustomer"
        },
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return data;
}