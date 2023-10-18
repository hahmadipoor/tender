import axios from "axios";

export const currentUser = async (token) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/user/current`,
      { headers: {Authorization: `Bearer ${token}` }}
  );
};