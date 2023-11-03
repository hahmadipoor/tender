import React, { useState, createContext } from "react";

export const TenderContext = createContext();

export const TenderContextProvider = (props) => {
  const [user,setUser] = useState(localStorage["user"]?JSON.parse(localStorage["user"]):null);
  const [token,setToken] = useState(localStorage["token"]?localStorage["token"]:null);
  const [categories,setCategories] = useState(null);
  const [pid,setPid]=useState(null);  

  return (
    <TenderContext.Provider value={{user, setUser, token,setToken,categories,setCategories,pid,setPid}}>
      {props.children}
    </TenderContext.Provider>
  );
};
