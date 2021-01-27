import { resetUser, loginUser } from './action';
import { useAppAction, useSelectorAction } from '~/store/hooks';
import { USER_NAMESPACE, IUser } from './reducer';

// export const useSetUser = () => (payload:ISetUser) => {
//     const dispatch = useDispatch();
//     dispatch(setUser(payload));
// };

// export const useSetUser = () => useAppAction((payload:ISetUser) => setUser(payload));
export const useLogin = () => useAppAction((payload:IUser) => loginUser(payload));
export const useUser = () => useSelectorAction((state: any) => state[USER_NAMESPACE] || null);

export const useLogout = () => useAppAction(() => resetUser());
