
const userReducer=(state=null,action)=>{
    const payload=action.payload;
    switch (action.type){
        case "CURRENT_USER_SUCCESS":
            return {user:action.payload};
        case "CURRENT_USER_FAIL":
            return { error: payload };
        default:
            return {user:null};
    }
}

export default userReducer;