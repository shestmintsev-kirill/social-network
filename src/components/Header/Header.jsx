import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

const Header = (props) => {
    return <header className={s.header}>
        <img src='https://mobimg.b-cdn.net/v3/fetch/37/37c2f087ed4c046e861e7be72452eb32.jpeg' alt='logo' />
        <div className={s.loginBlock}>
            {props.isAuth ? props.login : <NavLink to='/login'>Login</NavLink>}
        </div>
    </header>
}

export default Header;