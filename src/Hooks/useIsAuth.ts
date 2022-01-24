import { useSelector } from 'react-redux';
import { AppStateType } from '../redux/redux-store';

export const useIsAuth = () => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    return isAuth;
};
