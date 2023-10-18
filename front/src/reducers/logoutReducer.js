const logoutReducer=(state=null,action)=>{
    switch (action.type){
        case "LOGOUT_SUCCESS":
            return {
                user:null,
                token:null
            };
        default:
            return state;
    }
}

export default logoutReducer;