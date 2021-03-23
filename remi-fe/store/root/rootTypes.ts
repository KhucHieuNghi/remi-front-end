import userReducer, { USER_NAMESPACE } from '~/store/user/reducer';
import { AppReducerStateType } from '~/store/types';

export interface IRootState {
    [USER_NAMESPACE]: AppReducerStateType<typeof userReducer>;
}
