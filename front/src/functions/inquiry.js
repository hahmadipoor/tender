import axios from "axios";

export const createInquiry = async (pid, authtoken) =>{
    return await axios.post(`${process.env.REACT_APP_API}/inquiry`, 
    {pid}, 
    { headers: {Authorization: `Bearer ${authtoken}` }});
}

export const getInquiries = async (authtoken) =>
   await axios.get(`${process.env.REACT_APP_API}/iquiry/all`,
    { headers: {Authorization: `Bearer ${authtoken}` }}
);