import { NavLink } from 'react-router-dom';
import s from './NavBar.module.css'

const NavBar = () => {
  return (
    <nav className={s.nav}>
        <div className={`${s.item} ${s.active}`}><NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink></div>
        <div className={`${s.item} ${s.active}`}><NavLink to="/dialogs" activeClassName={s.activeLink}>Messages</NavLink></div>
        <div className={`${s.item} ${s.active}`}><a href="/">News</a></div>
    </nav>
  )
}

export default NavBar;