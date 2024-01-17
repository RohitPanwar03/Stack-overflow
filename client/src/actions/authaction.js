import * as api from '../api'
import { setCurrentuser } from './currentuser';

export const signup = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signup(authData);
        dispatch({ type: "AUTH", data });
        dispatch(setCurrentuser(JSON.parse(localStorage.getItem("Profile"))));
        navigate('/');
    } catch (error) {
        console.log(error.message)
    }
}

export const login = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.logIn(authData);
        dispatch({ type: "AUTH", data })
        dispatch(setCurrentuser(JSON.parse(localStorage.getItem("Profile"))));
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}
