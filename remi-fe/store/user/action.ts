import { SET_USER, LOGIN_USER, RESET_USER } from './contains';
import { IUser } from './reducer';

export const loginUser = (payload: IUser) => ({
    type: LOGIN_USER,
    payload,
});

export const setUser = (payload: IUser) => ({
    type: SET_USER,
    payload,
});

export const resetUser = () => ({
    type: RESET_USER,
});
