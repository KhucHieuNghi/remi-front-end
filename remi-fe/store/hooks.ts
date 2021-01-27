import { useDispatch, useSelector } from 'react-redux';

export const useAppAction = <T extends any>(
    action:any,
) => {
    const dispatch = useDispatch();

    return (payload: T) => dispatch(action(payload));
};

export const useSelectorAction = (
    selector:any,
):any => useSelector(selector);
