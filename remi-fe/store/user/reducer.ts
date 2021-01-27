import { SET_USER, RESET_USER } from './contains';

export const USER_NAMESPACE = 'user';

interface IMovies {
    url: string
    title: string
    email: string
    description: string
}

export interface IUser {
    email: string | null
    password?: string
    isLogin: boolean
    movies?: IMovies[]
}

const initialState:IUser = {
    email: '',
    movies: [],
    isLogin: false,
};

function userReducer(state = initialState, action: any): IUser {
    switch (action.type) {
    case RESET_USER: {
        return initialState;
    }
    case SET_USER:
        return {
            ...state,
            isLogin: true,
            email: action.payload.email,
            movies: action.payload.movies,
        };

    default:
        return state;
    }
}

export default userReducer;
