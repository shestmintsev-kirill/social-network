import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppStateType } from '../redux/redux-store';

export const useIsAuth = () => {
    const router = useHistory();
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

    if (!isAuth) {
        router.push('/login');
    }
};
