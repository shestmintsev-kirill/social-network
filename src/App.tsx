import React, { Suspense } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import Preloader from './components/common/Preloader/Preloader';
import { Route, Redirect, Switch } from 'react-router-dom';
import { initializeApp } from './redux/app-reducer';
import { connect } from 'react-redux';
import { AppStateType } from './redux/redux-store';
import Users from './components/Users/Users';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

type MapProprsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
    initializeApp: () => void;
};

class App extends React.Component<MapProprsType & DispatchPropsType> {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />;
        }

        return (
            <div className="app-wrapper">
                <HeaderContainer />
                <Navbar />
                <main className="app-wrapper-content">
                    <Suspense fallback={<Preloader />}>
                        <Switch>
                            <Route exact path="/">
                                <Redirect from="/" to="/profile" />
                            </Route>
                            <Route path="/dialogs">
                                <DialogsContainer />
                            </Route>
                            <Route path="/profile/:userId?">
                                <ProfileContainer />
                            </Route>
                            <Route path="/users">
                                <Users />
                            </Route>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="*">
                                <div>404 not found</div>
                            </Route>
                        </Switch>
                    </Suspense>
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
});

export default connect(mapStateToProps, { initializeApp })(App);
