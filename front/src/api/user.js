import axios from "axios";

export const currentUser=async (token)=>{
    const {data}= await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/current`,
         { 
            headers: {Authorization: `Bearer ${token}` }
         }
      );
    return data;
}

