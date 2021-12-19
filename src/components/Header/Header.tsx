import { NavLink, useHistory } from 'react-router-dom';
import s from './Header.module.css';

type PropsType = {
    isAuth: boolean,
    login: string | null,
    logout: () => void
}

const Header:React.FC<PropsType> = (props) => {
    let history = useHistory();

    const getLogout = async () => {
        await props.logout();
        history.push('/login')
    }

    return <header className={s.header}>
        <img src='https://mobimg.b-cdn.net/v3/fetch/37/37c2f087ed4c046e861e7be72452eb32.jpeg' alt='logo' />
        <div className={s.loginBlock}>
            {props.isAuth
                ? <div>{props.login}<button onClick={getLogout}>Log out</button></div>
                : <NavLink to='/login'>Login</NavLink>}
        </div>
    </header>
}

export default Header;