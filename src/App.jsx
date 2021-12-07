import React, { Suspense } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import Preloader from "./components/common/Preloader/Preloader";
import { Route, Redirect, Switch } from "react-router-dom";
import { initializeApp } from './redux/app-reducer'
import { connect } from "react-redux";
// import ProfileContainer from "./components/Profile/ProfileContainer";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));


class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp();
  }

  render() {

    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <div className="app-wrapper" >
        <HeaderContainer />
        <Navbar />
        <main className="app-wrapper-content">
          <Suspense fallback={<Preloader />}>
            <Switch>
              <Route exact path="/">
                <Redirect from='/' to="/profile" />
              </Route>
              <Route path="/dialogs">
                <DialogsContainer />
              </Route>
              <Route path="/profile/:userId?">
                <ProfileContainer />
              </Route>
              <Route path="/users">
                <UsersContainer />
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
};

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default connect(mapStateToProps, { initializeApp })(App);
