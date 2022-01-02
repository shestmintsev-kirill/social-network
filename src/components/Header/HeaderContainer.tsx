import { connect } from 'react-redux';
import Header from './Header';
import { logout } from '../../redux/auth-reducer'
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
    isAuth: boolean,
    login: string | null
}

type MapDispatchPropsType = {
    logout: () => void
}

const HeaderContainer:React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    return (
        <Header {...props} />
    )
}

let mapStateToProps = (state:AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect<MapStatePropsType, MapDispatchPropsType, unknown, AppStateType>
(mapStateToProps, { logout })(HeaderContainer);