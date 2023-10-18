import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import userReducer from "./userReducer";
import logoutReducer from "./logoutReducer";

const rootReducer=combineReducers({
    login:loginReducer,
    user:userReducer,
    logout:logoutReducer
});


export default rootReducer;