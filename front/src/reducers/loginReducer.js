
const loginReducer=(state=null,action)=>{
    const payload=action.payload;
    const {token}={...payload}
    switch (action.type){
        case "LOGIN_SUCCESS":
            return {
                token
            };
        case "LOGIN_FAIL":
            return { error: action.payload };
        default:
            return state;
    }
}

export default loginReducer;