import { combineReducers } from 'redux';
import userReducer, { USER_NAMESPACE } from '~/store/user/reducer';

export default combineReducers({
    version: (state: number = 1) => state,
    [USER_NAMESPACE]: userReducer,
});
