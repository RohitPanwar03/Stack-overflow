import { combineReducers } from "redux";
import authReducers from "./auth";
import { currentuserReducer } from './currentUser';
import { questionreducer } from './questionreucer';
import { usersReducer } from './Users';

export default combineReducers({
    authReducers, currentuserReducer, questionreducer, usersReducer
})